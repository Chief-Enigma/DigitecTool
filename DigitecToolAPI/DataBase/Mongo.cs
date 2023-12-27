using MongoDB.Driver;

namespace DigitecToolAPI
{
    public class Mongo
    {
        public static MongoClient mongoclient = new MongoClient("mongodb://192.168.100.215:27017");
        public static IMongoDatabase db = mongoclient.GetDatabase("DigitecTest");
    }
}