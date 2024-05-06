using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MedicalAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private static List<Contacts> _Contacts = new List<Contacts>{
            new Contacts{ID="UI1001",Name="rethik",Email="rethik@mail.com",Phone="856854696954",Password="123",_balance=0},
            // new Contacts{ID="2",Name="Ravi",Email="sads@mail.com",Phone="856854696954",Password="",_balance=0},
            // new Contacts{ID="3",Name="Chandran",Email="sawqe@mail.com",Phone="856854696954",Password="",_balance=0},
            // new Contacts{ID="4",Name="Baskar",Email="saasdas@mail.com",Phone="856854696954",Password="",_balance=0}

        };

        //GET: api/contacts
        [HttpGet]

        public IActionResult GetContact()
        {
            return Ok(_Contacts);
        }

        //GET: api/contacts/1
        [HttpGet("{id}")]
        public IActionResult GetContact(String id)
        {
            var contact = _Contacts.Find(m => m.ID == id);
            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        //Adding a new contact
        //POST: api/contatcs
        [HttpPost]
        public IActionResult PostContact([FromBody] Contacts contact)
        {
            _Contacts.Add(contact);
            // you might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        //Updating an existing contact
        //PUT: api/contacts/1
        [HttpPut("{id}")]
        public IActionResult PutContact(string id, [FromBody] Contacts contact)
        {
            var index = _Contacts.FindIndex(m => m.ID == id);
            if (index < 0)
            {
                return NotFound();
            }
            _Contacts[index] = contact;
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing contact
        //DELETE: api/Contacts/1

        [HttpDelete("{id}")]

        public IActionResult DeleteContact(string id)
        {
            var contact = _Contacts.Find(m => m.ID == id);
            if (contact == null)
            {
                return NotFound();
            }

            _Contacts.Remove(contact);
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

    }
}