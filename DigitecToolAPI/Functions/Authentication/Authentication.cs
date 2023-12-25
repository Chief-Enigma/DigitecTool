using DigitecToolAPI.Packages;

namespace DigitecToolAPI
{
    public class Authentication
    {
        public static (bool Approved, LoginCredentials? LoginCreds, string? ExMessage) ApproveLoginRequest(string loginEmail, string loginPassword)
        {
            var (Success, loginCredentials, ExMessage) = GetLoginCredentials.GetLoginCredentialsByEmail(loginEmail);

            try
            {
                if (Success && loginCredentials != null)
                {
                    if (BCrypt.Net.BCrypt.EnhancedVerify(loginPassword, loginCredentials.PasswordHash))
                    {
                        loginCredentials.PasswordHash = string.Empty;
                        return (true, loginCredentials, "");
                    }
                    else
                    {
                        return (false, null, "Sorry, wrong Password");
                    }
                }
                else
                {
                    return (false, null, ExMessage);
                }
            }
            catch (Exception ex)
            {
                return (false, null, ex.Message);
            }
        }
    }
}