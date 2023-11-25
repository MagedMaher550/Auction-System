using Auction.BL.Services.Biddings;
using Auction.BL.Services.Products;
using Auction.BL.Services.Users;
using Auction.DAL.Data.Context;
using Auction.DAL.Repos.Biddings;
using Auction.DAL.Repos.Products;
using Auction.DAL.Repos.Users;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using System.Timers;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";



var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200")
                                .AllowAnyHeader()  // Allow any header, including "content-type"
                                .AllowAnyMethod(); // Allow any HTTP method
                      });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#region default
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
#endregion

#region database
string? connectionString = builder.Configuration.GetConnectionString("Auction");
builder.Services.AddDbContext<AuctionContext>(options =>
{
    options.UseSqlServer(connectionString + ";TrustServerCertificate=true;");
    options.EnableSensitiveDataLogging();
    options.EnableDetailedErrors();
    /*options.UseSqlServer(connectionString);*/
});
#endregion

#region Repos
builder.Services.AddScoped<IUsersRepo, UsersRepo>();
builder.Services.AddScoped<Auction.DAL.Repos.Users.UsersRepo>();

builder.Services.AddScoped<IProductRepo, ProductRepo>();
builder.Services.AddScoped < Auction.DAL.Repos.Products.ProductRepo>();

builder.Services.AddScoped<IBiddingRepos, BiddingRepo>();
builder.Services.AddScoped<Auction.DAL.Repos.Biddings.BiddingRepo>();
#endregion

#region Services
builder.Services.AddScoped<IUserServices, UserServices>();
builder.Services.AddScoped<IProductsServices, ProductsServices>();
builder.Services.AddScoped<IBiddingServices, BiddingServices>();
#endregion


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

static void update(WebApplication? app) {
    using (var scope = app!.Services.CreateScope())
    {
        var services = scope.ServiceProvider;

        try
        {
            var productService = services.GetRequiredService<IProductsServices>();
            productService.UpdateFinishedAttribute();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }
}

var timer = new System.Timers.Timer(10000);
timer.Elapsed +=  (sender, e) => update(app);
timer.AutoReset = true; timer.Start();

app.Run();
