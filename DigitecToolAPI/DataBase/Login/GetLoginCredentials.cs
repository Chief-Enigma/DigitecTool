using DigitecToolAPI.Packages;
using MongoDB.Driver;

namespace DigitecToolAPI
{
    public class GetLoginCredentials
    {
        public static IMongoCollection<LoginCredentials> LoginCredentials_DB = Mongo.db.GetCollection<LoginCredentials>("LoginCredentials");

        public static (bool Success, LoginCredentials? loginCredentials, string ExMessage) GetLoginCredentialsByEmail(string AccountEmail)
        {
            var filter = Builders<LoginCredentials>.Filter.Eq(lc => lc.Email, AccountEmail);

            try
            {
                var loginCredentials = LoginCredentials_DB.Find(filter).First();

                return (true, loginCredentials, "");
            }
            catch
            {
                Console.WriteLine("Nix in Db gefunden");
                return (false, null, "E404");
            }
        }

        public static bool CheckLoginExists(int PersonalNumber)
        {
            var filter = Builders<LoginCredentials>.Filter.Eq(lc => lc.PersonalNumber, PersonalNumber);
            try{
                return LoginCredentials_DB.Find(filter).Any();
            }catch{
                return false;
            }

        }
    }
}