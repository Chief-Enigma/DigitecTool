using MongoDB.Driver;

namespace DigitecToolAPI
{
    public class Mongo
    {
        public static MongoClient mongoclient = new MongoClient("mongodb://192.168.100.87:27017");
        //public static MongoClient mongoclient = new MongoClient("mongodb://localhost:27017");
        public static IMongoDatabase db = mongoclient.GetDatabase("DigitecTest");
    }
}
