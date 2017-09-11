using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JobAdsCheckout.Models
{
    public class Privilege
    {
        public string customer { get; set; }
        public Offer[] offers { get; set; }  
    }
}