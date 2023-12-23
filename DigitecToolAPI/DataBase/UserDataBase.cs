using DigitecToolAPI.Packages;
using MongoDB.Driver;

namespace DigitecToolAPI.DataBase
{


    public class UserDataBase
    {
        public static IMongoCollection<User> User_DB = Mongo.db.GetCollection<User>("Users");

        public static List<User> GetAllUsers()
        {
            List<User> users = new List<User>();
            var filter = Builders<User>.Filter.Empty;
            users = User_DB.Find(filter).ToList();
            
            return users;
        }

        public static User GetSpecificUser(int PersonalNumber)
        {
            var filter = Builders<User>.Filter.Eq(u => u.PersonalNumber, PersonalNumber);
            var user = User_DB.Find(filter).FirstOrDefault();
            return user;
        }

        public static (bool Success, User? AddedUser, string? ex) AddUser(User user)
        {
            try
            {
                User_DB.InsertOne(user);
                var addedUser = User_DB.Find(u => u.PersonalNumber == user.PersonalNumber).FirstOrDefault();
                if (addedUser != null)
                {
                    return (true, addedUser, "");
                }
                else
                {
                    return (false, null, "");
                }
            }
            catch (Exception ex)
            {
                return (false, null, ex.Message);
            }
        }

        public static User? EditUser(User user, int Personalnumber)
        {
            var filter = Builders<User>.Filter.Eq(u => u.PersonalNumber, Personalnumber);

            var update = Builders<User>.Update
                .Set(u => u.Team, user.Team)
                .Set(u => u.WorkerRole, user.WorkerRole)
                .Set(u => u.UserRole, user.UserRole)
                .Set(u => u.FirstName, user.FirstName)
                .Set(u => u.LastName, user.LastName)
                .Set(u => u.Email, user.Email)
                .Set(u => u.Phonenumber, user.Phonenumber);
            // Add other fields as needed

            var updateResult = User_DB.UpdateOne(filter, update);

            if (updateResult.IsAcknowledged && updateResult.ModifiedCount > 0)
            {
                var confirmedUser = User_DB.Find(filter).FirstOrDefault();
                return confirmedUser;
            }
            else
            {
                return null;
            }
        }

        public static bool DeleteUser(int personalNumber)
        {
            var filter = Builders<User>.Filter.Eq(u => u.PersonalNumber, personalNumber);
            var deleteResult = User_DB.DeleteOne(filter);
            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }
    }
}
