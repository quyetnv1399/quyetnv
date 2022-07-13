using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartMask.DAO;
using SmartMask.Models.Brand;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace SmartMask.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BrandController : ControllerBase
    {
         private readonly ApplicationDbContext _db;
         private readonly IHostingEnvironment _hostingEnvironment;
         public BrandController(ApplicationDbContext db, IHostingEnvironment hostingEnvironment)
         {
             _db = db;
             _hostingEnvironment = hostingEnvironment;
         }

         [HttpGet]

         public async Task<List<BRAND>> GetBrand()
         {
             var query = _db.BRANDs.AsQueryable();
             var getList = await query.ToListAsync();

             return getList;
         }

         [HttpGet]
         public async Task<BRAND?> FindOne([FromQuery] int id)
         {
             var query = _db.BRANDs.AsQueryable();

             query = query.Where(x => x.ID == id);

             return await query.FirstOrDefaultAsync();
         }

         [HttpDelete]
         public async Task<bool> Remove([FromQuery] int id)
         {
             var query = _db.BRANDs.AsQueryable();
             var res = await query.Where(x => x.ID == id).FirstOrDefaultAsync();
             if (res == null)
             {
                 return false;
             }

             _db.BRANDs.Remove(res);
             await _db.SaveChangesAsync();

             return true;
         }

         [HttpPost]
         public async Task<bool> AddBrand([FromForm] AddBrandModel model)
         {
             var filePathName = "";
             if (model.Image != null)
             {

                 var type = Path.GetExtension(model.Image.FileName);
                 var uniqueFileName = Guid.NewGuid().ToString().Replace("-", "");
                 var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
                 var filePath = Path.Combine(uploads, uniqueFileName + type).Replace("\\", "/");
                 model.Image.CopyTo(new FileStream(filePath, FileMode.Create));

                 var uploadFileName = Path.Combine("uploads");
                 filePathName = Path.Combine(uploadFileName, uniqueFileName + type).Replace("\\", "/");
             }

             var res = new BRAND();
             res.NAME = model.Name;
             res.IMAGE = filePathName;
             res.ACTIVE = model.Active;

             await _db.BRANDs.AddAsync(res);
             await _db.SaveChangesAsync();
             return true;
         }

         [HttpPut]
         public async Task<bool> EditBrand([FromQuery] int id, [FromForm] EditBrandModel model)
         {

             var query = _db.BRANDs.AsQueryable();

             var res = await query.Where(x => x.ID == id).FirstOrDefaultAsync();
             if (res == null) { return false; }

             if (model.Image != null)
             {

                 var type = Path.GetExtension(model.Image.FileName);
                 var uniqueFileName = Guid.NewGuid().ToString().Replace("-", "");
                 var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
                 var filePath = Path.Combine(uploads, uniqueFileName + type).Replace("\\", "/");
                 model.Image.CopyTo(new FileStream(filePath, FileMode.Create));

                 var uploadFileName = Path.Combine("uploads");
                 var filePathName = Path.Combine(uploadFileName, uniqueFileName + type).Replace("\\", "/");

                 res.IMAGE = filePathName;

             }


             res.NAME = model.Name;
             res.ACTIVE = model.Active;

             await _db.SaveChangesAsync();

             return true;
         }
    }
}
