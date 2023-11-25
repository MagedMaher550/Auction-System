namespace Auction.BL.DTOs.User
{
    public class AddUserDto
    {
        public int Id { get; set; } 
        public string? Fullname { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
