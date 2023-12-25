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
        public bool Get(int PersonalNumber)
        {
            return GetLoginCredentials.CheckLoginExists(PersonalNumber);
        }

        // POST - Add new Userlogin
        [HttpPost]
        public IActionResult Post([FromBody] LoginCredentials newloginCredentials)
        {
            // var Success = SetLoginCredentials.AddLoginCredentials(newloginCredentials);
            // Console.WriteLine("Return: " + Success);

            if (SetLoginCredentials.AddLoginCredentials(newloginCredentials))
            {
                Console.WriteLine("hehehehe");
                return Ok();
            }

            return NotFound();

        }

        // PUT - Edit LoginCredentials Ex. Email or Password
        [HttpPut("{PersonalNumber}")]
        public IActionResult Put(int PersonalNumber, [FromBody] ChangeCredentials updateloginCredentials)
        {
            if (SetLoginCredentials.EditLoginCredentials(PersonalNumber, updateloginCredentials) && updateloginCredentials.Payload != "")
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
        public IActionResult Delete(int PersonalNumber)
        {
            if (SetLoginCredentials.DeletLoginCredentials(PersonalNumber))
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
