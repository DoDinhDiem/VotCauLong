using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Chitiethoadonban
    {
        public int Id { get; set; }
        public int? HoaDonId { get; set; }
        public int? SanPhamId { get; set; }
        public int? GiaBan { get; set; }
        public int? SoLuong { get; set; }
        public int? ThanhTien { get; set; }

        public virtual Hoadonban? HoaDon { get; set; }
        public virtual Sanpham? SanPham { get; set; }
    }
}
