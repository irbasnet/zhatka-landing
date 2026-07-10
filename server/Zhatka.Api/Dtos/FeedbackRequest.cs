namespace Zhatka.Api.Dtos;

public record FeedbackRequest(
    int Rating,
    string? Product,
    string? Comment,
    bool IsAnonymous,
    string? Name,
    string? Contact);
