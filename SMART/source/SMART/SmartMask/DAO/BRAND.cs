using System;
using System.Collections.Generic;

namespace SmartMask.DAO
{
    public partial class BRAND
    {
        public BRAND()
        {
            PRODUCTs = new HashSet<PRODUCT>();
        }

        public int ID { get; set; }
        public string NAME { get; set; } = null!;
        public string IMAGE { get; set; } = null!;
        public bool ACTIVE { get; set; }

        public virtual ICollection<PRODUCT> PRODUCTs { get; set; }
    }
}
