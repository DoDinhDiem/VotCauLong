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

    public class TinTucController : ControllerBase
    {
        private votcaulongContext _context;
        public static IWebHostEnvironment _environment;
        public TinTucController(votcaulongContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [Route("GetAll_TinTuc")]
        [HttpGet]
        public IActionResult GetALL()
        {
            try
            {
                var query = _context.Tintucs.Select(x => new
                {
                    id = x.Id,
                    image = x.Image,
                    tieuDe = x.TieuDe,
                    noiDung = x.NoiDung,
                    nguoiViet = x.Nhanvien.HoTen
                }).ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_TinTuc/{id}")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                var query = _context.Tintucs.Find(id);
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_TinTuc")]
        [HttpPost]
        public IActionResult Create([FromBody] Tintuc model)
        {
            try
            {
                _context.Tintucs.Add(model);
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Thêm tin tức thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_TinTuc")]
        [HttpPut]
        public IActionResult Update([FromBody] Tintuc model)
        {
            try
            {
                var query = _context.Tintucs.Find(model.Id);
                query.Image = model.Image;
                query.TieuDe = model.TieuDe;
                query.NoiDung = model.NoiDung;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Sửa tin tức thành công"
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_TinTuc/{id}")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                var query = _context.Tintucs.Find(id);
                _context.Tintucs.Remove(query);
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Xóa tin tức thành công"
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
                string uploadsFolder = Path.Combine(_environment.WebRootPath, "Uploads", "TinTuc");
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
