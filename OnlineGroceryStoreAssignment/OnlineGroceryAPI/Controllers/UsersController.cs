using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineGroceryAPI.Data;

namespace OnlineGroceryAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UsersController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //GET: api/Users
        [HttpGet]

        public IActionResult GetUsers()
        {
            return Ok(_dbContext.users.ToList());
        }

        //GET: api/Users/1
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _dbContext.users.FirstOrDefault(u => u.UserID == id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        //Adding a new user
        [HttpPost]
        public IActionResult PostUser([FromBody] Users user)
        {
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            // you might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        //Updating an existing user
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, [FromBody] Users user)
        {
            var userOld = _dbContext.users.FirstOrDefault(u => u.UserID == id);
            if (userOld == null)
            {
                return NotFound();
            }
            userOld.Name = user.Name;
            userOld.Email = user.Email;
            userOld.Password = user.Password;
            userOld.Balance = user.Balance;
            userOld.UserImage = user.UserImage;

            _dbContext.SaveChanges();
            return Ok();

        }

        //Deleting an existing user

        [HttpDelete("{id}")]

        public IActionResult DeleteUser(int id)
        {
            var user = _dbContext.users.FirstOrDefault(u => u.UserID == id);
            if (user == null)
            {
                return NotFound();
            }

            _dbContext.users.Remove(user);
            _dbContext.SaveChanges();
            return Ok();
        }

    }
}