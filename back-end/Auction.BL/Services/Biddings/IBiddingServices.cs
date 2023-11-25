using Auction.BL.DTOs.Bidding;
using Auction.DAL.Data.Models;

namespace Auction.BL.Services.Biddings
{
    public interface IBiddingServices
    {
        bool Add(AddBiddingDto bidding);
        List<Bidding> GetBiddingHistoryPerProduct(int productId);
        List<Bidding> GetUserBiddings(int userId);
        bool UpdateWinningBidding (int biddingId);
    }
}
