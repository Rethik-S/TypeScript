using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using MetroCardAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace MetroCardAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // private static List<Users> _Users = new List<Users>
        // {
        //     // Add more Users here if needed
        //     new Users { CardNumber = "1", Name = "Ravi", PhoneNumber = "1234567890",Balance=0,Password="123" },
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
        [HttpGet("{cardNumber}")]
        public IActionResult GetUser(int cardNumber)
        {
            var user = _dbContext.users.FirstOrDefault(u => u.CardNumber == cardNumber);
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
        [HttpPut("{cardNumber}")]
        public IActionResult PutUser(int cardNumber, [FromBody] Users user)
        {
            var userOld = _dbContext.users.FirstOrDefault(u => u.CardNumber == cardNumber);
            if (userOld == null)
            {
                return NotFound();
            }

            userOld.Name = user.Name;
            userOld.Password = user.Password;
            userOld.Balance = user.Balance;
            userOld.PhoneNumber = user.PhoneNumber;
            userOld.Email = user.Email;

            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing user
        // DELETE: api/Users/1
        [HttpDelete("{cardNumber}")]
        public IActionResult DeleteContact(int cardNumber)
        {
            var user = _dbContext.users.FirstOrDefault(u => u.CardNumber == cardNumber);
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