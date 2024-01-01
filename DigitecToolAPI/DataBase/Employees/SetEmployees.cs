using DigitecToolAPI.Packages;
using MongoDB.Driver;

namespace DigitecToolAPI
{
    public class SetEmployees
    {

        public static IMongoCollection<Employee> Employee_DB = Mongo.db.GetCollection<Employee>("Employees");

        public static async Task<bool> AddEmployeeAsync(Employee newEmployee)
        {
            var filter = Builders<Employee>.Filter.Eq(Em => Em.PersonalNumber, newEmployee.PersonalNumber);

            try
            {
                if (await Employee_DB.Find(filter).AnyAsync())
                {
                    Console.WriteLine("Found existing Employee");
                    return false;
                }

                await Employee_DB.InsertOneAsync(newEmployee);

                if (await Employee_DB.Find(filter).AnyAsync())
                {
                    Console.WriteLine("Found Employee after insert");
                    return true;
                }
                else
                {
                    Console.WriteLine("Didnt found Employee after insert");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error at AddEmployeeAsync: " + ex.Message);
                return false;
            }
        }
    }
}