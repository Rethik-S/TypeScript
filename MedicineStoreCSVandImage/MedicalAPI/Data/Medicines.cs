using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalAPI
{

    [Table("medicines", Schema = "public")]
    public class Medicines
    {
        [Key]
        public int MedicineID { get; set; }
        public string MedicineName { get; set; }
        public int MedicineCount { get; set; }
        public double MedicinePrice { get; set; }
        public DateTime MedicineExpiry { get; set; }
        public byte[] MedicineImage { get; set; }
    }
}