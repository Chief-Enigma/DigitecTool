using DigitecToolAPI.Packages;
using Microsoft.AspNetCore.Mvc;

namespace DigitecToolAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        // GET - Check if Login for User allready exists
        [HttpGet("{PersonalNumber}")]
        public async Task<bool> GetAsync(int PersonalNumber)
        {
            return await GetLoginCredentials.CheckLoginExistsAsync(PersonalNumber);
        }

        [HttpGet("all")]
        public async Task<IEnumerable<LoginCredentials>?> GetAllAsync()
        {
            return await GetLoginCredentials.GetAllLoginCredentialsAsync();
        }

        // POST - Add new Userlogin
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] int PersonalNumber)
        {
            if (await SetLoginCredentials.AddLoginCredentialsAsync(PersonalNumber))
            {
                Console.WriteLine("hehehehe");
                return Ok();
            }

            return NotFound();
        }

        // PUT - Edit LoginCredentials Ex. Email or Password
        [HttpPut("{PersonalNumber}")]
        public async Task<IActionResult> PutAsync(int PersonalNumber, [FromBody] ChangeCredentials updateloginCredentials)
        {
            Console.WriteLine("gotsomething");
            if (await SetLoginCredentials.EditLoginCredentialsAsync(PersonalNumber, updateloginCredentials) && updateloginCredentials.Payload != null)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE - Remove UserLogin
        [HttpDelete("{PersonalNumber}")]
        public async Task<IActionResult> DeleteAsync(int PersonalNumber)
        {
            if (await SetLoginCredentials.DeletLoginCredentialsAsync(PersonalNumber))
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
