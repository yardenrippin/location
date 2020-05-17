using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Net;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Locations.Data
{

    public class My_Location
    {
        public int Id { get; set; }
        public string LocationName { get; set; }

        public decimal Longitude { get; set; }

        public decimal Latitude { get; set; }
        public DateTime Date { get; set; }
        public string Day { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }
        public string Hour { get; set; }
        public string Minute { get; set; }
        public string Dow { get; set; }
        public string IPAddress { get; set; }

        public My_Location()
        {
            this.Date = DateTime.Now;

            this.Day = this.Date.Day.ToString();
            this.Month = this.Date.Month.ToString();
            this.Year = this.Date.Year.ToString();
            this.Hour = this.Date.Hour.ToString();
            this.Minute = this.Date.Minute.ToString();
            this.Dow = this.Date.DayOfWeek.ToString();
        }
    }
}
