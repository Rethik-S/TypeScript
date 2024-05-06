using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MedicalAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private readonly ApplicationDBContext _dbContext;
        public OrderController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        // private static List<Orders> _orders = new List<Orders>{
        //     new Orders{OrderID=3001,MedicineID=1001,UserID=2001,OrderStatus="ordered",MedicineName="Paracetomol",MedicineCount=2},

        // };

        //GET: api/Orders
        [HttpGet]

        public IActionResult GetOrder()
        {
            return Ok(_dbContext.orders.ToList());
        }


        //GET: api/Orders/1
        [HttpGet("{orderID}")]
        public IActionResult GetOrder(int orderID)
        {
            var orders = _dbContext.orders.FirstOrDefault(o => o.OrderID == orderID);
            if (orders == null)
            {
                return NotFound();
            }

            return Ok(orders);
        }

        //Adding a new orders
        //POST: api/orders
        [HttpPost]
        public IActionResult PostOrder([FromBody] Orders orders)
        {
            _dbContext.orders.Add(orders);
            _dbContext.SaveChanges();
            // you might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        //Updating an existing orders
        //PUT: api/Orders/1
        [HttpPut("{orderID}")]
        public IActionResult PutOrder(int orderID, [FromBody] Orders order)
        {
            var oldOrder = _dbContext.orders.FirstOrDefault(o => o.OrderID == orderID);
            if (oldOrder == null)
            {
                return NotFound();
            }
            oldOrder.MedicineCount=order.MedicineCount;
            oldOrder.MedicineID=order.MedicineID;
            oldOrder.MedicineName=order.MedicineName;
            oldOrder.UserID=order.UserID;
            oldOrder.OrderStatus=order.OrderStatus;
            _dbContext.SaveChanges();
            // _orders[index] = order;
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing orders
        //DELETE: api/Orders/1

        [HttpDelete("{orderID}")]

        public IActionResult DeleteOrder(int orderID)
        {
            var orders = _dbContext.orders.FirstOrDefault(o => o.OrderID == orderID);
            if (orders == null)
            {
                return NotFound();
            }

            _dbContext.orders.Remove(orders);
            _dbContext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}