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
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public OrdersController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //GET: api/Orders
        [HttpGet]

        public IActionResult GetOrders()
        {
            return Ok(_dbContext.orders.ToList());
        }

        //GET: api/Orders/1
        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            var order = _dbContext.orders.FirstOrDefault(o => o.OrderID == id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        //Adding a new order
        [HttpPost]
        public IActionResult Postorder([FromBody] Orders order)
        {
            _dbContext.orders.Add(order);
            _dbContext.SaveChanges();
            // you might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        //Updating an existing order
        [HttpPut("{id}")]
        public IActionResult Putorder(int id, [FromBody] Orders order)
        {
            var orderOld = _dbContext.orders.FirstOrDefault(o => o.OrderID == id);
            if (orderOld == null)
            {
                return NotFound();
            }
            orderOld.UserID = order.UserID;
            orderOld.OrderStatus = order.OrderStatus;
            orderOld.OrderDate = order.OrderDate;
            orderOld.TotalPrice = order.TotalPrice;

            _dbContext.SaveChanges();
            return Ok();

        }

        //Deleting an existing order

        [HttpDelete("{id}")]

        public IActionResult Deleteorder(int id)
        {
            var order = _dbContext.orders.FirstOrDefault(o => o.OrderID == id);
            if (order == null)
            {
                return NotFound();
            }

            _dbContext.orders.Remove(order);
            _dbContext.SaveChanges();
            return Ok();
        }

    }
}