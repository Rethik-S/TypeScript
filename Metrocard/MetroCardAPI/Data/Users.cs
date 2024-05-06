using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetroCardAPI.Data
{
    public class Users
    {
        public string CardNumber { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public double Balance { get; set; }
        public string Password { get; set; }
    }
}