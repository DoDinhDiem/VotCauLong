using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Tintuc
    {
        public int Id { get; set; }
        public int? NhanvienId { get; set; }
        public string? TieuDe { get; set; }
        public string? NoiDung { get; set; }
        public string? Image { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual Nhanvien? Nhanvien { get; set; }
    }
}
