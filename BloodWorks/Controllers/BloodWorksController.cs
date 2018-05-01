using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BloodWorks.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BloodWorks.Controllers
{
    [Produces("application/json")]
    [Route("api/BloodWorks")]
    public class BloodWorksController : Controller
    {
        // GET: api/BloodWorks
        [HttpGet]
        public IEnumerable<BloodWork> Get()
        {
            BloodWork bloodWork1 = new BloodWork();
            bloodWork1.IdBloodWorks = 1;
            bloodWork1.Description = "Renato Test1";

            BloodWork bloodWork2 = new BloodWork();
            bloodWork2.IdBloodWorks = 2;
            bloodWork2.Description = "Renato Test2";

            return new BloodWork[] { bloodWork1, bloodWork2 };
        }

        // GET: api/BloodWorks/5
        [HttpGet("{id}", Name = "Get")]
        public BloodWork Get(int id)
        {
            BloodWork bloodWork1 = new BloodWork();
            bloodWork1.Description = "Renato Test";
            return bloodWork1;
        }
        
        // POST: api/BloodWorks
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/BloodWorks/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
