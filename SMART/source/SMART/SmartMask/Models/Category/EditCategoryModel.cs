namespace SmartMask.Models.Category
{
    public class EditCategoryModel
    {
        public string? Name { get; set; }
        public IFormFile? Image { get; set; }
        public bool Active { get; set; }
        public int ParentId { get; set; }
    }
}
