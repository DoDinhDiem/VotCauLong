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

    public class HoaDonBanController : ControllerBase
    {
        private votcaulongContext _context;
        public HoaDonBanController(votcaulongContext context)
        {
            _context = context;
        }

        [Route("GetAll_HoaDonBan")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var query = _context.Hoadonbans.Select(x => new
                {
                    id = x.Id,
                    hoTen = x.KhachHang.HoTen,
                    hoTenDat = x.HoTen,
                    soDienThoai = x.SoDienThoai,
                    diaChi = x.DiaChi,
                    ghiChu = x.GhiChu,
                    tongTien = x.TongTien,
                    trangThaiDonHang = x.TrangThaiDonHang,
                    trangThaiThanhToan = x.TrangThaiThanhToan,
                    phuongThucThanhToan = x.PhuongThucThanhToan
                }).ToList();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_HoaDonBan/{id}")]
        [HttpGet]
        public IActionResult GetById(int id) 
        {
            try
            {
                var query = _context.Hoadonbans.Where(x => x.Id ==id)
                                            .Select(x => new
                                            {
                                                id = x.Id,
                                                hoTen = x.KhachHang.HoTen,
                                                soDienThoai = x.SoDienThoai,
                                                diaChi = x.DiaChi,
                                                ghiChu = x.GhiChu,
                                                tongTien = x.TongTien,
                                                trangThaiDonHang = x.TrangThaiDonHang,
                                                trangThaiThanhToan = x.TrangThaiThanhToan,
                                                phuongThucThanhToan = x.PhuongThucThanhToan,
                                                chiTietHoaDon = _context.Chitiethoadonbans.Where(u => u.HoaDonId == id).Select(s => new
                                                {
                                                    sanPhamId = _context.Sanphams.Where(sp => sp.Id == s.SanPhamId).Select(sp => sp.TenSanPham).FirstOrDefault(),
                                                    soLuong = s.SoLuong,
                                                    giaBan = s.GiaBan,
                                                    thanhTien = s.ThanhTien
                                                }).ToList(),
                                            }).FirstOrDefault();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_HoaDonBan")]
        [HttpPut]
        public IActionResult Update([FromBody] Hoadonban model)
        {
            try
            {
                var query = _context.Hoadonbans.Find(model.Id);
                query.TrangThaiDonHang = model.TrangThaiDonHang;
                query.TrangThaiThanhToan = model.TrangThaiThanhToan;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Cập nhập hóa đơn thành công"
                });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
