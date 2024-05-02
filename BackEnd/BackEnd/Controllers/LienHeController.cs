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

    public class LienHeController : ControllerBase
    {
        private votcaulongContext _context;
        public LienHeController(votcaulongContext context)
        {
            _context = context;
        }

        [Route("GetAll_LienHe")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var query = _context.Lienhes.ToList();

                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_LienHe/{id}")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                var query = _context.Lienhes.Find(id);

                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_LienHe")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Lienhe model)
        {
            try
            {
                _context.Lienhes.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Thêm liên hệ thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_LienHe")]
        [HttpPut]
        public IActionResult Update([FromBody] Lienhe model)
        {
            var query = _context.Lienhes.Find(model.Id);

            query.BanDo = model.BanDo;
            query.DiaChi = model.DiaChi;
            query.Email = model.Email;
            query.SoDienThoai = model.SoDienThoai;

            _context.SaveChanges();

            return Ok(new
            {
                message = "Cập nhập liên hệ thành công"
            });
        }

        [Route("Delete_LienHe/{id}")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                var query = _context.Lienhes.Find(id);

                _context.Lienhes.Remove(query);
                _context.SaveChanges();
                return Ok(new 
                { 
                    message = "Xóa liên hệ thành công!" 
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
