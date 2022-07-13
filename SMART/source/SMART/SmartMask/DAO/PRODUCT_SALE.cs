using System;
using System.Collections.Generic;

namespace SmartMask.DAO
{
    public partial class PRODUCT_SALE
    {
        public long ID { get; set; }
        public double SALEVALUE { get; set; }
        public DateTime? STARTDATE { get; set; }
        public DateTime? ENDDATE { get; set; }
        public long PRODUCT_ID { get; set; }

        public virtual PRODUCT PRODUCT { get; set; } = null!;
    }
}
