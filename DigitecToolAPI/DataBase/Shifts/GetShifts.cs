using DigitecToolAPI.Packages;
using MongoDB.Driver;

namespace DigitecToolAPI
{

    public class GetRawShifts
    {
        public static IMongoCollection<RawShift> RawShift_DB = Mongo.db.GetCollection<RawShift>("RawShifts");

        public static async Task<RawShift> GetRawShiftFromDatabase(int personalNumber, DateOnly shiftDate)
        {
            var filter = Builders<RawShift>.Filter.Eq(x => x.PersonalNumber, personalNumber) & Builders<RawShift>.Filter.Eq(x => x.ShiftDate, shiftDate);
            return await RawShift_DB.Find(filter).FirstOrDefaultAsync();
        }

        public static async Task<bool> RawShiftExists(int personalNumber, DateOnly shiftDate)
        {
            var filter = Builders<RawShift>.Filter.Eq(x => x.PersonalNumber, personalNumber) & Builders<RawShift>.Filter.Eq(x => x.ShiftDate, shiftDate);
            var existingShift = await RawShift_DB.Find(filter).FirstOrDefaultAsync();
            return existingShift != null;
        }

        public static async Task<List<RawShift>> GetRawShiftsForMonth(DateOnly firstDayOfMonth)
        {

            var filter = Builders<RawShift>.Filter.Gte(x => x.ShiftDate, firstDayOfMonth);
            return await RawShift_DB.Find(filter).ToListAsync();

        }

    }
}