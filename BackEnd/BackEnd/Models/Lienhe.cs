using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Lienhe
    {
        public int Id { get; set; }
        public string? BanDo { get; set; }
        public string? DiaChi { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
