using DigitecToolAPI.Packages;
using MongoDB.Driver;

namespace DigitecToolAPI
{
    public class SetLoginCredentials
    {
        public static IMongoCollection<LoginCredentials> LoginCredentials_DB = Mongo.db.GetCollection<LoginCredentials>("LoginCredentials");

        public static async Task<bool> AddLoginCredentialsAsync(LoginCredentials newloginCredentials)
        {
            var filter = Builders<LoginCredentials>.Filter.Eq(lc => lc.PersonalNumber, newloginCredentials.PersonalNumber);
            try
            {
                if (await LoginCredentials_DB.Find(filter).AnyAsync())
                {
                    Console.WriteLine("Found existing login");
                    return false;
                }

                newloginCredentials.PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(newloginCredentials.PersonalNumber.ToString(), 13);
                await LoginCredentials_DB.InsertOneAsync(newloginCredentials);
                Console.WriteLine("Inserted passed");

                if (await LoginCredentials_DB.Find(filter).AnyAsync())
                {
                    Console.WriteLine("Found after insert");
                    return true;
                }
                else
                {
                    Console.WriteLine("Didnt found after insert");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Nope not at all...." + ex.Message);
                return false;
            }
        }

        public static async Task<bool> EditLoginCredentialsAsync(int PersonalNumber, ChangeCredentials updateloginCredentials)
        {
            var filter = Builders<LoginCredentials>.Filter.Eq(lc => lc.PersonalNumber, PersonalNumber);
            UpdateDefinition<LoginCredentials> update;
            try
            {
                if (await LoginCredentials_DB.Find(filter).AnyAsync())
                {

                    if (updateloginCredentials.Type == "Password")
                    {
                        update = Builders<LoginCredentials>.Update
                        .Set(lc => lc.PasswordHash, BCrypt.Net.BCrypt.EnhancedHashPassword(updateloginCredentials.Payload.ToString(), 13));
                    }
                    else if (updateloginCredentials.Type == "Email")
                    {
                        update = Builders<LoginCredentials>.Update
                        .Set(lc => lc.Email, updateloginCredentials.Payload);
                    }
                    else if (updateloginCredentials.Type == "UserRole")
                    {
                        update = Builders<LoginCredentials>.Update
                        .Set(lc => lc.UserRole, updateloginCredentials.Payload);
                    }
                    else
                    {
                        return false;
                    }

                    var result = await LoginCredentials_DB.UpdateOneAsync(filter, update);

                    if (result.ModifiedCount == 0)
                    {
                        Console.WriteLine("Nothing changed");
                        return false;
                    }
                    Console.WriteLine("Passed");
                    return true;
                }
                Console.WriteLine("Nothing found");
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine("FUUUUUUUUUUUUCK");
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public static async Task<bool> DeletLoginCredentialsAsync(int PersonalNumber)
        {
            var filter = Builders<LoginCredentials>.Filter.Eq(lc => lc.PersonalNumber, PersonalNumber);
            try
            {
                await LoginCredentials_DB.DeleteOneAsync(filter);
                if (!await LoginCredentials_DB.Find(filter).AnyAsync())
                {
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

    }
}