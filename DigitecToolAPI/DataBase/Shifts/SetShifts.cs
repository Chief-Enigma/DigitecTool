using DigitecToolAPI.Packages;
using MongoDB.Driver;

namespace DigitecToolAPI
{

    public class SetRawShifts
    {
        public static IMongoCollection<RawShift> RawShift_DB = Mongo.db.GetCollection<RawShift>("RawShifts");

        public static async Task<RawShift?> SaveRawShiftToDatabase(RawShift rawShift)
        {
            try
            {
                await RawShift_DB.InsertOneAsync(rawShift);

                return await GetRawShifts.GetRawShiftFromDatabase(rawShift.PersonalNumber, rawShift.ShiftDate);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving RawShift to database: {ex.Message}");
                return null;
            }
        }

    }
}