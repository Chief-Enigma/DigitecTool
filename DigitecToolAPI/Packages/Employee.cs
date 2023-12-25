using MongoDB.Bson;

namespace DigitecToolAPI.Packages
{
    // This Package will stored in Employee DataBase
    public class Employee
    {
        public ObjectId Id { get; set; }
        public int PersonalNumber { get; set; }
        public string Team { get; set; } = string.Empty;
        public string? WorkerRole { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string Phonenumber { get; set; } = string.Empty;
    }
}
