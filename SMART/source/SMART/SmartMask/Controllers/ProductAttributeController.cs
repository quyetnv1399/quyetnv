using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


using SmartMask.DAO;

namespace SmartMask.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProductAttributeController : ControllerBase
    {
         private readonly ApplicationDbContext _db;

         public ProductAttributeController(ApplicationDbContext db)
         {
             _db = db;
         }

    }
}
