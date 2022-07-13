using System;
using System.Collections.Generic;

namespace SmartMask.DAO
{
    public partial class CATEGORy
    {
        public CATEGORy()
        {
            PRODUCTs = new HashSet<PRODUCT>();
        }

        public long ID { get; set; }
        public string NAME { get; set; } = null!;
        public string IMAGE { get; set; } = null!;
        public bool ACTIVE { get; set; }
        public int PARENT_ID { get; set; }

        public virtual ICollection<PRODUCT> PRODUCTs { get; set; }
    }
}
