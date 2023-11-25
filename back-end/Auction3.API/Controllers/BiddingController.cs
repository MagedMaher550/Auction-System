using Auction.BL.DTOs.Bidding;
using Auction.BL.DTOs.Product;
using Auction.BL.Services.Biddings;
using Auction.BL.Services.Products;
using Auction.DAL.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Auction.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BiddingController : ControllerBase
    {
        private readonly IBiddingServices IBS;

        public BiddingController(IBiddingServices biddingServices)
        {
            IBS = biddingServices;
        }

        [HttpPost("AddBidding")]
        public ActionResult Add(AddBiddingDto bidding)
        {
            IBS.Add(bidding);
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpGet("GetBiddingHistoryPerProduct")]
        public ActionResult GetBiddingHistoryPerProductDto(int productId)
        {
            var biddings = IBS.GetBiddingHistoryPerProduct(productId);
            return StatusCode(StatusCodes.Status201Created, biddings);
        }

        [HttpGet("GetUserBidding")]
        public ActionResult GetUserBidding(int userId)
        {
            var biddings = IBS.GetUserBiddings(userId);
            return StatusCode(StatusCodes.Status201Created, biddings);
        }
    }
}
