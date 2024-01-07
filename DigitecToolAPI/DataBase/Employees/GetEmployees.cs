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

        public static async Task<Employee?> GetEmployeeByPersonalNumberAsync(int PersonalNumber)
        {
            var filter = Builders<Employee>.Filter.Eq(em => em.PersonalNumber, PersonalNumber);

            try
            {
                var Employee = await Employee_DB.Find(filter).FirstOrDefaultAsync();

                if (Employee != null)
                {
                    return (Employee);
                }
                Console.WriteLine("Nix in Db gefunden");
                return (null);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error at GetEmployeeByPersonalNumberAsync: " + ex.Message);
                return (null);
            }
        }
    }
}