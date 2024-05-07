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
    public class TicketFairsController : ControllerBase
    {

        private readonly ApplicationDBContext _dbContext;
        public TicketFairsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
        // GET: api/TicketFairs
        [HttpGet]
        public IActionResult GetTicketFairs()
        {
            return Ok(_dbContext.ticketFairs.ToList());
        }

        // GET: api/TicketFairs/1
        [HttpGet("{ticketID}")]
        public IActionResult GetTicketFairs(int ticketID)
        {
            var ticket = _dbContext.ticketFairs.FirstOrDefault(t => t.TicketID == ticketID);
            if (ticket == null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }

        //Adding a new ticket
        // POST: api/TicketFairs
        [HttpPost]
        public IActionResult PostTicketFairs([FromBody] TicketFairs ticket)
        {
            _dbContext.ticketFairs.Add(ticket);
            _dbContext.SaveChanges();
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        // Updating an existing ticket
        // PUT: api/TicketFairs/1
        [HttpPut("{ticketID}")]
        public IActionResult PutTicketFairs(int ticketID, [FromBody] TicketFairs ticket)
        {
            var ticketOld = _dbContext.ticketFairs.FirstOrDefault(t => t.TicketID == ticketID);
            if (ticketOld == null)
            {
                return NotFound();
            }

            ticketOld.FromLocation = ticket.ToLocation;
            ticketOld.ToLocation = ticket.ToLocation;
            ticketOld.Fair = ticket.Fair;

            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing ticket
        // DELETE: api/TicketFairs/1
        [HttpDelete("{ticketID}")]
        public IActionResult DeleteTicketFairs(int ticketID)
        {
            var ticket = _dbContext.ticketFairs.FirstOrDefault(t => t.TicketID == ticketID);
            if (ticket == null)
            {
                return NotFound();
            }
            _dbContext.ticketFairs.Remove(ticket);
            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

    }
}