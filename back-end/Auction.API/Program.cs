using Auction.BL.Services.Users;
using Auction.DAL.Data.Context;
using Auction.DAL.Repos.Users;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

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
#endregion

#region Services
builder.Services.AddScoped<IUserServices, IUserServices>();
#endregion

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
