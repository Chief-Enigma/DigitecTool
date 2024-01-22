using Microsoft.AspNetCore.Mvc;
using DigitecToolAPI.Packages;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DigitecToolAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {

        // GET api/<ShiftController>/5
        [HttpGet("all")]
        public async Task<ActionResult> GetAllTicketsAsync()
        {

            var demoticket = new Ticket
            {
                TicketNumber = 123456,
                CreationDate = new DateOnly(),
                Location = ["A", "A-AKL"],
                AKZ = "RBG04",
                CreatedBy = "Zeljko Sakac",
                TicketText = "Dies ist ein Beispieltext.\nMit Zeilenumbrüchen und Tabulatoren."
            };

            List<Ticket> thisListTicket = new List<Ticket>();

            thisListTicket.Add(demoticket);



            if (true)
            {
                return Ok(thisListTicket);
            }
            else
            {
                return NotFound();
            }
        }

        // GET api/<ShiftController>/5
        [HttpGet("{ticketNumber}")]
        public async Task<ActionResult> GetTicketByNumberAsync(string month)
        {
            var workerShifts = await GenerateShifts.GetShiftsForCurrentMonthAsync(month);

            if (workerShifts != null)
            {
                return Ok(workerShifts);
            }
            else
            {
                return NotFound();
            }
        }

        // POST api/<ShiftController>
        [HttpPost("create")]
        public async Task<ActionResult> PostAsync([FromBody] Ticket newTicket)
        {
            Console.WriteLine(newTicket);


            return Ok(newTicket);
        }

        [HttpPut("update/{ticketNumber}")]
        public async Task<ActionResult> SaveDayAsync([FromBody] RawShift updatedShift)
        {
            var result = await SaveShifts.SaveShiftDayToDB(updatedShift);

            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<ShiftController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
