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

    public class NhanVienController : ControllerBase
    {
        private votcaulongContext _context;
        public static IWebHostEnvironment _environment;
        public NhanVienController(votcaulongContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [Route("GetAll_NhanVien")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var query = _context.Nhanviens.Select(x => new
                                        {
                                            id = x.Id,
                                            tenRole = x.Role.TenRole,
                                            userName = x.UserName,
                                            email = x.Email,
                                            avatar = x.Avatar,
                                            hoTen = x.HoTen,
                                            gioiTinh = x.Gioitinh,
                                            ngaySinh = x.NgaySinh,
                                            soDienThoai = x.SoDienThoai,
                                            diaChi = x.DiaChi,
                                            trangThai = x.TrangThai
                                    }).ToList();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_NhanVien/{id}")]
        [HttpGet]
        public IActionResult GetById(int id) 
        {
            try
            {
                var query = _context.Nhanviens.Find(id);
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_NhanVien")]
        [HttpPost]
        public IActionResult Create([FromBody] Nhanvien model)
        {
            try
            {
                model.Token = null;
                model.RefreshToken = null;
                model.RefreshTokenExpiryTime = null;

                _context.Nhanviens.Add(model);
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Thêm nhân viên thành công"
                });
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_NhanVien")]
        [HttpPut]
        public IActionResult Update([FromBody] Nhanvien model)
        {
            try
            {
                var query = _context.Nhanviens.Find(model.Id);
                query.RoleId = model.RoleId;
                query.Avatar = model.Avatar;
                query.HoTen = model.HoTen;
                query.SoDienThoai = model.SoDienThoai;
                query.DiaChi = model.DiaChi;
                query.Gioitinh = model.Gioitinh;
                query.NgaySinh = model.NgaySinh;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Sửa nhân viên thành công"
                });

            }
            catch(Exception ex)
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
                var query = _context.Nhanviens.Find(id);
                query.TrangThai = !query.TrangThai;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Sửa nhân viên thành công"
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_NhanVien/{id}")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                var query = _context.Nhanviens.Find(id);
                _context.Nhanviens.Remove(query);
                _context.SaveChanges();

                return Ok(new
                {
                    message = "Xóa nhân viên thành công"
                });
            }catch(Exception ex)
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
                string uploadsFolder = Path.Combine(_environment.WebRootPath, "Uploads", "NhanVien");
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
