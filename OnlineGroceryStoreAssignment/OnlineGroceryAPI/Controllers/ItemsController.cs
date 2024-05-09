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
    public class ItemsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public ItemsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //GET: api/Items
        [HttpGet]

        public IActionResult GetItems()
        {
            return Ok(_dbContext.items.ToList());
        }

        //GET: api/Items/1
        [HttpGet("{id}")]
        public IActionResult Getitem(int id)
        {
            var Item = _dbContext.items.FirstOrDefault(i => i.ItemID == id);
            if (Item == null)
            {
                return NotFound();
            }

            return Ok(Item);
        }

        //Adding a new Item
        [HttpPost]
        public IActionResult PostItem([FromBody] Items Item)
        {
            _dbContext.items.Add(Item);
            _dbContext.SaveChanges();
            // you might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        //Updating an existing Item
        [HttpPut("{id}")]
        public IActionResult PutItem(int id, [FromBody] Items Item)
        {
            var ItemOld = _dbContext.items.FirstOrDefault(i => i.ItemID == id);
            if (ItemOld == null)
            {
                return NotFound();
            }
            ItemOld.OrderID = Item.OrderID;
            ItemOld.ProductID = Item.ProductID;
            ItemOld.PurchaseCount = Item.PurchaseCount;
            ItemOld.PriceOfItems = Item.PriceOfItems;

            _dbContext.SaveChanges();
            return Ok();

        }

        //Deleting an existing Item

        [HttpDelete("{id}")]

        public IActionResult DeleteItem(int id)
        {
            var item = _dbContext.items.FirstOrDefault(i => i.ItemID == id);
            if (item == null)
            {
                return NotFound();
            }

            _dbContext.items.Remove(item);
            _dbContext.SaveChanges();
            return Ok();
        }

    }

}