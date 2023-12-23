namespace DigitecToolAPI.Packages
{
    //Layout for the builded Shiftelement ready to send
    public class WorkerShift
    {
        public DateOnly ShiftDate { get; set; }
        public int PersonalNumber { get; set; }
        public string? Name { get; set; }
        public string? Role { get; set; }
        public string? Shift { get; set; }
        public string Job { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
    }
}
