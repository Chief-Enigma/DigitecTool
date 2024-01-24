using MongoDB.Bson;

namespace DigitecToolAPI.Packages
{
  public class Ticket
  {
    public ObjectId Id { get; set; }
    public int TicketNumber { get; set; }
    public string? TicketState { get; set; }
    public DateTime CreationDate { get; set; }
    public string? TicketTitle { get; set; }
    public List<string>? Location { get; set; }
    public string? AKZ { get; set; }
    public string? CreatedBy { get; set; }
    public string? TicketText { get; set; }
  }
}