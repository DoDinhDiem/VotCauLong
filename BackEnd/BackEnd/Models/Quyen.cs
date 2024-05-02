using System;
using System.Collections.Generic;

namespace BackEnd.Models
{
    public partial class Quyen
    {
        public Quyen()
        {
            Nhanviens = new HashSet<Nhanvien>();
        }

        public int Id { get; set; }
        public string? TenRole { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<Nhanvien> Nhanviens { get; set; }
    }
}
