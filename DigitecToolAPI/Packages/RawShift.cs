using MongoDB.Bson;

namespace DigitecToolAPI.Packages
{
    //Package for Raw Shifts that are stored in the DataBase
    public class RawShift
    {
        public ObjectId Id { get; set; }
        public int PersonalNumber { get; set; }
        public DateOnly ShiftDate { get; set; }
        public string? Shift { get; set; }
        public string? Job { get; set; }
        public string Note { get; set; } = string.Empty;
    }
}
