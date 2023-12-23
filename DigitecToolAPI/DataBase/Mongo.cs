using MongoDB.Driver;

namespace DigitecToolAPI.DataBase
{
    public class Mongo
    {
        public static MongoClient mongoclient = new MongoClient("mongodb://localhost:27017");
        public static IMongoDatabase db = mongoclient.GetDatabase("DigitecTest");
    }
}
