using Back_End.Models;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class HoaDonNhapController : ControllerBase
    {
        private votcaulongContext _context;
        public HoaDonNhapController(votcaulongContext context)
        {
            _context = context;
        }

        [Route("GetAll_HoaDonNhap")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var query = _context.Hoadonnhaps.Select(x => new 
                                    {
                                        id = x.Id,
                                        tenNhanVien = x.NhanVien.HoTen,
                                        tenNhaCungCap = x.NhaCungCap.TenNhaCungCap,
                                        tongTien = x.TongTien,
                                        trangThaiThanhToan = x.TrangThaiThanhToan
                                    }).ToList();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_HoaDonNhap/{id}")]
        [HttpGet]
        public IActionResult GetById(int id) 
        {
            try
            {
                var query = _context.Hoadonnhaps.Where(x => x.Id == id).Select(x => new
                {
                    id = x.Id,
                    nhanVienId = x.NhanVienId,
                    nhaCungCapId = x.NhaCungCapId,
                    tenNhanVien = x.NhanVien.HoTen,
                    tenNhaCungCap = x.NhaCungCap.TenNhaCungCap,
                    tongTien = x.TongTien,
                    trangThaiThanhToan = x.TrangThaiThanhToan,
                    chiTietHoaDon = _context.Chitiethoadonnhaps
                       .Where(u => u.HoaDonId == x.Id)
                       .Select(s => new
                       {
                           sanPhamId = _context.Sanphams
                               .Where(sp => sp.Id == s.SanPhamId)
                               .Select(sp => sp.TenSanPham)
                               .FirstOrDefault(),
                           soLuong = s.SoLuong,
                           GiaNhap = s.GiaNhap,
                           thanhTien = s.ThanhTien
                       }).ToList() 
                }).FirstOrDefault();

                return Ok(query);

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_HoaDonNhap")]
        [HttpPost]
        public IActionResult Create([FromBody] Hoadonnhap model)
        {
            try
            {
                // Kiểm tra xem model có null không
                if (model == null)
                {
                    return BadRequest("Dữ liệu không hợp lệ.");
                }

                _context.Hoadonnhaps.Add(model);

                foreach (var invoice in model.Chitiethoadonnhaps)
                {
                    // Kiểm tra xem có cung cấp đủ thông tin không
                    if (invoice == null || invoice.SanPhamId == null || invoice.SoLuong <= 0 || invoice.GiaNhap <= 0)
                    {
                        return BadRequest("Dữ liệu chi tiết hóa đơn không hợp lệ.");
                    }

                    // Kiểm tra xem sản phẩm có tồn tại không
                    var sanPham = _context.Sanphams.Find(invoice.SanPhamId);
                    if (sanPham != null)
                    {
                        sanPham.SoLuong += invoice.SoLuong;
                        _context.Sanphams.Update(sanPham);
                    }
                    else
                    {
                        // Xử lý nếu sản phẩm không tồn tại
                        return BadRequest("Sản phẩm không tồn tại.");
                    }
                }

                int? totalAmount = model.Chitiethoadonnhaps.Sum(ct => ct.ThanhTien);
                model.TongTien = totalAmount;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Thêm hóa đơn thành công"
                });
            }
            catch (Exception ex)
            {
                // Trả về lỗi chi tiết nếu có
                return BadRequest(ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        [Route("Update_HoaDonNhap")]
        [HttpPut]
        public IActionResult Update([FromBody] Hoadonnhap model)
        {
            try
            {
                var query = _context.Hoadonnhaps.Find(model.Id);
                query.NhaCungCapId = model.NhaCungCapId;
                query.TrangThaiThanhToan = model.TrangThaiThanhToan;
                _context.SaveChanges();

                return Ok(new
                {
                    message = "Cập nhập hóa đơn thành công"
                });

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
