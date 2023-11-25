using Auction.BL.DTOs.Bidding;
using Auction.DAL.Data.Models;
using Auction.DAL.Repos.Biddings;
using System.ComponentModel.DataAnnotations;

namespace Auction.BL.Services.Biddings
{
    public class BiddingServices : IBiddingServices
    {
        private readonly IBiddingRepos _biddingRepo;

        public BiddingServices(IBiddingRepos biddingRepo)
        {
            _biddingRepo = biddingRepo;
        }

        public bool Add(AddBiddingDto bidding)
        {
            try
            {
                Bidding DbBidding = new Bidding
                {
                    price = bidding.Price,
                    DidWin = false,
                    date = bidding.Date,
                    ProductId = bidding.ProductId,
                    UserId = bidding.UserId,
                };
                _biddingRepo.Add(DbBidding);
                _biddingRepo.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

       public List<Bidding> GetUserBiddings(int userId)
        {
            return _biddingRepo.GetUserBiddings(userId);
        }

        public List<Bidding> GetBiddingHistoryPerProduct(int productId)
        {
            return _biddingRepo.GetBiddingHistoryPerProduct(productId);
        }

        public bool UpdateWinningBidding(int biddingId)
        {
            var bidding = _biddingRepo.GetBidding(biddingId);
            try
            {
                bidding.price = bidding.price;
                bidding.DidWin = true;
                bidding.date = bidding.date;
                bidding.ProductId = bidding.ProductId;
                bidding.UserId = bidding.UserId;
                _biddingRepo.Update(bidding);
                _biddingRepo.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
