using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetroCardAPI.Data
{
    public class TicketFairs
    {
        public string TicketID { get; set; }
        public string FromLocation { get; set; }
        public string ToLocation { get; set; }
        public double TicketPrice { get; set; }
    }
}