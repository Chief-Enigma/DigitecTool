using Microsoft.AspNetCore.Mvc;
using DigitecToolAPI.Packages;


namespace DigitecToolAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TicketController : ControllerBase
  {

    // GET - Get all tickets by Ticketstate
    [HttpGet("all/{ticketState}")]
    public async Task<ActionResult> GetAllTicketsAsync(string ticketState)
    {
      var tickets = await GetTickets.GetAllTicketsAsync(ticketState);

      if (tickets != null)
      {
        return Ok(tickets);
      }
      else
      {
        return NotFound();
      }
    }

    // GET - Get Ticket Text from Ticketnumber
    [HttpGet("tickettext/{ticketNumber}")]
    public async Task<ActionResult> GetTicketTextByNumberAsync(int ticketNumber)
    {
      var ticket = await GetTickets.GetTicketByNumberAsync(ticketNumber);

      if (ticket != null)
      {
        return Ok(ticket);
      }
      else
      {
        return NotFound();
      }
    }

    // POST - Save new Ticket
    [HttpPost("create")]
    public async Task<ActionResult> CreateTicketAsync([FromBody] Ticket newTicket)
    {
      var addedTicket = await SetTickets.AddTicketAsync(newTicket);

      if (addedTicket != null)
      {
        return Ok(addedTicket);
      }
      else
      {
        return NotFound();
      }
    }

    // PUT - Save updated Ticket
    [HttpPut("updateticket")]
    public async Task<ActionResult> UpdateTicketAsync([FromBody] Ticket updatedTicket)
    {
      var ticket = await SetTickets.UpdateTicketAsync(updatedTicket);

      if (ticket != null)
      {
        return Ok(ticket);
      }
      else
      {
        return BadRequest();
      }
    }

    // DELETE - Delete Ticket
    [HttpDelete("delete/{ticketNumber}")]
    public async Task DeleteTicketAsync(int ticketNumber)
    {
    }
  }
}
