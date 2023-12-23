using DigitecToolAPI.DataBase;
using DigitecToolAPI.Packages;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DigitecToolAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("all")]
        public List<User> Get()
        {
            return UserDataBase.GetAllUsers();
        }


        [HttpGet("{Personalnumber}")]
        public User Get(int Personalnumber)
        {
            return UserDataBase.GetSpecificUser(Personalnumber);
        }


        [HttpPost]
        [Route("adduser")]
        public ActionResult<User> Post([FromBody] User newUser)
        {
            var (success, addedUser, exmessage) = UserDataBase.AddUser(newUser);

            if (success)
            {
                return StatusCode(200, addedUser);
            }
            else
            {
                return StatusCode(500, exmessage);
            }

        }


        [HttpPut("edituser/{Personalnumber}")]
        public User? Put(int Personalnumber, [FromBody] User existingUser)
        {
            return UserDataBase.EditUser(existingUser, Personalnumber);
        }


        [HttpDelete("deleteuser/{Personalnumber}")]
        public IActionResult Delete(int Personalnumber)
        {
            bool deletionResult = UserDataBase.DeleteUser(Personalnumber);

            if (deletionResult)
            {
                return NoContent(); // 204 No Content
            }
            else
            {
                return NotFound(); // 404 Not Found
            }
        }
    }
}
