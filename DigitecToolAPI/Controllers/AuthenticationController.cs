using Microsoft.AspNetCore.Mvc;
using DigitecToolAPI.Packages;

namespace DigitecToolAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        [HttpGet("LoginCredentials/{Email}")]
        public async Task<IActionResult> GetAsync(string Email)
        {
            Console.WriteLine("Login isnt null");

            var (Success, loginCredentials, ExMessage) = await GetLoginCredentials.GetLoginCredentialsByEmailAsync(Email);
            var Response = new AuthenticationResult();

            if (Success)
            {
                Console.WriteLine("Approved");
                loginCredentials.PasswordHash = string.Empty;
                Response.StatusCode = 200;
                Response.ReturnCredentials = loginCredentials;
                Response.ExMessage = string.Empty;

                return Ok(Response);
            }



            return NotFound();
        }
        // POST - LoginRequest
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] LoginRequest loginRequest)
        {
            Console.WriteLine("Got Post request");

            if (loginRequest.LoginEmail != null && loginRequest.LoginPassword != null)
            {
                Console.WriteLine("Login isnt null");

                var (Approved, ReturnCredentials, ExMessage) = await Authentication.ApproveLoginRequestAsync(loginRequest.LoginEmail, loginRequest.LoginPassword);
                var Response = new AuthenticationResult();

                if (Approved)
                {
                    Console.WriteLine("Approved");
                    Response.StatusCode = 200;
                    Response.ReturnCredentials = ReturnCredentials;
                    Response.ExMessage = string.Empty;

                    return Ok(Response);
                }
                else
                {
                    Console.WriteLine("Rejected!");
                    Response.StatusCode = 401;
                    Response.ReturnCredentials = null;
                    Response.ExMessage = ExMessage;

                    return Unauthorized(Response);
                }
            }

            return NotFound();
        }

    }
}
