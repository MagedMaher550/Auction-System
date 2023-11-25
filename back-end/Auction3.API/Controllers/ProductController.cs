using Auction.BL.DTOs.Product;
using Auction.BL.DTOs.User;
using Auction.BL.Services.Products;
using Auction.BL.Services.Users;
using Auction.DAL.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Auction.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductsServices IPS;

        public ProductController(IProductsServices productServices)
        {
            IPS = productServices;
        }

        [HttpPost("AddProduct")]
        public ActionResult Add(AddProductDto product)
        {
            bool isProductAdded = IPS.AddProduct(product);
            if(isProductAdded)
            {
                return StatusCode(StatusCodes.Status201Created);
            }
            return StatusCode(StatusCodes.Status400BadRequest);
        }

        [HttpPut("UpdateProduct")]
        public ActionResult Update(UpdateProductDto product)
        {
            bool isUpdated = IPS.UpdateProduct(product);
            if (isUpdated) {
                return StatusCode(StatusCodes.Status201Created);
            } else
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            
        }

        [HttpDelete("DeleteProduct")]
        public ActionResult Delete(int productId)
        {
            IPS.DeleteProdcut(productId);
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpGet("GetEightActiveProducts")]
        public ActionResult GetEightActiveProducts()
        {
            var products = IPS.GetActiveProducts(8);
            if (products != null)
            {
                return StatusCode(StatusCodes.Status201Created, products);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("GetThreeActiveProducts")]
        public ActionResult GetThreeActiveProducts()
        {
            var products = IPS.GetActiveProducts(3);
            if (products != null)
            {
                return StatusCode(StatusCodes.Status201Created, products);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("GetAllActiveProducts")]
        public ActionResult GetAllActiveProducts()
        {
            var products = IPS.GetAllActiveProducts();
            if (products != null)
            {
                return StatusCode(StatusCodes.Status201Created, products);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("GetUpcomingProducts")]
        public ActionResult GetUpcomingProducts()
        {
            var products = IPS.GetFourUpcomingProducts();
            if (products != null)
            {
                return StatusCode(StatusCodes.Status201Created, products);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("GetProductsNameSortedAsc")]
        public ActionResult SortNameAsc()
        {
            var products = IPS.SortByNameAsc();
            if (products != null)
            {
                return StatusCode(StatusCodes.Status201Created, products);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("GetProductsNameSortedDesc")]
        public ActionResult SortNameDesc()
        {
            var products = IPS.SortByNameDesc();
            if (products != null)
            {
                return StatusCode(StatusCodes.Status201Created, products);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet("GetProductsPriceSortedAsc")]
        public ActionResult SortPriceAsc()
        {
            var products = IPS.SortByPriceAsc();
            if (products != null)
            {
                return StatusCode(StatusCodes.Status201Created, products);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet("GetProductsPriceSortedDesc")]
        public ActionResult SortPriceDesc()
        {
            var products = IPS.SortByPriceDesc();
            if (products != null)
            {
                return StatusCode(StatusCodes.Status201Created, products);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("GetProductsFromSearch")]
        public ActionResult SearchResults(string query)
        {
            var products = IPS.Search(query);
            if (products != null)
            {
                return StatusCode(StatusCodes.Status201Created, products);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("GetProductById")]
        public ActionResult GetProductById(int productId)
        {
            var product = IPS.GetProductById(productId);
            if (product != null)
            {
                return StatusCode(StatusCodes.Status201Created, product);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("GetHighestPriceForProduct")]
        public ActionResult GetHighestPriceForProduct(int productId)
        {
            var price = IPS.GetHighestPriceForProduct(productId);
            if (price == 0)
            {
                price = IPS.GetProductById(productId).InitialPrice;
            }
            return StatusCode(StatusCodes.Status201Created, price);
        }

        [HttpGet("GetUserProducts")]
        public ActionResult GetUserProducts(int userId)
        {
            var products = IPS.GetUserProducts(userId);
            if (products != null)
            {
                return StatusCode(StatusCodes.Status201Created, products);
            }
            else
            {
                return NotFound();
            }
        }

    }
}
