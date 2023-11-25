using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auction.BL.DTOs.Bidding
{
    public class AddBiddingDto
    {
        public double Price { get; set; }
        public bool DidWin { get; set; } = false;
        public DateTime Date { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
    }
}
