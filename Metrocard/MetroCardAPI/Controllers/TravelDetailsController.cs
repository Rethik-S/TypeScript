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
    public class TravelDetailsController : ControllerBase
    {

        private readonly ApplicationDBContext _dbContext;
        public TravelDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
        // GET: api/TravelDetails
        [HttpGet]
        public IActionResult GetTravelDetails()
        {
            return Ok(_dbContext.travelDetails.ToList());
        }

        // GET: api/TravelDetails/1
        [HttpGet("{travelID}")]
        public IActionResult GetTravelDetails(int travelID)
        {
            var travel = _dbContext.travelDetails.FirstOrDefault(t => t.TravelID == travelID);
            if (travel == null)
            {
                return NotFound();
            }
            return Ok(travel);
        }

        //Adding a new travel
        // POST: api/TravelDetails
        [HttpPost]
        public IActionResult PostTravelDetails([FromBody] TravelDetails travel)
        {
            _dbContext.travelDetails.Add(travel);
            _dbContext.SaveChanges();
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        // Updating an existing travel
        // PUT: api/TravelDetails/1
        [HttpPut("{travelID}")]
        public IActionResult PutTravelDetails(int travelID, [FromBody] TravelDetails travel)
        {
            var travelOld = _dbContext.travelDetails.FirstOrDefault(t => t.TravelID == travelID);
            if (travelOld == null)
            {
                return NotFound();
            }

            travelOld.CardNumber = travel.CardNumber;
            travelOld.FromLocation = travel.ToLocation;
            travelOld.ToLocation = travel.ToLocation;
            travelOld.Date = travel.Date;
            travelOld.TravelCost = travel.TravelCost;

            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing travel
        // DELETE: api/TravelDetails/1
        [HttpDelete("{travelID}")]
        public IActionResult DeleteTravelDetails(int travelID)
        {
            var travel = _dbContext.travelDetails.FirstOrDefault(t => t.TravelID == travelID);
            if (travel == null)
            {
                return NotFound();
            }
            _dbContext.travelDetails.Remove(travel);
            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

    }
}