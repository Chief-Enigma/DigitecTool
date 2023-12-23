﻿using Microsoft.AspNetCore.Mvc;

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
        [HttpGet("{shiftDate}")]
        public string Get(string shiftDate)
        {
            return ("ShiftDate: " + shiftDate);
        }

        // POST api/<ShiftController>
        // Generate a new month with empty shifts
        [HttpPost]
        [Route("newshiftmonth")]
        public void Post([FromBody] string value)
        {
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
