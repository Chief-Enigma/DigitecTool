using DigitecToolAPI.Packages;
using Microsoft.AspNetCore.Mvc;


namespace DigitecToolAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        // GET - Get all Employees from Data Base
        [HttpGet("all")]
        public async Task<ActionResult> GetAllAsync()
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

        // GET api/<UserController>/5
        [HttpGet("team/{team}")]
        public async Task<ActionResult> GetByTeamAsync(string team)
        {
            var employees = await GetEmployees.GetEmployeesByTeamAsync(team);
            if (employees != null)
            {
                return Ok(employees);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetByPersonalNumberAsync(int id)
        {
            var employee = await GetEmployees.GetEmployeeByPersonalNumberAsync(id);
            if (employee != null)
            {
                return Ok(employee);
            }
            else
            {
                return NotFound();
            }
        }


        // POST - Add new Userlogin
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] Employee newEmployee)
        {
            if (await SetEmployees.AddEmployeeAsync(newEmployee))
            {
                Console.WriteLine("hehehehe");
                return Ok();
            }

            return NotFound();
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{PersonalNumber}")]
        public async Task<IActionResult> DeleteAsync(int PersonalNumber)
        {
            if (await SetEmployees.DeletEmployeeAsync(PersonalNumber))
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
