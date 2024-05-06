using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAPI
{
    public class Orders
    {
        public string OrderID { get; set; }
        public string MedicineId { get; set; }
        public string UserId { get; set; }
        public string OrderStatus { get; set; }
        public string MedicineName { get; set; }
        public int MedicineCount { get; set; }
    }
}