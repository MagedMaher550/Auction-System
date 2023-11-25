﻿namespace Auction.BL.DTOs.Product
{
    public class UpdateProductDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? ImgUrl { get; set; }
        public double InitialPrice { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Description { get; set; }
        public int UserId { get; set; }
    }
}
