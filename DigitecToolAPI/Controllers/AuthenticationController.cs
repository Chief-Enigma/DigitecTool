using Microsoft.AspNetCore.Mvc;
using DigitecToolAPI.Packages;

namespace DigitecToolAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        // POST - LoginRequest
        [HttpPost]
        public IActionResult Post([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest.LoginEmail != null && loginRequest.LoginPassword != null)
            {
                var (Approved, ReturnCredentials, ExMessage) = Authentication.ApproveLoginRequest(loginRequest.LoginEmail, loginRequest.LoginPassword);
                var Response = new AuthenticationResult();

                if (Approved)
                {
                    Response.StatusCode = 200;
                    Response.ReturnCredentials = ReturnCredentials;
                    Response.ExMessage = string.Empty;

                    return Ok(Response);
                }
                else
                {
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
