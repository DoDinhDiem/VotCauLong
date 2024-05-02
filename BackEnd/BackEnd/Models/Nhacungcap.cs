using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Nhacungcap
    {
        public Nhacungcap()
        {
            Hoadonnhaps = new HashSet<Hoadonnhap>();
        }

        public int Id { get; set; }
        public string? TenNhaCungCap { get; set; }
        public string? SoDienThoai { get; set; }
        public string? DiaChi { get; set; }
        public string? Email { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<Hoadonnhap> Hoadonnhaps { get; set; }
    }
}
