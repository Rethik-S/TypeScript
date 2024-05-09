using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineGroceryAPI.Data
{
    [Table("Items", Schema = "public")]
    public class Items
    {
        [Key]
        public int ItemID { get; set; }
        public int OrderID { get; set; }
        public int ProductID { get; set; }
        public int PurchaseCount { get; set; }
        public double PriceOfItems { get; set; }
    }
}