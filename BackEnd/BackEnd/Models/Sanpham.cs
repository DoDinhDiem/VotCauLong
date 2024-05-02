using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Sanpham
    {
        public Sanpham()
        {
            Anhsanphams = new HashSet<Anhsanpham>();
            Chitiethoadonbans = new HashSet<Chitiethoadonban>();
            Chitiethoadonnhaps = new HashSet<Chitiethoadonnhap>();
        }

        public int Id { get; set; }
        public int? LoaiId { get; set; }
        public int? ThuonghieuId { get; set; }
        public string? TenSanPham { get; set; }
        public string? MoTa { get; set; }
        public int GiaNiemYet { get; set; }
        public int PhanTramGiam { get; set; }
        public int? SoLuong { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual Loaisp? Loai { get; set; }
        public virtual Thuonghieu? Thuonghieu { get; set; }
        public virtual ICollection<Anhsanpham> Anhsanphams { get; set; }
        public virtual ICollection<Chitiethoadonban> Chitiethoadonbans { get; set; }
        public virtual ICollection<Chitiethoadonnhap> Chitiethoadonnhaps { get; set; }
    }
}
