using MongoDB.Bson;

namespace DigitecToolAPI.Packages
{
  public class Ticket
  {
    public ObjectId Id { get; set; }
    public int TicketNumber { get; set; }
    public string? TicketState { get; set; }
    public DateOnly CreationDate { get; set; }
    public string? TicketTitle { get; set; }
    public List<string>? TicketLocations { get; set; }
    public string? AKZ { get; set; }
    public int CreatedBy { get; set; }
    public string? TicketText { get; set; }
  }
}