using System;
using System.Collections.Generic;

namespace SmartMask.DAO
{
    public partial class PRODUCT_VARIANT
    {
        public long ID { get; set; }
        public string NAME { get; set; } = null!;
        public string IMAGE { get; set; } = null!;
        public double PRICE { get; set; }
        public double PRICEMARKET { get; set; }
        public double PRICEAFTERSALE { get; set; }
        public int QUANTITY { get; set; }
        public bool ISACTIVE { get; set; }
        public long PRODUCT_ID { get; set; }

        public virtual PRODUCT PRODUCT { get; set; } = null!;
    }
}
