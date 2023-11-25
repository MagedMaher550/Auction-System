namespace Auction.BL.DTOs.Bidding
{
    public class GetBiddingHistoryPerProductDto
    {
        public double Price { get; set; }
        public bool DidWin { get; set; }
        public DateTime Date { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public string? UserName { get; set; }
    }
}
