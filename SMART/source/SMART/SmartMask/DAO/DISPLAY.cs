using System;
using System.Collections.Generic;

namespace SmartMask.DAO
{
    public partial class DISPLAY
    {
        public int ID { get; set; }
        public string COMPANYNAME { get; set; } = null!;
        public string FAVICON { get; set; } = null!;
        public string HOTLINE { get; set; } = null!;
        public string EMAIL { get; set; } = null!;
        public string COPYRIGHT { get; set; } = null!;
        public string FACEBOOK { get; set; } = null!;
        public string GOOGLE { get; set; } = null!;
        public string INSTAGRAM { get; set; } = null!;
        public string MAP { get; set; } = null!;
    }
}
