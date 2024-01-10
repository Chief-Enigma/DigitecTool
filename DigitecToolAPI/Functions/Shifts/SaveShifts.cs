using DigitecToolAPI.Packages;
using MongoDB.Driver;


namespace DigitecToolAPI
{
    public class SaveShifts
    {

        public static IMongoCollection<RawShift> RawShift_DB = Mongo.db.GetCollection<RawShift>("RawShifts");

        public static async Task<bool> SaveShiftsToDB(List<RawShift> updatedShifts)
        {
            try
            {
                foreach (var updatedShift in updatedShifts)
                {
                    var filter = Builders<RawShift>.Filter.Eq(x => x.PersonalNumber, updatedShift.PersonalNumber)
                               & Builders<RawShift>.Filter.Eq(x => x.ShiftDate, updatedShift.ShiftDate);

                    var existingShift = await RawShift_DB.Find(filter).FirstOrDefaultAsync();

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
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error at SaveShiftsToDB: {ex.Message}");
                Console.WriteLine("Internal Server Error");
                return false;
            }
        }

        public static async Task<bool> SaveShiftDayToDB(RawShift updatedShift)
        {
            try
            {
                var filter = Builders<RawShift>.Filter.Eq(x => x.PersonalNumber, updatedShift.PersonalNumber)
                           & Builders<RawShift>.Filter.Eq(x => x.ShiftDate, updatedShift.ShiftDate);

                var existingShift = await RawShift_DB.Find(filter).FirstOrDefaultAsync();

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

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error at SaveShiftDayToDB: {ex.Message}");
                Console.WriteLine("Internal Server Error");
                return false;
            }
        }


    }
}