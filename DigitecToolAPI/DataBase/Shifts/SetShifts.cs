using DigitecToolAPI.Packages;
using MongoDB.Driver;

namespace DigitecToolAPI
{

    public class SetRawShifts
    {
        public static IMongoCollection<RawShift> RawShift_DB = Mongo.db.GetCollection<RawShift>("RawShifts");

        public static async Task SaveRawShiftToDatabase(RawShift rawShift)
        {
            await RawShift_DB.InsertOneAsync(rawShift);
        }

    }
}