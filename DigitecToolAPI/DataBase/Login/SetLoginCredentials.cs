using DigitecToolAPI.Packages;
using MongoDB.Driver;

namespace DigitecToolAPI
{
    public class SetLoginCredentials
    {
        public static IMongoCollection<LoginCredentials> LoginCredentials_DB = Mongo.db.GetCollection<LoginCredentials>("LoginCredentials");

        public static async Task<bool> AddLoginCredentialsAsync(int PersonalNumber)
        {
            var filter = Builders<LoginCredentials>.Filter.Eq(lc => lc.PersonalNumber, PersonalNumber);
            try
            {
                if (await LoginCredentials_DB.Find(filter).AnyAsync())
                {
                    Console.WriteLine("Found existing login");
                    return false;
                }

                var Employee = await GetEmployees.GetEmployeeByPersonalNumberAsync(PersonalNumber);

                if (Employee == null)
                {
                    return false;
                }

                LoginCredentials newloginCredentials = new()
                {
                    PersonalNumber = PersonalNumber,
                    Email = Employee.Email,
                    UserRole = "user",
                    Permissions = ["reportsick"]
                };

                newloginCredentials.PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(newloginCredentials.PersonalNumber.ToString(), 13);
                await LoginCredentials_DB.InsertOneAsync(newloginCredentials);

                if (await LoginCredentials_DB.Find(filter).AnyAsync())
                {
                    Console.WriteLine("Found Login after insert");
                    return true;
                }
                else
                {
                    Console.WriteLine("Didnt found Login after insert");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error at AddLoginCredentialsAsync: " + ex.Message);
                return false;
            }
        }

        public static async Task<bool> EditLoginCredentialsAsync(int PersonalNumber, ChangeCredentials updateloginCredentials)
        {
            var filter = Builders<LoginCredentials>.Filter.Eq(lc => lc.PersonalNumber, PersonalNumber);
            UpdateDefinition<LoginCredentials> update;

            if (updateloginCredentials.Payload == null)
            {
                return false;
            }
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
                    else if (updateloginCredentials.Type == "Permissions")
                    {
                        List<string>? permissionsList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<string>>(updateloginCredentials.Payload);

                        update = Builders<LoginCredentials>.Update
                            .Set(lc => lc.Permissions, permissionsList);
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
                Console.WriteLine("Error at EditLoginCredentialsAsync: " + ex.Message);
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
            catch (Exception ex)
            {
                Console.WriteLine("Error at DeletLoginCredentialsAsync: " + ex.Message);
                return false;
            }
        }

    }
}