using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using SmartMask.DAO;

var builder = WebApplication.CreateBuilder(args);

ConfigurationManager configuration = builder.Configuration;


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(configuration.GetConnectionString("SmartMaskDatabase")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("_myAllowSpecificOrigins",
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:4200/");
                      });
});


var app = builder.Build();
app.UseStaticFiles(new StaticFileOptions()
{
    OnPrepareResponse = context =>
    {
        if (context.File.Name == "index.html")
        {
            context.Context.Response.Headers.Add("Cache-Control", "no-cache, no-store");
            context.Context.Response.Headers.Add("Expires", "-1");
        }
        else
        {
            context.Context.Response.Headers[HeaderNames.CacheControl] = "public,max-age=3600";
        }
    }
});
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.UseCors("_myAllowSpecificOrigins");


app.MapControllers();


app.Run();
