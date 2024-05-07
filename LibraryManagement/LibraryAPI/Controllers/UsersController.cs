using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // private static List<Users> _Users = new List<Users>
        // {
        //     // Add more Users here if needed
        //     new Users { userID = "1", Name = "Ravi", PhoneNumber = "1234567890",Balance=0,Password="123" },
        // };

        private readonly ApplicationDBContext _dbContext;
        public UsersController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        // GET: api/Users
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_dbContext.users.ToList());
        }

        // GET: api/Users/1
        [HttpGet("{userID}")]
        public IActionResult GetUser(int userID)
        {
            var user = _dbContext.users.FirstOrDefault(u => u.UserID == userID);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //Adding a new user
        // POST: api/Users
        [HttpPost]
        public IActionResult PostUser([FromBody] Users user)
        {
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        // Updating an existing user
        // PUT: api/Users/1
        [HttpPut("{userID}")]
        public IActionResult PutUser(int userID, [FromBody] Users user)
        {
            var userOld = _dbContext.users.FirstOrDefault(u => u.UserID == userID);
            if (userOld == null)
            {
                return NotFound();
            }

            userOld.Name = user.Name;
            userOld.Email = user.Email;
            userOld.Gender = user.Gender;
            userOld.Department = user.Department;
            userOld.Password = user.Password;
            userOld.Balance = user.Balance;
            userOld.Phone = user.Phone;

            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing user
        // DELETE: api/Users/1
        [HttpDelete("{userID}")]
        public IActionResult DeleteContact(int userID)
        {
            var user = _dbContext.users.FirstOrDefault(u => u.UserID == userID);
            if (user == null)
            {
                return NotFound();
            }
            _dbContext.users.Remove(user);
            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}