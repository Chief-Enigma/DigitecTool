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
        public async Task<IEnumerable<Employee>?> GetAsync()
        {
            return await GetEmployees.GetAllEmployeesAsync();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
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
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
