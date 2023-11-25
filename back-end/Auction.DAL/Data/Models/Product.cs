using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auction.DAL.Data.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string? Title { get; set; }

        [Required]
        public string? Category { get; set; }

        [Required]
        public string? ImgUrl { get; set; }

        [Required]
        public double InitialPrice { get; set; }

        [Required]
        public DateTime StartDate{ get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public string? Description { get; set; }
        [Required]
        public bool isFinished{ get; set; }

        [Required]
        public int UserId{ get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        public ICollection<Bidding> Biddings { get; set; } = new List<Bidding>();

    }
}
