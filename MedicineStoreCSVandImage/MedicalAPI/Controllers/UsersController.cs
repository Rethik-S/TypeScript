using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MedicalAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UsersController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        // private static List<Users> _Users = new List<Users>{
        //     new Users{UserID=2001,Name="rethik",Email="rethik@mail.com",Phone="856854696954",Password="123",Balance=0},
        //     // new Users{UserID="2",Name="Ravi",Email="sads@mail.com",Phone="856854696954",Password="",_balance=0},
        //     // new Users{UserID="3",Name="Chandran",Email="sawqe@mail.com",Phone="856854696954",Password="",_balance=0},
        //     // new Users{UserID="4",Name="Baskar",Email="saasdas@mail.com",Phone="856854696954",Password="",_balance=0}

        // };

        //GET: api/Users
        [HttpGet]

        public IActionResult GetUser()
        {
            return Ok(_dbContext.users.ToList());
        }

        //GET: api/Users/1
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _dbContext.users.FirstOrDefaultAsync(u => u.UserID == id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        //Adding a new user
        //POST: api/contatcs
        [HttpPost]
        public IActionResult PostContact([FromBody] Users user)
        {
           _dbContext.users.Add(user);
           _dbContext.SaveChanges();
            // you might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        //Updating an existing user
        //PUT: api/Users/1
        [HttpPut("{id}")]
        public IActionResult PutContact(int id, [FromBody] Users user)
        {
            var userOld = _dbContext.users.FirstOrDefault(u => u.UserID == id);
            if (userOld == null)
            {
                return NotFound();
            }
            userOld.Name = user.Name;
            userOld.Password=user.Password;
            userOld.Balance=user.Balance;
            userOld.Email=user.Email;
            userOld.Phone=user.Phone;
            // _dbContext.users.ToList()[index] = user;

            _dbContext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();

        }

        //to delete
        // _dbcontext.Remove();


        //Deleting an existing user
        //DELETE: api/Users/1

        [HttpDelete("{id}")]

        public IActionResult DeleteContact(int id)
        {
            var user = _dbContext.users.FirstOrDefault(u => u.UserID == id);
            if (user == null)
            {
                return NotFound();
            }

            _dbContext.users.Remove(user);
            _dbContext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

    }
}