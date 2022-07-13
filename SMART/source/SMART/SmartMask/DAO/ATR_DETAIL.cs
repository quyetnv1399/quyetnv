using System;
using System.Collections.Generic;

namespace SmartMask.DAO
{
    public partial class ATR_DETAIL
    {
        public long ID { get; set; }
        public string NAME { get; set; } = null!;
        public double ATR_VALUE { get; set; }
        public long PRODUCT_ID { get; set; }

        public virtual PRODUCT PRODUCT { get; set; } = null!;
    }
}
