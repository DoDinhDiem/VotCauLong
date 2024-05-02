using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BackEnd.Models
{
    public partial class votcaulongContext : DbContext
    {
        public votcaulongContext()
        {
        }

        public votcaulongContext(DbContextOptions<votcaulongContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Anhsanpham> Anhsanphams { get; set; } = null!;
        public virtual DbSet<Chitiethoadonban> Chitiethoadonbans { get; set; } = null!;
        public virtual DbSet<Chitiethoadonnhap> Chitiethoadonnhaps { get; set; } = null!;
        public virtual DbSet<Hoadonban> Hoadonbans { get; set; } = null!;
        public virtual DbSet<Hoadonnhap> Hoadonnhaps { get; set; } = null!;
        public virtual DbSet<Khachhang> Khachhangs { get; set; } = null!;
        public virtual DbSet<Lienhe> Lienhes { get; set; } = null!;
        public virtual DbSet<Loaisp> Loaisps { get; set; } = null!;
        public virtual DbSet<Nhacungcap> Nhacungcaps { get; set; } = null!;
        public virtual DbSet<Nhanvien> Nhanviens { get; set; } = null!;
        public virtual DbSet<Quyen> Quyens { get; set; } = null!;
        public virtual DbSet<Sanpham> Sanphams { get; set; } = null!;
        public virtual DbSet<Slide> Slides { get; set; } = null!;
        public virtual DbSet<Thuonghieu> Thuonghieus { get; set; } = null!;
        public virtual DbSet<Tintuc> Tintucs { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;database=votcaulong;user=root;password=admin@123", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.36-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_unicode_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Anhsanpham>(entity =>
            {
                entity.ToTable("anhsanpham");

                entity.HasIndex(e => e.SanPhamId, "sanPham_id");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Image)
                    .HasColumnType("text")
                    .HasColumnName("image");

                entity.Property(e => e.SanPhamId).HasColumnName("sanPham_id");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.SanPham)
                    .WithMany(p => p.Anhsanphams)
                    .HasForeignKey(d => d.SanPhamId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("anhsanpham_ibfk_1");
            });

            modelBuilder.Entity<Chitiethoadonban>(entity =>
            {
                entity.ToTable("chitiethoadonban");

                entity.HasIndex(e => e.HoaDonId, "hoaDon_id");

                entity.HasIndex(e => e.SanPhamId, "sanPham_id");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.GiaBan)
                    .HasColumnName("giaBan")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.HoaDonId).HasColumnName("hoaDon_id");

                entity.Property(e => e.SanPhamId).HasColumnName("sanPham_id");

                entity.Property(e => e.SoLuong)
                    .HasColumnName("soLuong")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.ThanhTien)
                    .HasColumnName("thanhTien")
                    .HasDefaultValueSql("'0'");

                entity.HasOne(d => d.HoaDon)
                    .WithMany(p => p.Chitiethoadonbans)
                    .HasForeignKey(d => d.HoaDonId)
                    .HasConstraintName("chitiethoadonban_ibfk_1");

                entity.HasOne(d => d.SanPham)
                    .WithMany(p => p.Chitiethoadonbans)
                    .HasForeignKey(d => d.SanPhamId)
                    .HasConstraintName("chitiethoadonban_ibfk_2");
            });

            modelBuilder.Entity<Chitiethoadonnhap>(entity =>
            {
                entity.ToTable("chitiethoadonnhap");

                entity.HasIndex(e => e.HoaDonId, "hoaDon_id");

                entity.HasIndex(e => e.SanPhamId, "sanPham_id");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.GiaNhap)
                    .HasColumnName("giaNhap")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.HoaDonId).HasColumnName("hoaDon_id");

                entity.Property(e => e.SanPhamId).HasColumnName("sanPham_id");

                entity.Property(e => e.SoLuong)
                    .HasColumnName("soLuong")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.ThanhTien)
                    .HasColumnName("thanhTien")
                    .HasDefaultValueSql("'0'");

                entity.HasOne(d => d.HoaDon)
                    .WithMany(p => p.Chitiethoadonnhaps)
                    .HasForeignKey(d => d.HoaDonId)
                    .HasConstraintName("chitiethoadonnhap_ibfk_1");

                entity.HasOne(d => d.SanPham)
                    .WithMany(p => p.Chitiethoadonnhaps)
                    .HasForeignKey(d => d.SanPhamId)
                    .HasConstraintName("chitiethoadonnhap_ibfk_2");
            });

            modelBuilder.Entity<Hoadonban>(entity =>
            {
                entity.ToTable("hoadonban");

                entity.HasIndex(e => e.KhachHangId, "khachHang_id");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.DiaChi)
                    .HasColumnType("text")
                    .HasColumnName("diaChi");

                entity.Property(e => e.GhiChu)
                    .HasColumnType("text")
                    .HasColumnName("ghiChu");

                entity.Property(e => e.HoTen)
                    .HasMaxLength(255)
                    .HasColumnName("hoTen");

                entity.Property(e => e.KhachHangId).HasColumnName("khachHang_id");

                entity.Property(e => e.PhuongThucThanhToan)
                    .HasMaxLength(255)
                    .HasColumnName("phuongThucThanhToan");

                entity.Property(e => e.SoDienThoai)
                    .HasMaxLength(10)
                    .HasColumnName("soDienThoai");

                entity.Property(e => e.TongTien)
                    .HasColumnName("tongTien")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.TrangThaiDonHang)
                    .HasMaxLength(255)
                    .HasColumnName("trangThaiDonHang");

                entity.Property(e => e.TrangThaiThanhToan).HasColumnName("trangThaiThanhToan");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.KhachHang)
                    .WithMany(p => p.Hoadonbans)
                    .HasForeignKey(d => d.KhachHangId)
                    .HasConstraintName("hoadonban_ibfk_1");
            });

            modelBuilder.Entity<Hoadonnhap>(entity =>
            {
                entity.ToTable("hoadonnhap");

                entity.HasIndex(e => e.NhaCungCapId, "nhaCungCap_id");

                entity.HasIndex(e => e.NhanVienId, "nhanVien_id");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.NhaCungCapId).HasColumnName("nhaCungCap_id");

                entity.Property(e => e.NhanVienId).HasColumnName("nhanVien_id");

                entity.Property(e => e.TongTien)
                    .HasColumnName("tongTien")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.TrangThaiThanhToan).HasColumnName("trangThaiThanhToan");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.NhaCungCap)
                    .WithMany(p => p.Hoadonnhaps)
                    .HasForeignKey(d => d.NhaCungCapId)
                    .HasConstraintName("hoadonnhap_ibfk_2");

                entity.HasOne(d => d.NhanVien)
                    .WithMany(p => p.Hoadonnhaps)
                    .HasForeignKey(d => d.NhanVienId)
                    .HasConstraintName("hoadonnhap_ibfk_1");
            });

            modelBuilder.Entity<Khachhang>(entity =>
            {
                entity.ToTable("khachhang");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreaedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("creaed_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.DiaChi)
                    .HasColumnType("text")
                    .HasColumnName("diaChi");

                entity.Property(e => e.Email)
                    .HasMaxLength(150)
                    .HasColumnName("email");

                entity.Property(e => e.HoTen)
                    .HasMaxLength(130)
                    .HasColumnName("hoTen");

                entity.Property(e => e.PassWord)
                    .HasMaxLength(255)
                    .HasColumnName("passWord");

                entity.Property(e => e.RefreshToken)
                    .HasMaxLength(255)
                    .HasColumnName("refreshToken");

                entity.Property(e => e.RefreshTokenExpiryTime)
                    .HasColumnType("datetime")
                    .HasColumnName("refreshTokenExpiryTime");

                entity.Property(e => e.SoDienThoai)
                    .HasMaxLength(10)
                    .HasColumnName("soDienThoai");

                entity.Property(e => e.Token)
                    .HasColumnType("text")
                    .HasColumnName("token");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("updated_at");

                entity.Property(e => e.UserName)
                    .HasMaxLength(255)
                    .HasColumnName("userName");
            });

            modelBuilder.Entity<Lienhe>(entity =>
            {
                entity.ToTable("lienhe");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.BanDo)
                    .HasColumnType("text")
                    .HasColumnName("banDo");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.DiaChi)
                    .HasColumnType("text")
                    .HasColumnName("diaChi");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.SoDienThoai)
                    .HasMaxLength(10)
                    .HasColumnName("soDienThoai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<Loaisp>(entity =>
            {
                entity.ToTable("loaisp");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.MaCha)
                    .HasMaxLength(255)
                    .HasColumnName("maCha");

                entity.Property(e => e.TenLoai)
                    .HasMaxLength(255)
                    .HasColumnName("tenLoai");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<Nhacungcap>(entity =>
            {
                entity.ToTable("nhacungcap");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.DiaChi)
                    .HasColumnType("text")
                    .HasColumnName("diaChi");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.SoDienThoai)
                    .HasMaxLength(10)
                    .HasColumnName("soDienThoai");

                entity.Property(e => e.TenNhaCungCap)
                    .HasMaxLength(255)
                    .HasColumnName("tenNhaCungCap");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<Nhanvien>(entity =>
            {
                entity.ToTable("nhanvien");

                entity.HasIndex(e => e.RoleId, "role_id");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Avatar)
                    .HasMaxLength(255)
                    .HasColumnName("avatar");

                entity.Property(e => e.CreaedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("creaed_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.DiaChi)
                    .HasColumnType("text")
                    .HasColumnName("diaChi");

                entity.Property(e => e.Email)
                    .HasMaxLength(150)
                    .HasColumnName("email");

                entity.Property(e => e.Gioitinh)
                    .HasMaxLength(5)
                    .HasColumnName("gioitinh");

                entity.Property(e => e.HoTen)
                    .HasMaxLength(130)
                    .HasColumnName("hoTen");

                entity.Property(e => e.NgaySinh)
                    .HasColumnType("datetime")
                    .HasColumnName("ngaySinh");

                entity.Property(e => e.PassWord)
                    .HasMaxLength(255)
                    .HasColumnName("passWord");

                entity.Property(e => e.RefreshToken)
                    .HasMaxLength(255)
                    .HasColumnName("refreshToken");

                entity.Property(e => e.RefreshTokenExpiryTime)
                    .HasColumnType("datetime")
                    .HasColumnName("refreshTokenExpiryTime");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.SoDienThoai)
                    .HasMaxLength(10)
                    .HasColumnName("soDienThoai");

                entity.Property(e => e.Token)
                    .HasColumnType("text")
                    .HasColumnName("token");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("updated_at");

                entity.Property(e => e.UserName)
                    .HasMaxLength(255)
                    .HasColumnName("userName");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Nhanviens)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("nhanvien_ibfk_1");
            });

            modelBuilder.Entity<Quyen>(entity =>
            {
                entity.ToTable("quyen");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.TenRole)
                    .HasMaxLength(255)
                    .HasColumnName("tenRole");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<Sanpham>(entity =>
            {
                entity.ToTable("sanpham");

                entity.HasIndex(e => e.LoaiId, "loai_id");

                entity.HasIndex(e => e.ThuonghieuId, "thuonghieu_id");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.GiaNiemYet)
                    .HasColumnName("giaNiemYet")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.LoaiId).HasColumnName("loai_id");

                entity.Property(e => e.MoTa)
                    .HasColumnType("text")
                    .HasColumnName("moTa");

                entity.Property(e => e.PhanTramGiam)
                    .HasColumnName("phanTramGiam")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.SoLuong)
                    .HasColumnName("soLuong")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.TenSanPham)
                    .HasMaxLength(255)
                    .HasColumnName("tenSanPham");

                entity.Property(e => e.ThuonghieuId).HasColumnName("thuonghieu_id");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.Loai)
                    .WithMany(p => p.Sanphams)
                    .HasForeignKey(d => d.LoaiId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("sanpham_ibfk_1");

                entity.HasOne(d => d.Thuonghieu)
                    .WithMany(p => p.Sanphams)
                    .HasForeignKey(d => d.ThuonghieuId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("sanpham_ibfk_2");
            });

            modelBuilder.Entity<Slide>(entity =>
            {
                entity.ToTable("slide");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Image)
                    .HasMaxLength(255)
                    .HasColumnName("image");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<Thuonghieu>(entity =>
            {
                entity.ToTable("thuonghieu");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.TenThuongHieu)
                    .HasMaxLength(255)
                    .HasColumnName("tenThuongHieu");

                entity.Property(e => e.TrangThai)
                    .HasColumnName("trangThai")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<Tintuc>(entity =>
            {
                entity.ToTable("tintuc");

                entity.HasIndex(e => e.NhanvienId, "nhanvien_id");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Image)
                    .HasMaxLength(255)
                    .HasColumnName("image");

                entity.Property(e => e.NhanvienId).HasColumnName("nhanvien_id");

                entity.Property(e => e.NoiDung)
                    .HasColumnType("text")
                    .HasColumnName("noiDung");

                entity.Property(e => e.TieuDe)
                    .HasMaxLength(255)
                    .HasColumnName("tieuDe");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.Nhanvien)
                    .WithMany(p => p.Tintucs)
                    .HasForeignKey(d => d.NhanvienId)
                    .HasConstraintName("tintuc_ibfk_1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
