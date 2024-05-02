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

    public class SlideController : ControllerBase
    {
        private votcaulongContext _context;
        public static IWebHostEnvironment _environment;
        public SlideController(votcaulongContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [Route("GetAll_Slide")]
        [HttpGet]
        public IActionResult GetALL()
        {
            try
            {
                var query = _context.Slides.ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_Slide/{id}")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                var query = _context.Slides.Find(id);
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_Slide")]
        [HttpPost]
        public IActionResult Create([FromBody] Slide model)
        {
            try
            {
                _context.Slides.Add(model);
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Thêm ảnh slide thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_Slide")]
        [HttpPut]
        public IActionResult Update([FromBody] Slide model)
        {
            try
            {
                var query = _context.Slides.Find(model.Id);
                query.Image = model.Image;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Sửa ảnh slide thành công"
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_Slide/{id}")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                var query = _context.Slides.Find(id);
                _context.Slides.Remove(query);
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Xóa ảnh slide thành công"
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
                var query = _context.Slides.Find(id);
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

        [Route("Upload_Image")]
        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {
                string uploadsFolder = Path.Combine(_environment.WebRootPath, "Uploads", "Slide");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                string filePath = Path.Combine(uploadsFolder, file.FileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                return Ok(new { fileName = file.FileName });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
