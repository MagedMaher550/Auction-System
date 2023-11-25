using Auction.BL.DTOs.User;
using Auction.BL.DTOs.Users;
using Auction.BL.Services.Users;
using Auction.DAL.Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Auction.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices IUS;

        public UserController(IUserServices userServices)
        {
            IUS = userServices;
        }

        [HttpPost]
        public ActionResult Add(AddUserDto user)
        {
            bool IsAdded = IUS.Add(user);
            if(!IsAdded)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            var addedUser = IUS.GetUserByEmail(user.Email);
            return StatusCode(StatusCodes.Status201Created, addedUser.Id);
        }

        [HttpPost("login")]
        public ActionResult Login(LoginDto loginCredentials)
        {
            bool isLoggedIn = IUS.Login(loginCredentials.Email, loginCredentials.Password);
            if (!isLoggedIn)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            var addedUser = IUS.GetUserByEmail(loginCredentials.Email);
            return StatusCode(StatusCodes.Status201Created, addedUser.Id);
        }

        [HttpPut]
        public ActionResult Update(AddUserDto user)
        {
            IUS.Update(user);
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpGet]
        public ActionResult GetUserId(int userId)
        {
            var user = IUS.GetUserById(userId);
            return StatusCode(StatusCodes.Status200OK, user);
        }

        [HttpGet("GetUserByEmail")]
        public ActionResult GetUserByEmail(string email)
        {
            var user = IUS.GetUserByEmail(email);
            return StatusCode(StatusCodes.Status200OK, user);
        }

    }
}
