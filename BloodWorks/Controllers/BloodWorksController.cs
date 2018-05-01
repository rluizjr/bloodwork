using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BloodWorks.Data;
using BloodWorks.Models;

namespace BloodWorks.Controllers
{
    [Produces("application/json")]
    [Route("api/BloodWorks")]
    public class BloodWorksController : Controller
    {
        private readonly BloodWorkContext _context;

        public BloodWorksController(BloodWorkContext context)
        {
            _context = context;
        }

        // GET: api/BloodWorks
        [HttpGet]
        public IEnumerable<BloodWork> GetBloodWork()
        {
            return _context.BloodWork;
        }

        // GET: api/BloodWorks/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBloodWork([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bloodWork = await _context.BloodWork.SingleOrDefaultAsync(m => m.IdBloodWorks == id);

            if (bloodWork == null)
            {
                return NotFound();
            }

            return Ok(bloodWork);
        }

        // PUT: api/BloodWorks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBloodWork([FromRoute] int id, [FromBody] BloodWork bloodWork)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bloodWork.IdBloodWorks)
            {
                return BadRequest();
            }

            _context.Entry(bloodWork).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BloodWorkExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBloodWork", new { id = bloodWork.IdBloodWorks }, bloodWork);
            //return NoContent();
        }

        // POST: api/BloodWorks
        [HttpPost]
        public async Task<IActionResult> PostBloodWork([FromBody] BloodWork bloodWork)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.BloodWork.Add(bloodWork);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBloodWork", new { id = bloodWork.IdBloodWorks }, bloodWork);
        }

        // DELETE: api/BloodWorks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBloodWork([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bloodWork = await _context.BloodWork.SingleOrDefaultAsync(m => m.IdBloodWorks == id);
            if (bloodWork == null)
            {
                return NotFound();
            }

            _context.BloodWork.Remove(bloodWork);
            await _context.SaveChangesAsync();

            return Ok(bloodWork);
        }

        private bool BloodWorkExists(int id)
        {
            return _context.BloodWork.Any(e => e.IdBloodWorks == id);
        }
    }
}