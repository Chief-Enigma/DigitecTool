using MongoDB.Bson;

namespace DigitecToolAPI.Packages
{
    // This Package will stored in Employee DataBase
    public class LoginCredentials
    {
        public ObjectId Id { get; set; }
        public int PersonalNumber { get; set; }
        public string? Email { get; set; }
        public string? UserRole { get; set; }
        public string? PasswordHash { get; set; }
    }
}
