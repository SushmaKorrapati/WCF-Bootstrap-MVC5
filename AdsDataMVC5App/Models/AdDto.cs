using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdsDataMVC5App.Controllers
{
    public class AdDto
    {
        public int adId { get; set; }
        public int brandId { get; set; }
        public string brandName { get; set; }
        public Decimal numPages { get; set; }
        public string position { get; set; }
    }
}