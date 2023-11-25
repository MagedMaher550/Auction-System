using Auction.DAL.Data.Context;
using Auction.DAL.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Auction.DAL.Repos.Users
{
    public class UsersRepo : IUsersRepo
    {

    private readonly AuctionContext Ent;

        public UsersRepo(AuctionContext _context)
        {
            Ent = _context;
        }

        public void Add(User user)
        {
            Ent.Set<User>().Add(user);
        }

        public List<User> GetAllUsers()
        {
            return Ent.Set<User>().ToList();    
        }

        public User? GetByEmail(string email)
        {
            return Ent.Set<User>().FirstOrDefault(d => d.Email == email);
        }

        public User? GetById(int Id)
        {
            return Ent.Set<User>().FirstOrDefault(d => d.Id == Id);
        }
        public int SaveChanges()
        {
            return Ent.SaveChanges();
        }

        public void Update(User user)
        {
            Ent.Set<User>().Update(user);
        }

    }
}
