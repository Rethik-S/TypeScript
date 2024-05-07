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
    public class BorrowDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BorrowDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        // GET: api/BorrowDetails
        [HttpGet]
        public IActionResult GetBorrowDetails()
        {
            return Ok(_dbContext.borrowDetails.ToList());
        }

        // GET: api/BorrowDetails/1
        [HttpGet("{borrowID}")]
        public IActionResult GetBorrowDetail(int borrowID)
        {
            var borrow = _dbContext.borrowDetails.FirstOrDefault(b => b.BorrowID == borrowID);
            if (borrow == null)
            {
                return NotFound();
            }
            return Ok(borrow);
        }

        //Adding a new borrow
        // POST: api/BorrowDetails
        [HttpPost]
        public IActionResult PostBorrowDetail([FromBody] BorrowDetails borrow)
        {
            _dbContext.borrowDetails.Add(borrow);
            _dbContext.SaveChanges();
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        // Updating an existing borrow
        // PUT: api/BorrowDetails/1
        [HttpPut("{borrowID}")]
        public IActionResult PutBorrowDetail(int borrowID, [FromBody] BorrowDetails borrow)
        {
            var borrowOld = _dbContext.borrowDetails.FirstOrDefault(b => b.BorrowID == borrowID);
            if (borrowOld == null)
            {
                return NotFound();
            }

            borrowOld.BookID = borrow.BookID;
            borrowOld.UserID = borrow.UserID;
            borrowOld.BorrowedDate = borrow.BorrowedDate;
            borrowOld.BorrowBookCount = borrow.BorrowBookCount;
            borrowOld.Status = borrow.Status;
            borrowOld.PaidFineAmount = borrow.PaidFineAmount;

            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing borrow
        // DELETE: api/BorrowDetails/1
        [HttpDelete("{borrowID}")]
        public IActionResult DeleteBorrowDetail(int borrowID)
        {
            var borrow = _dbContext.borrowDetails.FirstOrDefault(b => b.BorrowID == borrowID);
            if (borrow == null)
            {
                return NotFound();
            }
            _dbContext.borrowDetails.Remove(borrow);
            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}