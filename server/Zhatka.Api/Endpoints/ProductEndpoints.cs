using Microsoft.AspNetCore.Mvc;

namespace Zhatka.Api.Endpoints;

public static class ProductEndpoints
{
    public static void MapProductEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/products", ([FromServices] string[] products) => Results.Ok(products));
    }
}
