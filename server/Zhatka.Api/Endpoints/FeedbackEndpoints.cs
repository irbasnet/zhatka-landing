using Microsoft.EntityFrameworkCore;
using Zhatka.Api.Data;
using Zhatka.Api.Dtos;
using Zhatka.Api.Models;

namespace Zhatka.Api.Endpoints;

public static class FeedbackEndpoints
{
    public static void MapFeedbackEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/feedback", async (FeedbackRequest request, ZhatkaDbContext db) =>
        {
            if (request.Rating < 1 || request.Rating > 5)
            {
                return Results.ValidationProblem(new Dictionary<string, string[]>
                {
                    ["rating"] = ["Rating must be between 1 and 5."]
                });
            }

            var feedback = new Feedback
            {
                Rating = request.Rating,
                Product = request.Product,
                Comment = request.Comment,
                IsAnonymous = request.IsAnonymous,
                Name = request.IsAnonymous ? null : request.Name,
                Contact = request.IsAnonymous ? null : request.Contact,
                CreatedAtUtc = DateTime.UtcNow
            };

            db.Feedback.Add(feedback);
            await db.SaveChangesAsync();

            return Results.Created($"/api/feedback/{feedback.Id}",
                new FeedbackResponse(feedback.Id, feedback.CreatedAtUtc));
        });
    }
}
