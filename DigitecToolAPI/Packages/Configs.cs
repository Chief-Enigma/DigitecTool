using MongoDB.Bson;

namespace DigitecToolAPI.Packages
{
    // This Package will stored in Config DataBase
    public class Configs
    {
        public ObjectId Id { get; set; }
        public List<string>? AvailableUserRoles {get; set; } // Permission Roles that are Available
        public List<string>? AvailableWorkerRoles {get; set; } // Worker Roles that are Available
        public List<string>? AvailableShifts {get; set; } // The Diffrent Shifts that are Available
        public List<string>? AvailableJobs {get; set; } // The Diffrent Jobs that are Available
    }
}
