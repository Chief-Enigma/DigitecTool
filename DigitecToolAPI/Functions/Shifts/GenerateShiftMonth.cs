using DigitecToolAPI.Packages;
namespace DigitecToolAPI
{
    public class GenerateShifts
    {
        public static async Task<List<RawShift>> GenerateNewShiftMonth(newShiftRequest request)
        {
            List<Employee>? employees = await GetEmployees.GetEmployeesByTeamAsync(request.team);
            Console.WriteLine("Employees count: " + employees.Count());

            int monthNumber = ConvertMonthNameToNumber(request.month);
            Console.WriteLine("Got Monthnumber: " + request.month + " " + monthNumber);

            List<RawShift> shifts = [];

            foreach (Employee employee in employees)
            {
                Console.WriteLine("Employee: " + employee.FirstName);

                for (int day = 1; day <= DateTime.DaysInMonth(DateTime.Now.Year, monthNumber); day++)
                {
                    DateOnly shiftDate = new DateOnly(DateTime.Now.Year, monthNumber, day);
                    Console.WriteLine("Date: " + shiftDate);

                    var ShiftFromDB = await GetRawShifts.RawShiftExists(employee.PersonalNumber, shiftDate);

                    if (ShiftFromDB != null)
                    {
                        Console.WriteLine("FoundShift!");
                        shifts.Add(ShiftFromDB);
                    }
                    else
                    {
                        Console.WriteLine("Nope didnt found shift");
                        RawShift newRawShift = new RawShift
                        {
                            PersonalNumber = employee.PersonalNumber,
                            ShiftDate = shiftDate,
                            Shift = "FS",
                        };

                        RawShift? newShiftFromDB = await SetRawShifts.SaveRawShiftToDatabase(newRawShift);

                        Console.WriteLine("Wrote Shift to DB, Personalnumber: " + employee.PersonalNumber + " Date: " + shiftDate);
                        shifts.Add(newShiftFromDB);
                    }
                }
            }

            return shifts;
        }

        public static async Task<List<WorkerShift>> GetShiftsForCurrentMonthAsync(string month)
        {
            List<Employee>? employees = await GetEmployees.GetAllEmployeesAsync();

            int monthNumber = ConvertMonthNameToNumber(month);
            Console.WriteLine("Got Monthnumber: " + month + " " + monthNumber);

            int currentDay = DateTime.Now.Day;
            Console.WriteLine($"Today is the {currentDay}. {month}");

            List<WorkerShift> workerShifts = [];

            foreach (Employee employee in employees)
            {
                Console.WriteLine("Employee: " + employee.FirstName);

                for (int day = currentDay; day <= DateTime.DaysInMonth(DateTime.Now.Year, monthNumber); day++)
                {
                    DateOnly shiftDate = new DateOnly(DateTime.Now.Year, monthNumber, day);
                    var rawShift = await GetRawShifts.GetRawShiftFromDatabase(employee.PersonalNumber, shiftDate);

                    if (rawShift != null)
                    {
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
                }
            }

            return workerShifts;
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