using Auction.DAL.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Auction.DAL.Data.Context
{
    public class AuctionContext : DbContext
    {
        public DbSet<User>? Users { get; set; }
        public DbSet<Product>? Products { get; set; }

        public DbSet<Bidding>? Biddings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bidding>()
                .HasKey(a => new { a.ProductId, a.UserId, a.BiddingId });

            modelBuilder.Entity<Bidding>()
                .HasOne(a => a.User)
                .WithMany(d => d.Biddings)
                .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Restrict); // Specify ON DELETE NO ACTION, or other suitable action


            modelBuilder.Entity<Bidding>()
                .HasOne(a => a.Product)
                .WithMany(p => p.Biddings)
                .HasForeignKey(a => a.ProductId)
                 .OnDelete(DeleteBehavior.Restrict); // Specify ON DELETE NO ACTION, or other suitable action
        }

        public AuctionContext(DbContextOptions options) : base(options)
        {

        }
    }
}
