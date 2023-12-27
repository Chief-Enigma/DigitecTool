namespace DigitecToolAPI
{
    public class AuthenticationResult
    {
        public int StatusCode { get; set; }
        public string? ExMessage { get; set; }
        public object? ReturnCredentials { get; set; }
    }
}