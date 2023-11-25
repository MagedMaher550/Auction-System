using Auction.BL.DTOs.User;
using Auction.DAL.Data.Models;
using Auction.DAL.Repos.Users;
using System.Numerics;

namespace Auction.BL.Services.Users
{
    public class UserServices : IUserServices
    {
        private readonly IUsersRepo _usersRepo;

        public UserServices(IUsersRepo usersRepo)
        {
            _usersRepo = usersRepo;
        }
        public bool Add(AddUserDto user)
        {

            var users = _usersRepo.GetAllUsers();
            foreach (var _user in users)
            {
                if (_user.Email == user.Email)
                {
                    return false;
                }
            }
            if(user is not null)
            {
                var encryptedPassword = PasswordService.HashPassword(user.Password);

                User DbUser = new User
                {
                    Fullname = user.Fullname,
                    Email = user.Email,
                    Password = encryptedPassword
                };

                _usersRepo.Add(DbUser);
                _usersRepo.SaveChanges();
                return true;
            }
               return false;
        }

        public User GetUserByEmail(string userEmail)
        {
            return _usersRepo.GetByEmail(userEmail);
        }

        public User GetUserById(int userId)
        {
            return _usersRepo.GetById(userId);
        }

        public bool Login(string email, string password)
        {
            var user = _usersRepo.GetByEmail(email);
            if(user is not null)
            {
                bool isValid = PasswordService.VerifyPassword(password, user.Password);
                if(isValid)
                {
                    return true;
                }
            }
            return false;
        }

        public bool Update(AddUserDto user)
        {
            User DbUser = _usersRepo.GetById(user.Id);

            if (DbUser == null)
            {
                return false;
            }

            var users = _usersRepo.GetAllUsers();
            foreach (var _user in users)
            {
                if (_user.Email == user.Email && _user.Id != user.Id)
                {
                    return false;
                }
            }

            DbUser.Fullname = user.Fullname;
            DbUser.Email = user.Email;
            DbUser.Password = DbUser.Password;
            _usersRepo.Update(DbUser);
            _usersRepo.SaveChanges();
            return true;
        }
    }
}
