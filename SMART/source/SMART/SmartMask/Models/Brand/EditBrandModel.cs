namespace SmartMask.Models.Brand
{
    public class EditBrandModel
    {
        public string? Name { get; set; }
        public IFormFile? Image { get; set; }
        public bool Active { get; set; }
    }
}
