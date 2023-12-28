using DigitecToolAPI.Packages;
using MongoDB.Driver;

namespace DigitecToolAPI
{
    public class GetLoginCredentials
    {
        public static IMongoCollection<LoginCredentials> LoginCredentials_DB = Mongo.db.GetCollection<LoginCredentials>("LoginCredentials");

        public static async Task<(bool Success, LoginCredentials? loginCredentials, string ExMessage)> GetLoginCredentialsByEmailAsync(string AccountEmail)
        {
            var filter = Builders<LoginCredentials>.Filter.Eq(lc => lc.Email, AccountEmail);

            try
            {
                var loginCredentials = await LoginCredentials_DB.Find(filter).FirstOrDefaultAsync();

                return (true, loginCredentials, "");
            }
            catch
            {
                Console.WriteLine("Nix in Db gefunden");
                return (false, null, "E404");
            }
        }

        public static async Task<bool> CheckLoginExistsAsync(int PersonalNumber)
        {
            var filter = Builders<LoginCredentials>.Filter.Eq(lc => lc.PersonalNumber, PersonalNumber);

            try
            {
                return await LoginCredentials_DB.Find(filter).AnyAsync();
            }
            catch
            {
                return false;
            }
        }
    }
}