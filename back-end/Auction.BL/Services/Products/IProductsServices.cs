using Auction.BL.DTOs.Product;
using Auction.DAL.Data.Models;

namespace Auction.BL.Services.Products
{
    public interface IProductsServices
    {
        List<Product> GetActiveProducts(int productsNumber);
        List<Product> GetFourUpcomingProducts();
        List<Product> GetAllActiveProducts();
        double GetHighestPriceForProduct(int productId);
        bool AddProduct(AddProductDto product);
        bool DeleteProdcut(int productId);
        bool UpdateProduct(UpdateProductDto product);
        List<Product> SortByNameAsc();
        List<Product> SortByNameDesc();
        List<Product> SortByPriceAsc();
        List<Product> SortByPriceDesc();
        List<Product> Search(string query);
        List<Product> GetUserProducts(int userId);
        Product GetProductById(int productId);
        void UpdateFinishedAttribute();    

    }
}
