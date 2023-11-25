using BCrypt.Net;

public class PasswordService
{
    // Hash a password
    public static string HashPassword(string password)
    {
        // The SaltRevision.Recommended parameter automatically generates a secure salt
        return BCrypt.Net.BCrypt.HashPassword(password, 10);
    }

    // Verify a password
    public static bool VerifyPassword(string enteredPassword, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(enteredPassword, hashedPassword);
    }
}