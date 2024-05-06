using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MedicalAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class MedicineController : ControllerBase
    {
        private static List<Medicines> _medicines = new List<Medicines>{
            new Medicines{MedicineID="MD11",MedicineName="Paracetomol",MedicineCount= 5, MedicinePrice=50, MedicineExpiry="2025-8-12"},
            new Medicines{MedicineID="MD12",MedicineName="Colpal",MedicineCount= 5, MedicinePrice=60, MedicineExpiry="2025-8-12"},
            new Medicines{MedicineID="MD13",MedicineName="Stepsil",MedicineCount= 5, MedicinePrice=70, MedicineExpiry="2025-8-12"},
            new Medicines{MedicineID="MD14",MedicineName="Iodex",MedicineCount= 5, MedicinePrice=80, MedicineExpiry="2025-8-12"},
            new Medicines{MedicineID="MD15",MedicineName="Acetherol",MedicineCount= 5, MedicinePrice=100, MedicineExpiry="2025-8-12"},

        };

        //GET: api/Medicines
        [HttpGet]

        public IActionResult GetMedicine()
        {
            return Ok(_medicines);
        }


        //GET: api/Medicines/1
        [HttpGet("{medicineID}")]
        public IActionResult GetMedicine(String medicineID)
        {
            var medicine = _medicines.Find(m => m.MedicineID == medicineID);
            if (medicine == null)
            {
                return NotFound();
            }

            return Ok(medicine);
        }

        //Adding a new medicine
        //POST: api/medicine
        [HttpPost]
        public IActionResult PostMedicine([FromBody] Medicines medicine)
        {
            _medicines.Add(medicine);
            // you might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        //Updating an existing medicine
        //PUT: api/Medicines/1
        [HttpPut("{medicineID}")]
        public IActionResult PutMedicine(string medicineID, [FromBody] Medicines medicine)
        {
            var index = _medicines.FindIndex(m => m.MedicineID == medicineID);
            if (index < 0)
            {
                return NotFound();
            }
            _medicines[index] = medicine;
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing medicine
        //DELETE: api/Medicines/1

        [HttpDelete("{medicineID}")]

        public IActionResult DeleteMedicine(string medicineID)
        {
            var medicine = _medicines.Find(m => m.MedicineID == medicineID);
            if (medicine == null)
            {
                return NotFound();
            }

            _medicines.Remove(medicine);
            //You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}