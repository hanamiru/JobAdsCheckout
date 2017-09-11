using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
//using System.Web.Mvc;

namespace JobAdsCheckout.Controllers
{
    public class DefaultApiController : ApiController
    {
        // GET: DefaultApi
        [HttpGet]
        public string Heartbeat()
        {
            return "Hello World";
        } 

        
    }
}