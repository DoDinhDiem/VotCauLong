using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LoaispController : ControllerBase
    {
        private votcaulongContext _context;
        public LoaispController(votcaulongContext context)
        {
            _context = context;
        }

        [Route("GetAll_Loai")]
        [HttpGet]
        public IActionResult GetAllLoaisp()
        {
            try
            {
                var query = _context.Loaisps.ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetAll_Loai_TrangThai")]
        [HttpGet]
        public IActionResult GetAllLoaispTrangThai()
        {
            try
            {
                var query = _context.Loaisps.Where(x => x.TrangThai == true).ToList();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_Loai/{id}")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                var query = _context.Loaisps.Find(id);
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_Loai")]
        [HttpPost]
        public IActionResult Create([FromBody] Loaisp model)
        {
            try
            {
                _context.Loaisps.Add(model);
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Thêm loại sản phẩm thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_Loai")]
        [HttpPut]
        public IActionResult Update([FromBody] Loaisp model)
        {
            try
            {
                var query = _context.Loaisps.Find(model.Id);
                query.TenLoai = model.TenLoai;
                query.TrangThai = model.TrangThai;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Sửa loại sản phẩm thành công"
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
                var query = _context.Loaisps.Find(id);
                query.TrangThai = !query.TrangThai;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Sửa loại sản phẩm thành công"
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_Loai/{id}")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                var query = _context.Loaisps.Find(id);
                _context.Loaisps.Remove(query);
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Xóa loại sản phẩm thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
