namespace SmartMask.Models.ProductSale
{
    public class EditProductSaleModel
    {
        public float Salevalue { get; set; }
        public DateTime? Startdate { get; set; }
        public DateTime? Enddate { get; set; }
        public int Product_id { get; set; }
    }
}
