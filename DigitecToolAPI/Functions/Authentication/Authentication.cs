using DigitecToolAPI.Packages;

namespace DigitecToolAPI
{
    public class Authentication
    {
        public static async Task<(bool Approved, LoginCredentials? LoginCreds, string? ExMessage)> ApproveLoginRequestAsync(string loginEmail, string loginPassword)
        {
            var (Success, loginCredentials, ExMessage) = await GetLoginCredentials.GetLoginCredentialsByEmailAsync(loginEmail);

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
                        return (false, null, "E401");
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