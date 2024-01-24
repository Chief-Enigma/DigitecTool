
using DigitecToolAPI.Packages;
using MongoDB.Driver;

namespace DigitecToolAPI
{
  public class GetTickets
  {
    public static IMongoCollection<Ticket> Ticket_DB = Mongo.db.GetCollection<Ticket>("Tickets");
    public static async Task<List<Ticket>?> GetAllTicketsAsync(string ticketState)
    {
      var filter = Builders<Ticket>.Filter.Eq(ticket => ticket.TicketState, ticketState);

      try
      {
        var tickets = await Ticket_DB.Find(filter).ToListAsync();

        if (tickets != null)
        {
          foreach (var ticket in tickets)
          {
            ticket.TicketText = "";
          }
          return tickets;
        }
        Console.WriteLine($"No Tickets found in the DataBase!");
        return null;


      }
      catch (Exception ex)
      {
        Console.WriteLine("Error at GetAllTicketsAsync: " + ex.Message);
        return null;
      }
    }

    public static async Task<Ticket?> GetTicketByNumberAsync(int ticketNumber)
    {
      var filter = Builders<Ticket>.Filter.Eq(ticket => ticket.TicketNumber, ticketNumber);

      try
      {
        var ticket = await Ticket_DB.Find(filter).FirstOrDefaultAsync();
        if (ticket != null)
        {
          return ticket;
        }
        Console.WriteLine($"No Ticket with Ticketnumber {ticketNumber} found in the DataBase!");
        return null;
      }
      catch (Exception ex)
      {
        Console.WriteLine("Error at GetTicketByNumberAsync: " + ex.Message);
        return null;
      }
    }
  }
}