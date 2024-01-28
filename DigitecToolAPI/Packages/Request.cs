using MongoDB.Bson;

namespace DigitecToolAPI
{
    public class Request
    {
        public ObjectId Id { get; set; }
        public int RequestNumber { get; set; }
        public string? RequestType { get; set; }
        public string? RequestState { get; set; }
        public DateOnly CreationDate { get; set; }
        public int RequestFrom { get; set; }
        public DateOnly DateFrom { get; set; }
        public DateOnly DateTo { get; set; }
        public string? Note { get; set; }
    }
}