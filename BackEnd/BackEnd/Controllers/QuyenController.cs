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

    public class QuyenController : ControllerBase
    {
        private votcaulongContext _context;
        public QuyenController(votcaulongContext context)
        {
            _context = context;
        }

        [Route("GetAll_Quyen")]
        [HttpGet]
        public IActionResult GetALL()
        {
            try
            {
                var query = _context.Quyens.ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetAll_Quyen_TrangThai")]
        [HttpGet]
        public IActionResult GetALL_TrangThai()
        {
            try
            {
                var query = _context.Quyens.Where(x => x.TrangThai == true).ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_Quyen/{id}")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                var query = _context.Quyens.Find(id);
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_Quyen")]
        [HttpPost]
        public IActionResult Create([FromBody] Quyen model)
        {
            try
            {
                _context.Quyens.Add(model);
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Thêm quyền thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_Quyen")]
        [HttpPut]
        public IActionResult Update([FromBody] Quyen model)
        {
            try
            {
                var query = _context.Quyens.Find(model.Id);
                query.TenRole = model.TenRole;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Sửa quyền thành công"
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
                var query = _context.Quyens.Find(id);
                query.TrangThai = !query.TrangThai;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Sửa trạng thái thành công"
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_Quyen/{id}")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                var query = _context.Quyens.Find(id);
                _context.Quyens.Remove(query);
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Xóa quyền thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
