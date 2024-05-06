using System;
using System.Collections.Generic;
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
        private static List<Users> _Users = new List<Users>
        {
            // Add more Users here if needed
            new Users { CardNumber = "1", Name = "Ravi", PhoneNumber = "1234567890",Balance=0,Password="123" },
        };

        // GET: api/Users
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_Users);
        }

        // GET: api/Users/1
        [HttpGet("{cardNumber}")]
        public IActionResult GetUser(string cardNumber)
        {
            var user = _Users.Find(m => m.CardNumber == cardNumber);
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
            _Users.Add(user);
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        // Updating an existing user
        // PUT: api/Users/1
        [HttpPut("{cardNumber}")]
        public IActionResult PutUser(string cardNumber, [FromBody] Users user)
        {
            var index = _Users.FindIndex(m => m.CardNumber == cardNumber);
            if (index < 0)
            {
                return NotFound();
            }
            _Users[index] = user;
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing user
        // DELETE: api/Users/1
        [HttpDelete("{cardNumber}")]
        public IActionResult DeleteContact(string cardNumber)
        {
            var user = _Users.Find(m => m.CardNumber == cardNumber);
            if (user == null)
            {
                return NotFound();
            }
            _Users.Remove(user);
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
    }

}