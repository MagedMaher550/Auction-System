using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Auction.DAL.Data.Models
{
    public class Bidding
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BiddingId { get; set; }

        [Required]
        public double price { get; set; }

        [Required]
        public bool DidWin { get; set; } = false;

        [Required]
        public DateTime date { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public int UserId { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}
