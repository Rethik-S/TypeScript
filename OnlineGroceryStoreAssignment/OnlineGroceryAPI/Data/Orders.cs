using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineGroceryAPI.Data
{
    [Table("Orders", Schema = "public")]
    public class Orders
    {
        [Key]
        public int OrderID { get; set; }
        public int UserID { get; set; }
        public string OrderStatus { get; set; }
        public DateTime OrderDate { get; set; }
        public double TotalPrice { get; set; }
    }
}