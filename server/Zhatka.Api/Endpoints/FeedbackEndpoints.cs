using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Zhatka.Api.Data;
using Zhatka.Api.Dtos;
using Zhatka.Api.Models;

namespace Zhatka.Api.Endpoints;

public static partial class FeedbackEndpoints
{
    [GeneratedRegex(@"^[^\s@]+@[^\s@]+\.[^\s@]+$")]
    private static partial Regex EmailRegex();

    [GeneratedRegex(@"^[+]?[\d\s\-().]{7,}$")]
    private static partial Regex PhoneRegex();

    public static void MapFeedbackEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/feedback", async (FeedbackRequest request, ZhatkaDbContext db) =>
        {
            var errors = new Dictionary<string, string[]>();

            if (request.Rating < 1 || request.Rating > 5)
            {
                errors["rating"] = ["Rating must be between 1 and 5."];
            }

            if (request.Rating is >= 1 and <= 3 && string.IsNullOrWhiteSpace(request.Comment))
            {
                errors["comment"] = ["A comment is required for ratings of 3 stars or below."];
            }

            if (!request.IsAnonymous)
            {
                if (string.IsNullOrWhiteSpace(request.Name))
                {
                    errors["name"] = ["Name is required when not submitting anonymously."];
                }

                if (string.IsNullOrWhiteSpace(request.Contact) ||
                    !(EmailRegex().IsMatch(request.Contact.Trim()) || PhoneRegex().IsMatch(request.Contact.Trim())))
                {
                    errors["contact"] = ["A valid email or phone number is required when not submitting anonymously."];
                }
            }

            if (errors.Count > 0)
            {
                return Results.ValidationProblem(errors);
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

        app.MapGet("/api/admin/feedback", async (
            ZhatkaDbContext db,
            int page = 1,
            int pageSize = 25,
            string sortDir = "desc",
            DateTime? dateFrom = null,
            DateTime? dateTo = null,
            int? ratingMin = null,
            int? ratingMax = null) =>
        {
            page = Math.Max(page, 1);
            pageSize = pageSize switch { 50 => 50, 100 => 100, _ => 25 };

            var query = db.Feedback.AsQueryable();

            if (dateFrom is not null) query = query.Where(f => f.CreatedAtUtc >= dateFrom);
            if (dateTo is not null) query = query.Where(f => f.CreatedAtUtc <= dateTo.Value.Date.AddDays(1).AddTicks(-1));
            if (ratingMin is not null) query = query.Where(f => f.Rating >= ratingMin);
            if (ratingMax is not null) query = query.Where(f => f.Rating <= ratingMax);

            var totalCount = await query.CountAsync();

            query = sortDir == "asc"
                ? query.OrderBy(f => f.CreatedAtUtc)
                : query.OrderByDescending(f => f.CreatedAtUtc);

            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(f => new FeedbackListItem(f.Id, f.Rating, f.Product, f.Comment, f.IsAnonymous, f.Name, f.Contact, f.CreatedAtUtc))
                .ToListAsync();

            return Results.Ok(new FeedbackListResponse(items, totalCount, page, pageSize));
        }).RequireAuthorization();
    }
}
