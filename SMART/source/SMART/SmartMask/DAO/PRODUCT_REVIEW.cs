using System;
using System.Collections.Generic;

namespace SmartMask.DAO
{
    public partial class PRODUCT_REVIEW
    {
        public long ID { get; set; }
        public string? CONTENT { get; set; }
        public int RATING { get; set; }
        public long PRODUCT_ID { get; set; }

        public virtual PRODUCT PRODUCT { get; set; } = null!;
    }
}
