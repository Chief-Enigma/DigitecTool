using Microsoft.AspNetCore.Mvc;
using DigitecToolAPI.Packages;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DigitecToolAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShiftController : ControllerBase
    {
        // GET: api/<ShiftController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ShiftController>/5
        [HttpGet("getplan/{month}")]
        public async Task<ActionResult> GetAsync(string month)
        {
            var workerShifts = await GenerateShifts.GetShiftsForCurrentMonthAsync(month);
            
            if (workerShifts != null)
            {
                return Ok(workerShifts);
            }
            else
            {
                return NotFound();
            }
        }

        // POST api/<ShiftController>
        [HttpPost("newmonth")]
        public async Task<ActionResult> PostAsync([FromBody] newShiftRequest request)
        {
            if (request == null)
            {
                return BadRequest();
            }

            List<RawShift> rawShifts = await GenerateShifts.GenerateNewShiftMonth(request);
            return Ok(rawShifts);
        }

        [HttpPut("saveday")]
        public async Task<ActionResult> SaveDayAsync([FromBody] RawShift updatedShift)
        {
            var result = await SaveShifts.SaveShiftDayToDB(updatedShift);

            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<ShiftController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ShiftController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
