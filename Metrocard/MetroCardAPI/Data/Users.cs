using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MetroCardAPI.Data
{
    [Table("Users", Schema = "public")]
    public class Users
    {
        [Key]
        public int CardNumber { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public double Balance { get; set; }
        public string Email { get; set; }
    }
}