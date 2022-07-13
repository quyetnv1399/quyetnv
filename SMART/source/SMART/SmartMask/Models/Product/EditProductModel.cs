namespace SmartMask.Models.Product
{
    public class EditProductModel
    {
        public string? Code_product { get; set; }
        public IFormFile? Image { get; set; }
        public string? Name { get; set; }
        public float Price { get; set; }
        public float Saleprice { get; set; }
        public int Quantity { get; set; }
        public int View { get; set; }
        public string? Description { get; set; }
        public bool Isnew { get; set; }
        public bool Ishot { get; set; }
        public bool Isactive { get; set; }
        public int Category_id { get; set; }
        public int Brand_id { get; set; }
    }
}
