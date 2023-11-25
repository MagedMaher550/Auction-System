using Auction.BL.DTOs.Product;
using Auction.DAL.Data.Models;
using Auction.DAL.Repos.Biddings;
using Auction.DAL.Repos.Products;

namespace Auction.BL.Services.Products
{
    public class ProductsServices : IProductsServices
    {
        private readonly IProductRepo _productRepo;
        private readonly IBiddingRepos _biddingRepo;

        public ProductsServices(IProductRepo productRepo, IBiddingRepos biddingRepo)
        {
            _productRepo = productRepo;
            _biddingRepo = biddingRepo;
        }

        public bool AddProduct(AddProductDto product)
        {
            try
            {
                Product DbProduct = new Product
                {
                    Title = product.Title,
                    Category = product.Category,
                    ImgUrl = product.ImgUrl,
                    InitialPrice = product.InitialPrice,
                    StartDate = product.StartDate,
                    EndDate = product.EndDate,
                    Description = product.Description,
                    UserId = product.UserId,
                    isFinished = false,
                };

                _productRepo.Add(DbProduct);
                _productRepo.SaveChanges();
                return true;
            } catch(Exception)
            {
                return false;
            }
        }

        public bool DeleteProdcut(int productId)
        {
            var product = _productRepo.GetById(productId);
            if(product is not null)
            {
                _productRepo.Delete(product);
                _productRepo.SaveChanges();
                return true;
            }
            return false;
            
        }

        public List<Product> GetActiveProducts(int productsNumber)
        {
            return _productRepo.GetActiveProducts(productsNumber);
        }

        public List<Product> GetAllActiveProducts()
        {
            return _productRepo.GetAllActiveProducts();
        }

        public List<Product> GetFourUpcomingProducts()
        {
            return _productRepo.GetFourUpcomingProducts();
        }

        public double GetHighestPriceForProduct(int productId)
        {
            return _productRepo.GetHighestPriceForProduct(productId);
        }

        public Product GetProductById(int productId)
        {
            return _productRepo.GetById(productId);
        }

        public List<Product> GetUserProducts(int userId)
        {
            return _productRepo.GetUserProducts(userId);
        }

        public List<Product> Search(string query)
        {
            return _productRepo.SearchProduct(query);
        }

        public List<Product> SortByNameAsc()
        {
            return _productRepo.Sort("NameAscendig");
        }

        public List<Product> SortByNameDesc()
        {
            return _productRepo.Sort("NameDescending");
        }

        public List<Product> SortByPriceAsc()
        {
            return _productRepo.Sort("PriceAscending");
        }

        public List<Product> SortByPriceDesc()
        {
            return _productRepo.Sort("PriceDescending");
        }

        public void UpdateFinishedAttribute()
        {
            var unfinishedProducts = _productRepo.GetUnfinishedProducts();
            foreach(var unfinishedProduct in unfinishedProducts)
            {
               bool isUpdated = UpdtaeFinishedProduct(unfinishedProduct.Id);
                if(isUpdated)
                {
                    try
                    {
                        var HistoryBidding = _biddingRepo.GetBiddingHistoryPerProduct(unfinishedProduct.Id);
                        var biddingId = HistoryBidding[0].BiddingId;
                        var bidding = _biddingRepo.GetBidding(biddingId);

                        bidding.price = bidding.price;
                        bidding.DidWin = true;
                        bidding.date = bidding.date;
                        bidding.ProductId = bidding.ProductId;
                        bidding.UserId = bidding.UserId;
                        _biddingRepo.Update(bidding);
                        _biddingRepo.SaveChanges();
                    }
                    catch (Exception)
                    {
                        Console.WriteLine("SOMETHING WENT WRONG");
                        Console.WriteLine("SOMETHING WENT WRONG");
                        Console.WriteLine("SOMETHING WENT WRONG");
                    }
                }
            }
        }

        public bool UpdtaeFinishedProduct(int productId)
        {
            var existingProduct = _productRepo.GetById(productId);
            if (existingProduct is not null)
            {
                existingProduct.Title = existingProduct.Title;
                existingProduct.Category = existingProduct.Category;
                existingProduct.ImgUrl = existingProduct.ImgUrl;
                existingProduct.InitialPrice = existingProduct.InitialPrice;
                existingProduct.StartDate = existingProduct.StartDate;
                existingProduct.EndDate = existingProduct.EndDate;
                existingProduct.Description = existingProduct.Description;
                existingProduct.UserId = existingProduct.UserId;
                existingProduct.isFinished = true;

                _productRepo.Update(existingProduct);
                _productRepo.SaveChanges();
                return true;
            }
            return false;
        }


        public bool UpdateProduct(UpdateProductDto product)
        {
            var existingProduct = _productRepo.GetById(product.Id);
            if(existingProduct is not null)
            {
                existingProduct.Title = product.Title;
                existingProduct.Category = existingProduct.Category;
                existingProduct.ImgUrl = product.ImgUrl;
                existingProduct.InitialPrice = product.InitialPrice;
                existingProduct.StartDate = product.StartDate;
                existingProduct.EndDate = product.EndDate;
                existingProduct.Description = product.Description;
                existingProduct.UserId = product.UserId;
                existingProduct.isFinished = existingProduct.isFinished;
                
                _productRepo.Update(existingProduct);
                _productRepo.SaveChanges();
                return true;
            }
            return false;
        }
    }
}

