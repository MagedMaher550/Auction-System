using Auction.DAL.Data.Models;

namespace Auction.DAL.Repos.Products
{
    public interface IProductRepo
    {
        Product GetById(int Id);
        void Add(Product product);
        void Delete(Product product);
        void Update(Product product);
        List<Product> GetAllActiveProducts();
        List<Product> GetActiveProducts(int productsNumber);
        List<Product> GetFourUpcomingProducts();
        List<Product> SearchProduct(string searchTerm);
        List<Product> Sort(string option);
        double GetHighestPriceForProduct(int Id);
        List<Product> GetUserProducts(int userId);
        List<Product> GetUnfinishedProducts();
        int SaveChanges();
    }
}