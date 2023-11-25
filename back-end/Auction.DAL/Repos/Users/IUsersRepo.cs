using Auction.DAL.Data.Models;

namespace Auction.DAL.Repos.Users
{
    public interface IUsersRepo
{
        User GetById(int Id);
        User GetByEmail(string email);
        List<User> GetAllUsers();
        void Add(User user);
        void Update(User user);
        int SaveChanges();
    }
}
