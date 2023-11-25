using Auction.DAL.Data.Context;
using Auction.DAL.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Auction.DAL.Repos.Biddings
{
    public class BiddingRepo : IBiddingRepos
    {
        private readonly AuctionContext Ent;
        public BiddingRepo(AuctionContext _context)
        {
            Ent = _context;
        }

        public void Add(Bidding bidding)
        {
            Ent.Set<Bidding>().Add(bidding);
        }

        public Bidding? GetBidding(int biddingId)
        {
            return Ent.Set<Bidding>().FirstOrDefault(b => b.BiddingId == biddingId);
        }

        public List<Bidding> GetBiddingHistoryPerProduct(int productId)
        {
            return Ent.Set<Bidding>()
                .Where(bidding => bidding.ProductId == productId)
                .OrderByDescending(bidding => bidding.price)
                .ToList();
        }

        public List<Bidding> GetUserBiddings(int userId)
        {
            var userBiddings = Ent.Set<Bidding>()
                .Where(b => b.UserId == userId)
                .GroupBy(b => b.ProductId)
                .Select(group => new Bidding
                {
                    BiddingId = group.OrderByDescending(b => b.price).First().BiddingId,
                    price = group.OrderByDescending(b => b.price).First().price,
                    DidWin = group.OrderByDescending(b => b.price).First().DidWin,
                    date = group.OrderByDescending(b => b.price).First().date,
                    ProductId = group.Key,
                    Product = group.OrderByDescending(b => b.price).First().Product 
                })
                .ToList();
            return userBiddings;
        }


        public int SaveChanges()
        {
            return Ent.SaveChanges();
        }

        public void Update(Bidding bidding)
        {
           Ent.Set<Bidding>().Update(bidding);            
        }
    }
}
