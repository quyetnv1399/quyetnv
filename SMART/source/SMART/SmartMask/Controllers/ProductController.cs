﻿
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartMask.DAO;
using SmartMask.Models.Product;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace SmartMask.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProductController : ControllerBase
    {
         private readonly ApplicationDbContext _db;
         private readonly IHostingEnvironment _hostingEnvironment;

         public ProductController(ApplicationDbContext db, IHostingEnvironment hostingEnvironment)
         {
             _db = db;
             _hostingEnvironment = hostingEnvironment;
         }

         [HttpGet]

         public async Task<List<PRODUCT>> GetProduct()
         {
             var query = _db.PRODUCTs.AsQueryable();
             var getList = await query.ToListAsync();

             return getList;
         }
         [HttpGet]
         public async Task<PRODUCT?> FindOne([FromQuery] int id)
         {
             var query = _db.PRODUCTs.AsQueryable();

             query = query.Where(x => x.ID == id);

             return await query.FirstOrDefaultAsync();
         }

         [HttpPost]
         public async Task<bool> AddProduct([FromForm] AddProductModel model)
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

             var res = new PRODUCT();
             res.CODE_PRODUCT = model.Code_product;
             res.IMAGE = filePathName;
             res.NAME = model.Name;
             res.PRICE = model.Price;
             res.SALEPRICE = model.Saleprice;
             res.QUANTITY = model.Quantity;
             res.VIEW = model.View;
             res.DESCRIPTION = model.Description;
             res.ISNEW = model.Isnew;
             res.ISHOT = model.Ishot;
             res.ISACTIVE = model.Isactive;
             res.CATEGORY_ID = model.Category_id;
             res.BRAND_ID = model.Brand_id;

             await _db.PRODUCTs.AddAsync(res);
             await _db.SaveChangesAsync();
             return true;
         }
         [HttpPut]
         public async Task<bool> EditProduct([FromQuery] int id, [FromForm] EditProductModel model)
         {

             var query = _db.PRODUCTs.AsQueryable();

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

             res.CODE_PRODUCT = model.Code_product;
             res.NAME = model.Name;
             res.PRICE = model.Price;
             res.SALEPRICE = model.Saleprice;
             res.QUANTITY = model.Quantity;
             res.VIEW = model.View;
             res.DESCRIPTION = model.Description;
             res.ISNEW = model.Isnew;
             res.ISHOT = model.Ishot;
             res.ISACTIVE = model.Isactive;
             res.CATEGORY_ID = model.Category_id;
             res.BRAND_ID = model.Brand_id;

             await _db.SaveChangesAsync();

             return true;
         }
         [HttpDelete]
         public async Task<bool> Remove([FromQuery] int id)
         {
             var query = _db.PRODUCTs.AsQueryable();
             var res = await query.Where(x => x.ID == id).FirstOrDefaultAsync();
             if (res == null)
             {
                 return false;
             }

             _db.PRODUCTs.Remove(res);
             await _db.SaveChangesAsync();

             return true;
         }

    }
}
