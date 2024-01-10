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
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ShiftController>
        [HttpPost("newmonth")]
        public async Task<ActionResult> PostAsync([FromBody] newShiftRequest request)
        {

            List<RawShift> rawShifts = await GenerateShifts.GenerateNewShiftMonth(request);
            return Ok(rawShifts);
        }

        [HttpPut("savemonth")]
        public async Task<ActionResult> SaveMonthAsync([FromBody] List<RawShift> updatedShifts)
        {
            var result = await SaveShifts.SaveShiftsToDB(updatedShifts);
            Console.WriteLine(updatedShifts);

            if (result)
            {
                return Ok("Shifts updated successfully.");
            }
            else
            {
                return StatusCode(500, "Internal Server Error");
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
