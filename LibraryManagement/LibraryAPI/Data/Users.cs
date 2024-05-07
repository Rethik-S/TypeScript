using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace LibraryAPI.Data
{
    [Table("Users", Schema = "public")]
    public class Users
    {
        [Key]
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Department { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public double Balance { get; set; }
    }
}