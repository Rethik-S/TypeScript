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
        private static List<Orders> _orders = new List<Orders>{
            new Orders{OrderID="101",MedicineId="MD11",UserId="UI1001",OrderStatus="ordered",MedicineName="Paracetomol",MedicineCount=2},

        };

        //GET: api/Orders
        [HttpGet]

        public IActionResult GetOrder()
        {
            return Ok(_orders);
        }


        //GET: api/Orders/1
        [HttpGet("{orderID}")]
        public IActionResult GetOrder(String orderID)
        {
            var orders = _orders.Find(m => m.OrderID == orderID);
            if (orders == null)
            {
                return NotFound();
            }

            return Ok(orders);
        }

        //Adding a new orders
        //POST: api/orders
        [HttpPost]
        public IActionResult PostMedicine([FromBody] Orders orders)
        {
            _orders.Add(orders);
            // you might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        //Updating an existing orders
        //PUT: api/Orders/1
        [HttpPut("{orderID}")]
        public IActionResult PutMedicine(string orderID, [FromBody] Orders orders)
        {
            var index = _orders.FindIndex(m => m.OrderID == orderID);
            if (index < 0)
            {
                return NotFound();
            }
            _orders[index] = orders;
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing orders
        //DELETE: api/Orders/1

        [HttpDelete("{orderID}")]

        public IActionResult DeleteMedicine(string orderID)
        {
            var orders = _orders.Find(m => m.OrderID == orderID);
            if (orders == null)
            {
                return NotFound();
            }

            _orders.Remove(orders);
            //You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}