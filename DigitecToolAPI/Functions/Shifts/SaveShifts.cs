using System.Globalization;
using DigitecToolAPI.Packages;
using MongoDB.Driver;


namespace DigitecToolAPI
{
    public class SaveShifts
    {

        public static IMongoCollection<RawShift> RawShift_DB = Mongo.db.GetCollection<RawShift>("RawShifts");

        public static async Task<RawShift?> SaveShiftDayToDB(RawShift updatedShift)
        {
            try
            {
                var filter = Builders<RawShift>.Filter.Eq(x => x.PersonalNumber, updatedShift.PersonalNumber)
                           & Builders<RawShift>.Filter.Eq(x => x.ShiftDate, updatedShift.ShiftDate);

                var existingShift = await RawShift_DB.Find(filter).FirstOrDefaultAsync();

                updatedShift.Shift = await GetShiftForJob(updatedShift.PersonalNumber, updatedShift.Job, updatedShift.ShiftDate);

                if (existingShift != null)
                {
                    existingShift.Shift = updatedShift.Shift;
                    existingShift.Job = updatedShift.Job;
                    existingShift.Note = updatedShift.Note;

                    await RawShift_DB.ReplaceOneAsync(filter, existingShift);
                }
                else
                {
                    await RawShift_DB.InsertOneAsync(updatedShift);
                }

                return await RawShift_DB.Find(filter).FirstOrDefaultAsync(); ;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error at SaveShiftDayToDB: {ex.Message}");
                Console.WriteLine("Internal Server Error");
                return null;
            }
        }

        public static async Task<string> GetShiftForJob(int PersonalNumber, string Job, DateOnly ShiftDate)
        {
            var Employee = await GetEmployees.GetEmployeeByPersonalNumberAsync(PersonalNumber);
            int calendarWeek = await GetCalendarWeekAsync(ShiftDate);

            Console.WriteLine("Teamname: " + Employee.Team + " Calender week and date: " + ShiftDate + " " + calendarWeek);

            string[] shiftJobs = { "F", "K", "TD", "KR", "-" };

            if (shiftJobs.Contains(Job))
            {
                return Job;
            }
            else
            {
                // Hier füge die Logik für Teams und Kalenderwochen hinzu
                if (Employee.Team == "Zeljko")
                {
                    if (calendarWeek % 2 == 0)
                    {
                        return "SS"; // Beispiel für gerade Kalenderwoche
                    }
                    else
                    {
                        return "FS"; // Beispiel für ungerade Kalenderwoche
                    }
                }
                else if (Employee.Team == "Eren")
                {
                    if (calendarWeek % 2 == 0)
                    {
                        return "FS"; // Beispiel für gerade Kalenderwoche
                    }
                    else
                    {
                        return "SS"; // Beispiel für ungerade Kalenderwoche
                    }
                }
                else
                {
                    return "DefaultShift";
                }
            }
        }

        public static async Task<int> GetCalendarWeekAsync(DateOnly shiftDate)
        {
            return await Task.Run(() =>
            {
                CultureInfo ci = CultureInfo.CurrentCulture;
                Calendar cal = ci.Calendar;
                CalendarWeekRule cwr = ci.DateTimeFormat.CalendarWeekRule;
                DayOfWeek fdow = ci.DateTimeFormat.FirstDayOfWeek +1 ;

                DateTime shiftDateTime = new DateTime(shiftDate.Year, shiftDate.Month, shiftDate.Day);
                return cal.GetWeekOfYear(shiftDateTime, cwr, fdow);
            });
        }



    }
}