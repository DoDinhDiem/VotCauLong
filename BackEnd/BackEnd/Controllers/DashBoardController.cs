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
    public class DashBoardController : ControllerBase
    {
        private votcaulongContext _context;
        public DashBoardController(votcaulongContext context)
        {
            _context = context;
        }

        [Route("CountDonHang")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountDonHang()
        {
            try
            {
                var query = _context.Hoadonbans.Count();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("CountDoanhThu")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountDoanhThu()
        {
            try
            {
                var query = _context.Hoadonbans.Where(x => x.TrangThaiThanhToan == true).Sum(x => x.TongTien);
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("CountSanPham")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountSanPham()
        {
            try
            {
                var query = _context.Sanphams.Count();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("CountKhachHang")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountKhachHang()
        {
            try
            {
                var query = _context.Khachhangs.Count();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("ThongKeTheoThang/{year}")]
        [HttpGet]
        public async Task<IActionResult> GetThongKeTheoThang(int year)
        {
            try
            {
                var query = Enumerable.Range(1, 12)
                    .Select(month => new
                    {
                        Thang = month,
                        TongTien = _context.Hoadonbans
                            .Where(hd => hd.CreatedAt.HasValue &&
                                         hd.CreatedAt.Value.Year == year &&
                                         hd.CreatedAt.Value.Month == month &&
                                         hd.TrangThaiThanhToan == true)
                            .Sum(hd => hd.TongTien)
                    })
                    .ToList();
                var tongTienNam = _context.Hoadonbans.Where(hd => hd.CreatedAt.HasValue &&
                        hd.CreatedAt.Value.Year == year &&
                        hd.TrangThaiThanhToan == true).Sum(hd => hd.TongTien);
                var result = new
                {
                    ThongKeThang = query,
                    TongTienNam = tongTienNam
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
