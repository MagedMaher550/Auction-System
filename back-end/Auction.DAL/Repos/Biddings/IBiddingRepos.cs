using Auction.DAL.Data.Models;

namespace Auction.DAL.Repos.Biddings
{
    public interface IBiddingRepos
    {
        void Add(Bidding bidding);
        List<Bidding> GetBiddingHistoryPerProduct(int productId);
        List<Bidding> GetUserBiddings(int userId);
        void Update(Bidding bidding);

        Bidding GetBidding(int biddingId);
        int SaveChanges();
    }
}
