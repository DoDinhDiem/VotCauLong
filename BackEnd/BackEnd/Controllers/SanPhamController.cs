using Back_End.Models;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class SanPhamController : ControllerBase
    {
        private votcaulongContext _context;
        public static IWebHostEnvironment _environment;

        public SanPhamController(votcaulongContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [Route("GetAll_SanPham")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var query = _context.Sanphams.Select(x => new
                {
                    id = x.Id,
                    tenLoai = x.Loai.TenLoai,
                    tenThuongHieu = x.Thuonghieu.TenThuongHieu,
                    tenSanPham = x.TenSanPham,
                    moTa = x.MoTa,
                    giaNiemYet = x.GiaNiemYet,
                    phanTram = x.PhanTramGiam,
                    soLuong = x.SoLuong,
                    imageMain = x.Anhsanphams.Where(a => a.TrangThai == true).Select(a => a.Image).FirstOrDefault(),
                    trangThai = x.TrangThai
                }).ToList();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_SanPham/{id}")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                var query = _context.Sanphams
                                    .Where(x => x.Id == id)
                                    .Select(x => new 
                                    { 
                                        id = x.Id,
                                        loaiId = x.LoaiId,
                                        thuongHieuId = x.ThuonghieuId,
                                        tenSanPham = x.TenSanPham,
                                        moTa = x.MoTa,
                                        giaNiemYet = x.GiaNiemYet,
                                        phanTramGiam = x.PhanTramGiam,
                                        imageMain = x.Anhsanphams.Where(a => a.SanPhamId == id && a.TrangThai == true).Select(a => a.Image).FirstOrDefault(),
                                        imageList = x.Anhsanphams.Where(a => a.SanPhamId == id && a.TrangThai != true).Select(a => new { image = a.Image }).ToList(),
                                        trangThai = x.TrangThai,

                                    }).FirstOrDefault();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_SanPham")]
        [HttpPost]
        public IActionResult Create([FromBody] Sanpham model)
        {
            try
            {
                model.SoLuong = 0;
                _context.Sanphams.Add(model);
                var images = new List<Anhsanpham>();
                foreach(var imgs in model.Anhsanphams)
                {
                    var img = new Anhsanpham
                    {
                        SanPhamId = model.Id,
                        Image = imgs.Image,
                        TrangThai = imgs.TrangThai
                    };
                    images.Add(img);
                }

                _context.SaveChanges();

                return Ok(new
                {
                    message = "Thêm sản phẩm thành công"
                });
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_SanPham")]
        [HttpPut]
        public IActionResult Update([FromBody] Sanpham model)
        {
            try
            {
                var query = _context.Sanphams.Find(model.Id);

                query.LoaiId = model.LoaiId;
                query.ThuonghieuId = model.ThuonghieuId;
                query.TenSanPham = model.TenSanPham;
                query.MoTa = model.MoTa;
                query.GiaNiemYet = model.GiaNiemYet;
                query.PhanTramGiam = model.PhanTramGiam;
                query.TrangThai = model.TrangThai;

                _context.Anhsanphams.RemoveRange(_context.Anhsanphams.Where(a => a.SanPhamId == model.Id));
                foreach (var imgs in model.Anhsanphams)
                {
                    var img = new Anhsanpham
                    {
                        SanPhamId = model.Id,
                        Image = imgs.Image,
                        TrangThai = imgs.TrangThai
                    };
                    query.Anhsanphams.Add(img);
                }

                _context.SaveChanges();

                return Ok(new
                {
                    message = "Sửa sản phẩm thành công"
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
                var query = _context.Sanphams.Find(id);
                query.TrangThai = !query.TrangThai;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Sửa sản phẩm thành công"
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_SanPham/{id}")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                var query = _context.Sanphams.Find(id);
                _context.Sanphams.Remove(query);
                _context.SaveChanges();

                return Ok(new
                {
                    message = "Xóa sản phẩm thành công"
                });
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Upload_Image")]
        [HttpPost]
        public async Task<IActionResult> Upload(List<IFormFile> files)
        {
            try
            {
                List<string> fileNames = new List<string>();

                foreach (var file in files)
                {
                    if (file == null || file.Length == 0)
                    {
                        continue;
                    }

                    string uploadsFolder = Path.Combine(_environment.WebRootPath, "Uploads", "Products");
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    string filePath = Path.Combine(uploadsFolder, file.FileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }

                    fileNames.Add(file.FileName);
                }

                return Ok(fileNames);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
