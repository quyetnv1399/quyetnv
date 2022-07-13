using System;
using System.Collections.Generic;

namespace SmartMask.DAO
{
    public partial class PRODUCT
    {
        public PRODUCT()
        {
            ATR_DETAILs = new HashSet<ATR_DETAIL>();
            PRODUCT_ABOUTs = new HashSet<PRODUCT_ABOUT>();
            PRODUCT_IMAGEs = new HashSet<PRODUCT_IMAGE>();
            PRODUCT_REVIEWs = new HashSet<PRODUCT_REVIEW>();
            PRODUCT_SALEs = new HashSet<PRODUCT_SALE>();
            PRODUCT_VARIANTs = new HashSet<PRODUCT_VARIANT>();
        }

        public long ID { get; set; }
        public string CODE_PRODUCT { get; set; } = null!;
        public string IMAGE { get; set; } = null!;
        public string NAME { get; set; } = null!;
        public double PRICE { get; set; }
        public double? SALEPRICE { get; set; }
        public int QUANTITY { get; set; }
        public double VIEW { get; set; }
        public string? DESCRIPTION { get; set; }
        public bool ISNEW { get; set; }
        public bool ISHOT { get; set; }
        public bool ISACTIVE { get; set; }
        public long CATEGORY_ID { get; set; }
        public int BRAND_ID { get; set; }

        public virtual BRAND BRAND { get; set; } = null!;
        public virtual CATEGORy CATEGORY { get; set; } = null!;
        public virtual ICollection<ATR_DETAIL> ATR_DETAILs { get; set; }
        public virtual ICollection<PRODUCT_ABOUT> PRODUCT_ABOUTs { get; set; }
        public virtual ICollection<PRODUCT_IMAGE> PRODUCT_IMAGEs { get; set; }
        public virtual ICollection<PRODUCT_REVIEW> PRODUCT_REVIEWs { get; set; }
        public virtual ICollection<PRODUCT_SALE> PRODUCT_SALEs { get; set; }
        public virtual ICollection<PRODUCT_VARIANT> PRODUCT_VARIANTs { get; set; }
    }
}
