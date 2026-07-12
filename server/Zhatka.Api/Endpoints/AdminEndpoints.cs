using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Zhatka.Api.Dtos;

namespace Zhatka.Api.Endpoints;

public static class AdminEndpoints
{
    public static void MapAdminEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/admin/login", async (HttpContext http, AdminLoginRequest request, IConfiguration config) =>
        {
            var expected = config["Admin:Password"] ?? string.Empty;
            if (!FixedTimeEquals(request.Password, expected))
            {
                return Results.Unauthorized();
            }

            var claims = new[] { new Claim(ClaimTypes.Name, "admin") };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await http.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

            return Results.Ok();
        });

        app.MapPost("/api/admin/logout", async (HttpContext http) =>
        {
            await http.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Results.Ok();
        });

        app.MapGet("/api/admin/me", () => Results.Ok()).RequireAuthorization();
    }

    private static bool FixedTimeEquals(string a, string b)
    {
        var bytesA = Encoding.UTF8.GetBytes(a);
        var bytesB = Encoding.UTF8.GetBytes(b);
        if (bytesA.Length != bytesB.Length) return false;
        return CryptographicOperations.FixedTimeEquals(bytesA, bytesB);
    }
}
