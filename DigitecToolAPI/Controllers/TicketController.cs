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
    [HttpGet("ticket/{ticketNumber}")]
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
    [HttpPost]
    public async Task<ActionResult> CreateTicketAsync([FromBody] Ticket newTicket)
    {
      Console.WriteLine("Got here0");
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
    [HttpPut]
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
    public async Task<IActionResult> DeleteTicketAsync(int ticketNumber)
    {
      if (await SetTickets.DeletTicketAsync(ticketNumber))
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
