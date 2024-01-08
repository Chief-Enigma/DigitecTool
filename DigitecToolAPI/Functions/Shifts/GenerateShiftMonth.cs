using DigitecToolAPI.Packages;
namespace DigitecToolAPI
{
    public class GenerateShifts
    {
        public static async Task<List<RawShift>> GenerateNewShiftMonth(newShiftRequest request)
        {
            var employees = await GetEmployees.GetEmployeesByTeamAsync(request.team);
            Console.WriteLine("Got employees");
            int monthNumber = ConvertMonthNameToNumber(request.month);
            Console.WriteLine("Got Monthnumber: " + request.month + " " + monthNumber);


            List<RawShift> shifts = new List<RawShift>();

            foreach (var employee in employees)
            {
                for (int day = 1; day <= DateTime.DaysInMonth(DateTime.Now.Year, monthNumber); day++)
                {
                    DateOnly shiftDate = new DateOnly(DateTime.Now.Year, monthNumber, day);

                    RawShift rawShift = new RawShift
                    {
                        PersonalNumber = employee.PersonalNumber,
                        ShiftDate = shiftDate,
                        // Other properties are set to their default values
                    };

                    shifts.Add(rawShift);
                }
            }
            //Thread.Sleep(5000); // for loading screen testing simulate server is slow...
            return shifts;
        }


        private static readonly Dictionary<string, int> MonthNameToNumberMap = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase)
        {
            { "Januar", 1 },
            { "Februar", 2 },
            { "März", 3 },
            { "April", 4 },
            { "Mai", 5 },
            { "Juni", 6 },
            { "Juli", 7 },
            { "August", 8 },
            { "September", 9 },
            { "Oktober", 10 },
            { "November", 11 },
            { "Dezember", 12 },
        };

        public static int ConvertMonthNameToNumber(string monthName)
        {
            if (MonthNameToNumberMap.TryGetValue(monthName, out int monthNumber))
            {
                return monthNumber;
            }

            // If not found, return a default value (you can choose a specific value or throw an exception)
            return -1;
        }
    }
}