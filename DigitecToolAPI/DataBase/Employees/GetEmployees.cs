using DigitecToolAPI.Packages;
using MongoDB.Driver;

namespace DigitecToolAPI
{
    public class GetEmployees
    {

        public static IMongoCollection<Employee> Employee_DB = Mongo.db.GetCollection<Employee>("Employees");

        public static async Task<List<Employee>?> GetAllEmployeesAsync()
        {
            var filter = Builders<Employee>.Filter.Empty; // Empty filter to get all documents

            try
            {
                var employees = await Employee_DB.Find(filter).ToListAsync();
                return employees;

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error at GetAllEmployeesAsync: " + ex.Message);
                return null;
            }
        }
    }
}