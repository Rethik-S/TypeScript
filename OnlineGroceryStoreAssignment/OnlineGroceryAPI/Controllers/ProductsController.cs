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
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public ProductsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //GET: api/Products
        [HttpGet]

        public IActionResult GetProducts()
        {
            return Ok(_dbContext.products.ToList());
        }

        //GET: api/Products/1
        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _dbContext.products.FirstOrDefault(p => p.ProductID == id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        //Adding a new product
        [HttpPost]
        public IActionResult PostProduct([FromBody] Products product)
        {
            _dbContext.products.Add(product);
            _dbContext.SaveChanges();
            // you might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        //Updating an existing product
        [HttpPut("{id}")]
        public IActionResult PutProduct(int id, [FromBody] Products product)
        {
            var productOld = _dbContext.products.FirstOrDefault(p => p.ProductID == id);
            if (productOld == null)
            {
                return NotFound();
            }
            productOld.ProductName = product.ProductName;
            productOld.QuantityAvailable = product.QuantityAvailable;
            productOld.PricePerQuantity = product.PricePerQuantity;
            productOld.PurchaseDate = product.PurchaseDate;
            productOld.ExpiryDate = product.ExpiryDate;
            productOld.ProductImage = product.ProductImage;

            _dbContext.SaveChanges();
            return Ok();

        }

        //Deleting an existing product

        [HttpDelete("{id}")]

        public IActionResult DeleteProduct(int id)
        {
            var product = _dbContext.products.FirstOrDefault(p => p.ProductID == id);
            if (product == null)
            {
                return NotFound();
            }

            _dbContext.products.Remove(product);
            _dbContext.SaveChanges();
            return Ok();
        }

    }
}