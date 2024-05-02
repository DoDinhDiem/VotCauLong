using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Loaisp
    {
        public Loaisp()
        {
            Sanphams = new HashSet<Sanpham>();
        }

        public int Id { get; set; }
        public string? MaCha { get; set; }
        public string? TenLoai { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<Sanpham> Sanphams { get; set; }
    }
}
