using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetroCardAPI.Data
{
    public class TravelDetails
    {
        public string TravelID { get; set; }
        public string CardNumber { get; set; }
        public string FromLocation { get; set; }
        public string ToLocation { get; set; }
        public string Date { get; set; }
        public double TravelCost { get; set; }

    }
}