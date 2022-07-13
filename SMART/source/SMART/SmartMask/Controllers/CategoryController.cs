using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
 using SmartMask.DAO;
 using SmartMask.Models.Category;
 using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace SmartMask.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CategoryController : ControllerBase
    {
         private readonly ApplicationDbContext _db;
         private readonly IHostingEnvironment _hostingEnvironment;

         public CategoryController(ApplicationDbContext db, IHostingEnvironment hostingEnvironment)
         {
             _db = db;
             _hostingEnvironment = hostingEnvironment;
         }

         [HttpGet]

         public async Task<List<CATEGORy>> GetCategory()
         {
             var query = _db.CATEGORIEs.AsQueryable();
             var getList = await query.ToListAsync();

             return getList;
         }

         [HttpGet]
         public async Task<CATEGORy?> FindOne([FromQuery] int id)
         {
             var query = _db.CATEGORIEs.AsQueryable();

             query = query.Where(x => x.ID == id);

             return await query.FirstOrDefaultAsync();
         }
         [HttpGet]
         public async Task<List<CATEGORy>> GetListCateParent([FromQuery] int id)
         {
             var query = _db.CATEGORIEs.AsQueryable();

             query = query.Where(x => x.PARENT_ID == id);

             return await query.ToListAsync();
         }

         [HttpGet]
         public async Task<List<CATEGORy>> GetParent()
         {
             var query = _db.CATEGORIEs.AsQueryable();

             query = query.Where(x => x.PARENT_ID == 0);

             return await query.ToListAsync();
         }

         [HttpDelete]
         public async Task<bool> Remove([FromQuery] int id)
         {
             var query = _db.CATEGORIEs.AsQueryable();
             var res = await query.Where(x => x.ID == id).FirstOrDefaultAsync();
             if (res == null)
             {
                 return false;
             }

             _db.CATEGORIEs.Remove(res);
             await _db.SaveChangesAsync();

             return true;
         }

         [HttpPost]
         public async Task<bool> AddCategory([FromForm] AddCategoryModel model)
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

             var res = new CATEGORy();
             res.NAME = model.Name;
             res.IMAGE = filePathName;
             res.ACTIVE = model.Active;
             res.PARENT_ID = model.ParentId;
         

             await _db.CATEGORIEs.AddAsync(res);
             await _db.SaveChangesAsync();
             return true;
         }

         [HttpPut]
         public async Task<bool> EditCategory([FromQuery] int id, [FromForm] EditCategoryModel model)
         {

             var query = _db.CATEGORIEs.AsQueryable();

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
             res.PARENT_ID = model.ParentId;


             await _db.SaveChangesAsync();

             return true;
         }
    }
}
