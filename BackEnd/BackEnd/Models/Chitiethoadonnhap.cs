using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Chitiethoadonnhap
    {
        public int Id { get; set; }
        public int? HoaDonId { get; set; }
        public int? SanPhamId { get; set; }
        public int? GiaNhap { get; set; }
        public int? SoLuong { get; set; }
        public int? ThanhTien { get; set; }

        public virtual Hoadonnhap? HoaDon { get; set; }
        public virtual Sanpham? SanPham { get; set; }
    }
}
