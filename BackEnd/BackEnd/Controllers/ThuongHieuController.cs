using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ThuongHieuController : ControllerBase
    {
        private votcaulongContext _context;
        public ThuongHieuController(votcaulongContext context)
        {
            _context = context;
        }

        [Route("GetAll_ThuongHieu")]
        [HttpGet]
        public IActionResult GetAllThuonghieu()
        {
            try
            {
                var query = _context.Thuonghieus.ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetAll_ThuongHieu_TrangThai")]
        [HttpGet]
        public IActionResult GetAllThuonghieuTrangThai()
        {
            try
            {
                var query = _context.Thuonghieus.Where(x => x.TrangThai == true).ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_ThuongHieu/{id}")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                var query = _context.Thuonghieus.Find(id);
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_ThuongHieu")]
        [HttpPost]
        public IActionResult Create([FromBody] Thuonghieu model)
        {
            try
            {
                _context.Thuonghieus.Add(model);
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Thêm thương hiệu thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_ThuongHieu")]
        [HttpPut]
        public IActionResult Update([FromBody] Thuonghieu model)
        {
            try
            {
                var query = _context.Thuonghieus.Find(model.Id);
                query.TenThuongHieu = model.TenThuongHieu;
                query.TrangThai = model.TrangThai;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Sửa thương hiệu thành công"
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("TrangThai/{id}")]
        [HttpPut]
        public IActionResult TrangThai(int id)
        {
            try
            {
                var query = _context.Thuonghieus.Find(id);
                query.TrangThai = !query.TrangThai;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Sửa thương hiệu thành công"
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_ThuongHieu/{id}")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                var query = _context.Thuonghieus.Find(id);
                _context.Thuonghieus.Remove(query);
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Xóa thương hiệu thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
