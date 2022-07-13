using System;
using System.Collections.Generic;

namespace SmartMask.DAO
{
    public partial class PRODUCT_IMAGE
    {
        public long ID { get; set; }
        public string URL { get; set; } = null!;
        public long PRODUCT_ID { get; set; }

        public virtual PRODUCT PRODUCT { get; set; } = null!;
    }
}
