using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Nhanvien
    {
        public Nhanvien()
        {
            Hoadonnhaps = new HashSet<Hoadonnhap>();
            Tintucs = new HashSet<Tintuc>();
        }

        public int Id { get; set; }
        public int? RoleId { get; set; }
        public string? UserName { get; set; }
        public string? PassWord { get; set; }
        public string? Email { get; set; }
        public string? Avatar { get; set; }
        public string? HoTen { get; set; }
        public string? Gioitinh { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string? SoDienThoai { get; set; }
        public string? DiaChi { get; set; }
        public bool? TrangThai { get; set; }
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public DateTime? CreaedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual Quyen? Role { get; set; }
        public virtual ICollection<Hoadonnhap> Hoadonnhaps { get; set; }
        public virtual ICollection<Tintuc> Tintucs { get; set; }
    }
}
