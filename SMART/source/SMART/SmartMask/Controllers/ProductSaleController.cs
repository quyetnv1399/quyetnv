using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using SmartMask.DAO;
 using SmartMask.Models.ProductSale;

namespace SmartMask.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProductSaleController : ControllerBase
    {
         private readonly ApplicationDbContext _db;
         public ProductSaleController(ApplicationDbContext db)
         {
             _db = db;
         }

         [HttpGet]
         public async Task<List<PRODUCT_SALE>> GetSale()
         {
             var query = _db.PRODUCT_SALEs.AsQueryable();
             var getList = await query.ToListAsync();

             return getList;
         }
         [HttpGet]
         public async Task<PRODUCT_SALE?> FindOne([FromQuery] int id)
         {
             var query = _db.PRODUCT_SALEs.AsQueryable();

             query = query.Where(x => x.PRODUCT_ID == id);

             return await query.FirstOrDefaultAsync();
         }

         [HttpDelete]
         public async Task<bool> Remove([FromQuery] int id)
         {
             var query = _db.PRODUCT_SALEs.AsQueryable();
             var res = await query.Where(x => x.PRODUCT_ID == id).FirstOrDefaultAsync();
             if (res == null)
             {
                 return false;
             }

             _db.PRODUCT_SALEs.Remove(res);
             await _db.SaveChangesAsync();

             return true;
         }

         [HttpPost]
         public async Task<bool> AddSaleProduct([FromForm] AddProductSaleModel model)
         {

             var res = new PRODUCT_SALE();
             res.SALEVALUE = model.Salevalue;
             res.STARTDATE = model.Startdate;
             res.ENDDATE = model.Enddate;
             res.PRODUCT_ID = model.Product_id;

             await _db.PRODUCT_SALEs.AddAsync(res);
             await _db.SaveChangesAsync();
             return true;
         }
         [HttpPut]
         public async Task<bool> EditSaleProduct([FromQuery] int id, [FromForm] EditProductSaleModel model)
         {

             var query = _db.PRODUCT_SALEs.AsQueryable();

             var res = await query.Where(x => x.PRODUCT_ID == id).FirstOrDefaultAsync();
             if (res == null) { return false; }

             res.SALEVALUE = model.Salevalue;
             res.STARTDATE = model.Startdate;
             res.ENDDATE = model.Enddate;
             res.PRODUCT_ID = model.Product_id;

             await _db.SaveChangesAsync();

             return true;
         }

    }
} 
