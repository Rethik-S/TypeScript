using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MedicalAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class MedicineController : ControllerBase
    {
        // private static List<Medicines> _medicines = new List<Medicines>{
        //     new Medicines{MedicineID=1001,MedicineName="Paracetomol",MedicineCount= 5, MedicinePrice=50, MedicineExpiry=new DateTime(2025,8,12)},
        //     new Medicines{MedicineID=1002,MedicineName="Colpal",MedicineCount= 5, MedicinePrice=60, MedicineExpiry=new DateTime(2025,8,12)},
        //     new Medicines{MedicineID=1003,MedicineName="Stepsil",MedicineCount= 5, MedicinePrice=70, MedicineExpiry=new DateTime(2025,8,12)},
        //     new Medicines{MedicineID=1004,MedicineName="Iodex",MedicineCount= 5, MedicinePrice=80, MedicineExpiry=new DateTime(2025,8,12)},
        //     new Medicines{MedicineID=1005,MedicineName="Acetherol",MedicineCount= 5, MedicinePrice=100, MedicineExpiry=new DateTime(2025,8,12)},

        // };
        private readonly ApplicationDBContext _dbContext;
        public MedicineController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }

        //GET: api/Medicines
        [HttpGet]

        public IActionResult GetMedicine()
        {
            return Ok(_dbContext.medicines.ToList());
        }


        //GET: api/Medicines/1
        [HttpGet("{medicineID}")]
        public IActionResult GetMedicine(int medicineID)
        {
            var medicine = _dbContext.medicines.FirstOrDefaultAsync(m => m.MedicineID == medicineID);
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
            _dbContext.medicines.Add(medicine);
            _dbContext.SaveChanges();
            // you might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        //Updating an existing medicine
        //PUT: api/Medicines/1
        [HttpPut("{medicineID}")]
        public IActionResult PutMedicine(int medicineID, [FromBody] Medicines medicine)
        {
            var oldMedicine = _dbContext.medicines.FirstOrDefault(m => m.MedicineID == medicineID);
            if (oldMedicine == null)
            {
                return NotFound();
            }

            oldMedicine.MedicineCount=medicine.MedicineCount;
            oldMedicine.MedicineExpiry=medicine.MedicineExpiry;
            oldMedicine.MedicineName=medicine.MedicineName;
            oldMedicine.MedicinePrice=medicine.MedicinePrice;
            _dbContext.SaveChanges();
    
            // _medicines[index] = medicine;
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing medicine
        //DELETE: api/Medicines/1

        [HttpDelete("{medicineID}")]

        public IActionResult DeleteMedicine(int medicineID)
        {
            var medicine = _dbContext.medicines.FirstOrDefault(m => m.MedicineID == medicineID);
            if (medicine == null)
            {
                return NotFound();
            }

            _dbContext.medicines.Remove(medicine);
            _dbContext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}