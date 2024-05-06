using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAPI
{
    public class Medicines
    {
        public string MedicineID { get; set; }
        public string MedicineName { get; set; }
        public int MedicineCount { get; set; }
        public double MedicinePrice { get; set; }
        public string MedicineExpiry { get; set; }
    }
}