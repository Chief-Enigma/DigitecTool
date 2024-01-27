using DigitecToolAPI.Packages;
using MongoDB.Driver;

namespace DigitecToolAPI
{
  public class SetTickets
  {
    public static IMongoCollection<Ticket> Ticket_DB = Mongo.db.GetCollection<Ticket>("Tickets");

    public static async Task<Ticket?> AddTicketAsync(Ticket newTicket)
    {
      Console.WriteLine("Got here1");
      try
      {
        int nextTicketNumber = await GetNextTicketNumberAsync();
        newTicket.TicketNumber = nextTicketNumber;
        Console.WriteLine("Got here2");
        await Ticket_DB.InsertOneAsync(newTicket);
        Console.WriteLine("Got here3");
        return newTicket;
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error at AddTicketAsync: {ex.Message}");
        return null;
      }
    }

    private static async Task<int> GetNextTicketNumberAsync()
    {
      var sortDefinition = Builders<Ticket>.Sort.Descending(ticket => ticket.TicketNumber);
      var highestTicket = await Ticket_DB.Find(_ => true).Sort(sortDefinition).Limit(1).FirstOrDefaultAsync();

      if (highestTicket != null)
      {
        return highestTicket.TicketNumber + 1;
      }
      else
      {
        return 1;
      }
    }

    public static async Task<Ticket?> UpdateTicketAsync(Ticket updatedTicket)
    {
      var filter = Builders<Ticket>.Filter.Eq(ticket => ticket.TicketNumber, updatedTicket.TicketNumber);

      try
      {
        var existingTicket = await Ticket_DB.Find(filter).FirstOrDefaultAsync();
        if (existingTicket != null)
        {
          existingTicket.TicketState = updatedTicket.TicketState;
          existingTicket.TicketTitle = updatedTicket.TicketTitle;
          existingTicket.TicketLocations = updatedTicket.TicketLocations;
          existingTicket.AKZ = updatedTicket.AKZ;
          existingTicket.TicketText = updatedTicket.TicketText;

          await Ticket_DB.ReplaceOneAsync(filter, existingTicket);
          return await Ticket_DB.Find(filter).FirstOrDefaultAsync();
        }
        else
        {
          return await AddTicketAsync(updatedTicket);
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error at UpdateTicketAsync: {ex.Message}");
        return null;
      }
    }

    public static async Task<bool> DeletTicketAsync(int TicketNumber)
    {
      var filter = Builders<Ticket>.Filter.Eq(ticket => ticket.TicketNumber, TicketNumber);
      try
      {
        await Ticket_DB.DeleteOneAsync(filter);
        if (!await Ticket_DB.Find(filter).AnyAsync())
        {
          return true;
        }
        return false;
      }
      catch (Exception ex)
      {
        Console.WriteLine("Error at DeletTicketAsync: " + ex.Message);
        return false;
      }
    }
  }
}