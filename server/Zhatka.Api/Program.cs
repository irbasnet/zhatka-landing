using Microsoft.EntityFrameworkCore;
using Zhatka.Api.Data;
using Zhatka.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(builder.Configuration.GetSection("Products").Get<string[]>() ?? []);

builder.Services.AddDbContext<ZhatkaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ZhatkaFeedback")));

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(options =>
{
    options.AddPolicy("ClientDev", policy =>
        policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<ZhatkaDbContext>().Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("ClientDev");

app.MapProductEndpoints();
app.MapFeedbackEndpoints();

app.Run();
