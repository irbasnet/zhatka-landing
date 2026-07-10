using Microsoft.EntityFrameworkCore;
using Zhatka.Api.Models;

namespace Zhatka.Api.Data;

public class ZhatkaDbContext(DbContextOptions<ZhatkaDbContext> options) : DbContext(options)
{
    public DbSet<Feedback> Feedback => Set<Feedback>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.Property(f => f.Rating).IsRequired();
            entity.ToTable(t => t.HasCheckConstraint("CK_Feedback_Rating", "[Rating] BETWEEN 1 AND 5"));

            entity.Property(f => f.Product).HasMaxLength(200);
            entity.Property(f => f.Comment).HasMaxLength(2000);
            entity.Property(f => f.Name).HasMaxLength(200);
            entity.Property(f => f.Contact).HasMaxLength(200);
            entity.Property(f => f.IsAnonymous).IsRequired();
            entity.Property(f => f.CreatedAtUtc).IsRequired();
        });
    }
}
