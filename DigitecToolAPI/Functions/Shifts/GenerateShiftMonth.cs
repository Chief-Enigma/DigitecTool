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

                    // Überprüfen, ob bereits ein RawShift für diese Personalnummer und Datum existiert
                    if (!await GetRawShifts.RawShiftExists(employee.PersonalNumber, shiftDate))
                    {
                        // Wenn nicht vorhanden, RawShift generieren und in die Datenbank schreiben
                        RawShift rawShift = new RawShift
                        {
                            PersonalNumber = employee.PersonalNumber,
                            ShiftDate = shiftDate,
                            // Other properties are set to their default values
                        };

                        // Hier können Sie den RawShift in die Datenbank schreiben
                        await SetRawShifts.SaveRawShiftToDatabase(rawShift);

                        // Nach dem Speichern in die Datenbank können Sie den RawShift wieder abrufen, um die ObjectId zu erhalten
                        var savedShift = await GetRawShifts.GetRawShiftFromDatabase(employee.PersonalNumber, shiftDate);
                        shifts.Add(savedShift);
                    }
                    else
                    {
                        // Wenn bereits vorhanden, können Sie den vorhandenen RawShift abrufen und zur Liste hinzufügen
                        var existingShift = await GetRawShifts.GetRawShiftFromDatabase(employee.PersonalNumber, shiftDate);
                        shifts.Add(existingShift);
                    }
                }
            }

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