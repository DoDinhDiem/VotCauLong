using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Khachhang
    {
        public Khachhang()
        {
            Hoadonbans = new HashSet<Hoadonban>();
        }

        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? PassWord { get; set; }
        public string? Email { get; set; }
        public string? HoTen { get; set; }
        public string? DiaChi { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public DateTime? CreaedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<Hoadonban> Hoadonbans { get; set; }
    }
}
