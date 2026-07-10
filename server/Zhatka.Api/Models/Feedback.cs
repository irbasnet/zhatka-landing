namespace Zhatka.Api.Models;

public class Feedback
{
    public int Id { get; set; }
    public int Rating { get; set; }
    public string? Product { get; set; }
    public string? Comment { get; set; }
    public bool IsAnonymous { get; set; }
    public string? Name { get; set; }
    public string? Contact { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
