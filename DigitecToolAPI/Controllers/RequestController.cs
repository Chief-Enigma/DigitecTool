using DigitecToolAPI.Packages;
using Microsoft.AspNetCore.Mvc;


namespace DigitecToolAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        // GET - Get all Requests by RequestType
        [HttpGet("all/{Type}")]
        public async Task<ActionResult> GetAllAsync(string Type)
        {
            var employees = await GetEmployees.GetAllEmployeesAsync();
            if (employees != null)
            {
                return Ok(employees);
            }
            else
            {
                return NotFound();
            }
        }

        // GET - Get Request by RequestNumber
        [HttpGet("{RequestNumber}")]
        public async Task<ActionResult> GetByTeamAsync(int RequestNumber)
        {
            var employees = await GetEmployees.GetEmployeesByTeamAsync("team");
            if (employees != null)
            {
                return Ok(employees);
            }
            else
            {
                return NotFound();
            }
        }


        // POST - Add new Request
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] Request newRequest)
        {
            if (true)
            {
                return Ok();
            }

            return NotFound();
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{RequestNumber}")]
        public async Task<IActionResult> DeleteAsync(int RequestNumber)
        {
            if (await SetEmployees.DeletEmployeeAsync(RequestNumber))
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
