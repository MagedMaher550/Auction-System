using Auction.BL.DTOs.User;
using Auction.DAL.Data.Models;

namespace Auction.BL.Services.Users
{
    public  interface IUserServices
    {
        public User GetUserById(int userId);
        public User GetUserByEmail(string userEmail);
        public bool Add(AddUserDto user);

        public bool Login(string email, string password);
        public bool Update(AddUserDto user);
    }
}
