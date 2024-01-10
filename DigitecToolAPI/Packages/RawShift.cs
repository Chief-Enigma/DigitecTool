using MongoDB.Bson;

namespace DigitecToolAPI.Packages
{
    // This Package will stored in Employee DataBase
    public class RawShift
    {
        public ObjectId Id { get; set; }
        public int PersonalNumber { get; set; }
        public DateOnly ShiftDate { get; set; }
        public string? Shift { get; set; } = string.Empty;
        public string? Job { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
    }
}
