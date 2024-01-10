using DigitecToolAPI.Packages;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DigitecToolAPI
{
    public class GenerateWorkerShifts
    {

        public static async Task<List<WorkerShift>> GetShiftsForCurrentMonthAsync()
        {
            try
            {
                var currentDate = DateTime.Now;
                var firstDayOfMonth = new DateOnly(currentDate.Year, currentDate.Month, 1);

                var rawShifts = await GetRawShifts.GetRawShiftsForMonth(firstDayOfMonth);

                var workerShifts = new List<WorkerShift>();
                foreach (var rawShift in rawShifts)
                {
                    var employee = await GetEmployees.GetEmployeeByPersonalNumberAsync(rawShift.PersonalNumber);
                    var workerShift = new WorkerShift
                    {
                        ShiftDate = rawShift.ShiftDate,
                        PersonalNumber = rawShift.PersonalNumber,
                        Name = $"{employee.FirstName} {employee.LastName}",
                        Role = employee.WorkerRole,
                        Shift = rawShift.Shift,
                        Job = rawShift.Job,
                        Note = rawShift.Note
                    };
                    workerShifts.Add(workerShift);
                }

                return workerShifts;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetShiftsForCurrentMonthAsync: {ex.Message}");
                throw;
            }
        }


    }
}