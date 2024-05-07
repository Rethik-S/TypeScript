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
    public class BookDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BookDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        // GET: api/BookDetails
        [HttpGet]
        public IActionResult GetBookDetails()
        {
            return Ok(_dbContext.bookDetails.ToList());
        }

        // GET: api/BookDetails/1
        [HttpGet("{bookID}")]
        public IActionResult GetBookDetail(int bookID)
        {
            var book = _dbContext.bookDetails.FirstOrDefault(b => b.BookID == bookID);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        //Adding a new book
        // POST: api/BookDetails
        [HttpPost]
        public IActionResult PostBookDetail([FromBody] BookDetails book)
        {
            _dbContext.bookDetails.Add(book);
            _dbContext.SaveChanges();
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        // Updating an existing book
        // PUT: api/BookDetails/1
        [HttpPut("{bookID}")]
        public IActionResult PutBookDetail(int bookID, [FromBody] BookDetails book)
        {
            var bookOld = _dbContext.bookDetails.FirstOrDefault(b => b.BookID == bookID);
            if (bookOld == null)
            {
                return NotFound();
            }

            bookOld.BookName = book.BookName;
            bookOld.BookCount = book.BookCount;
            bookOld.AuthorName = book.AuthorName;

            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing book
        // DELETE: api/BookDetails/1
        [HttpDelete("{bookID}")]
        public IActionResult DeleteBookDetail(int bookID)
        {
            var book = _dbContext.bookDetails.FirstOrDefault(b => b.BookID == bookID);
            if (book == null)
            {
                return NotFound();
            }
            _dbContext.bookDetails.Remove(book);
            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}