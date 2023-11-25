using Auction.DAL.Data.Context;
using Auction.DAL.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Auction.DAL.Repos.Products
{
    public class ProductRepo : IProductRepo
    {
        private readonly AuctionContext Ent;
        public ProductRepo(AuctionContext _context)
        {
            Ent = _context;
        }

        public void Add(Product product)
        {
            Ent.Set<Product>().Add(product);
        }

        public void Delete(Product product)
        {
            Ent.Set<Product>().Remove(product);
        }

        public List<Product> GetAllActiveProducts()
        {
            DateTime currentDate = DateTime.Now;
            return Ent.Set<Product>()
                .Where(product => product.StartDate <= currentDate && currentDate <= product.EndDate)
                .ToList();
        }

        public Product? GetById(int Id)
        {
            return Ent.Set<Product>().FirstOrDefault(p => p.Id == Id);
        }

        public double GetHighestPriceForProduct(int productId)
        {
            var biddings = Ent.Set<Bidding>()
                .Where(bidding => bidding.ProductId == productId)
                .ToList(); 

            if (biddings.Count > 0)
            {
                return biddings.Max(bidding => bidding.price);
            }
            else
            {
                return 0; 
            }
        }

        public List<Product> GetActiveProducts(int productsNumber)
        {
            DateTime currentDate = DateTime.Now;
            return Ent.Set<Product>()
                .Where(product => product.StartDate <= currentDate && currentDate <= product.EndDate)
                .Take(productsNumber)
                .ToList();
        }

        public List<Product> GetFourUpcomingProducts()
        {
            DateTime currentDate = DateTime.Now;
            return Ent.Set<Product>()
                .Where(product => product.StartDate > currentDate)
                .Take(4)
                .ToList();
        }

        public int SaveChanges()
        {
            return Ent.SaveChanges();
        }

        public List<Product> SearchProduct(string searchTerm)
        {
            return Ent.Set<Product>()
                .Where(product =>
                    product.Title.Contains(searchTerm) ||
                    product.Category.Contains(searchTerm) ||
                    product.Description.Contains(searchTerm)
                    ) 
                .ToList();
        }

        public void Update(Product product)
        {
            Ent.Set<Product>().Update(product);
        }

        public List<Product> Sort(string option)
        {
            DateTime currentDate = DateTime.Now;
            var query = Ent.Set<Product>()
                .Where(product => product.StartDate <= currentDate && currentDate <= product.EndDate);

            switch (option)
            {
                case "PriceAscending":
                    return query.OrderBy(product => product.InitialPrice).ToList();
                case "PriceDescending":
                    return query.OrderByDescending(product => product.InitialPrice).ToList();
                case "NameAscendig":
                    return query.OrderBy(product => product.Title).ToList();
                case "NameDescending":
                    return query.OrderByDescending(product => product.Title).ToList();
                default:
                    return query.ToList();
            }
        }

        public List<Product> GetUserProducts(int userId)
        {
            return Ent.Set<Product>()
            .Where(product => product.UserId == userId)
            .ToList();
        }

        public List<Product> GetUnfinishedProducts()
        {
            DateTime currentDate = DateTime.Now;
            return Ent.Set<Product>()
            .Where(product => product.isFinished == false && product.EndDate < currentDate)
            .ToList();
        }

    }
}
