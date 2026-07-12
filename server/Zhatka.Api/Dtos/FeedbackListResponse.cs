namespace Zhatka.Api.Dtos;

public record FeedbackListItem(
    int Id,
    int Rating,
    string? Product,
    string? Comment,
    bool IsAnonymous,
    string? Name,
    string? Contact,
    DateTime CreatedAtUtc);

public record FeedbackListResponse(
    IReadOnlyList<FeedbackListItem> Items,
    int TotalCount,
    int Page,
    int PageSize);
