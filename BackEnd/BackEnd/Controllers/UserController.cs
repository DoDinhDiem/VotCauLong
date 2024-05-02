using Back_End.Models;
using Back_End.Models.Dto;
using Back_End.Models.Helpers;
using BackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private votcaulongContext _context;
        private AppSettings _appSettings;


        public UserController(votcaulongContext context, IOptions<AppSettings> appSetting)
        {
            _context = context;
            _appSettings = appSetting.Value;
        }

        //Lấy loại sản phẩm

        [Route("All_Loai")]
        [HttpGet]
        public IActionResult GetAllLoai()
        {
            try
            {
                var query = _context.Loaisps.Where(x => x.TrangThai == true).ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy ảnh slide
        [Route("All_Slide")]
        [HttpGet]
        public IActionResult GetAllSlide()
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

        //Lấy 15 sản phẩm giảm giá
        [Route("GetSanPhamGiamGia")]
        [HttpGet]
        public IActionResult GetSanPhamGiamGia()
        {
            try
            {
                var query = _context.Sanphams
                                    .OrderByDescending(p => p.PhanTramGiam)
                                    .Where(p => p.Loai.TrangThai == true && p.PhanTramGiam > 0)
                                    .Select(x => new
                                    {
                                        id = x.Id,
                                        tenSanPham = x.TenSanPham,
                                        giaBan = x.GiaNiemYet,
                                        phanTram = x.PhanTramGiam,
                                        image = x.Anhsanphams.Where(p => p.TrangThai == true).Select(p => p.Image).FirstOrDefault(),
                                    }).Take(15).ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //Lấy 15 sản phẩm giảm giá
        [Route("GetSanPhamMoi")]
        [HttpGet]
        public IActionResult GetSanPhamMoi()
        {
            try
            {
                var query = _context.Sanphams
                                    .OrderByDescending(p => p.CreatedAt)
                                    .Where(p => p.Loai.TrangThai == true)
                                    .Select(x => new
                                    {
                                        id = x.Id,
                                        tenSanPham = x.TenSanPham,
                                        giaBan = x.GiaNiemYet,
                                        phanTram = x.PhanTramGiam,
                                        image = x.Anhsanphams.Where(p => p.TrangThai == true).Select(p => p.Image).FirstOrDefault(),
                                    }).Take(15).ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy 15 sản phẩm bán chạy
        [Route("GetSanPhamBanChay")]
        [HttpGet]
        public IActionResult GetSanPhamBanChay()
        {
            try
            {
                var query = (from x in _context.Sanphams
                             join ct in _context.Chitiethoadonbans on x.Id equals ct.SanPhamId
                             where x.Loai.TrangThai == true
                             group x by new
                             {
                                 x.Id,
                                 x.TenSanPham,
                                 x.LoaiId,
                                 x.GiaNiemYet,
                                 x.PhanTramGiam                         
                             } into g
                             select new
                             {
                                 id = g.Key.Id,
                                 tenSanPham = g.Key.TenSanPham,
                                 giaBan = g.Key.GiaNiemYet,
                                 phanTram = g.Key.PhanTramGiam,
                                 image = _context.Anhsanphams.Where(p => p.TrangThai == true).Select(p => p.Image).FirstOrDefault(),
                                 total = g.Count()
                             }).Take(15).ToList();

                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy chi tiết sản phẩm
        [Route("GetChiTiet/{id}")]
        [HttpGet]
        public IActionResult GetChiTiet(int id)
        {
            try
            {
                var query = _context.Sanphams
                                   .Where(p => p.Id == id)
                                   .Select(x => new
                                   {
                                       id = x.Id,
                                       loaiId = x.LoaiId,
                                       tenLoai = x.Loai.TenLoai,
                                       tenSanPham = x.TenSanPham,
                                       moTa = x.MoTa,
                                       giaBan = x.GiaNiemYet,
                                       phanTram = x.PhanTramGiam,
                                       imageList = x.Anhsanphams.Select(p => new { image = p.Image }).ToList(),
                                   }).FirstOrDefault();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private int TinhGiaCuoiCung(int giaNiemYet, int phanTramGiam)
        {
            int giaSauGiamGia = giaNiemYet - (giaNiemYet * phanTramGiam / 100);

            return giaSauGiamGia;
        }

        //Lấy sản phẩm theo loại
        [Route("GetSanPhamToLoai")]
        [HttpGet]
        public IActionResult GetSanPhamToLoai([FromQuery] int id, int? thuonghieuid, string? sapXep, int? giaMax)
        {
            try
            {
                var query = _context.Sanphams.Where(p => p.Loai.TrangThai == true && p.LoaiId == id);

                if (thuonghieuid != null)
                {
                    query = query.Where(p => p.ThuonghieuId == thuonghieuid);
                }

                if (!string.IsNullOrEmpty(sapXep))
                {
                    switch (sapXep.ToLower())
                    {
                        case "pricemin":
                            query = query.OrderBy(p => TinhGiaCuoiCung(p.GiaNiemYet, p.PhanTramGiam));
                            break;
                        case "pricemax":
                            query = query.OrderByDescending(p => TinhGiaCuoiCung(p.GiaNiemYet, p.PhanTramGiam));
                            break;
                        case "name":
                            query = query.OrderBy(p => p.TenSanPham);
                            break;
                        case "date":
                            query = query.OrderByDescending(p => p.CreatedAt);
                            break;
                        default:
                            break;
                    }
                }
                if (giaMax != null)
                {
                    query = query.Where(p => p.GiaNiemYet <= giaMax);
                }

                var totalItems = query.Count();
                var loaisp = _context.Loaisps.Where(x => x.Id == id).Select(x => x.TenLoai).FirstOrDefault();
                var sanPham = query.Select(x => new
                {
                    id = x.Id,
                    tenLoai = x.Loai.TenLoai,
                    tenSanPham = x.TenSanPham,
                    giaBan = x.GiaNiemYet,
                    phanTram = x.PhanTramGiam,
                    image = x.Anhsanphams.Where(p => p.TrangThai == true).Select(p => p.Image).FirstOrDefault(),
                }).ToList();

                var response = new
                {
                    TotalItems = totalItems,
                    category = loaisp,
                    Items = sanPham
                };

                return Ok(response);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetHangSanPham/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetAllHangByLoaiId(int id)
        {
            try
            {

                var uniqueBrands = await _context.Sanphams
                    .Where(p => p.Loai.TrangThai == true && p.Thuonghieu.TrangThai == true && p.TrangThai == true && p.LoaiId == id)
                    .Select(x => new { x.ThuonghieuId, x.Thuonghieu.TenThuongHieu })
                    .Distinct()
                    .OrderBy(x => x.ThuonghieuId)
                    .ToListAsync();

                return Ok(uniqueBrands);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy sản phẩm tương tự
        [Route("GetTuongTu/{id}/{loaiid}")]
        [HttpGet]
        public IActionResult GetTuongTu(int id, int loaiid)
        {
            try
            {
                var query = _context.Sanphams
                                   .OrderByDescending(p => p.CreatedAt)
                                   .Where(p => p.Id != id && p.LoaiId == loaiid)
                                   .Select(x => new
                                   {
                                       id = x.Id,
                                       tenSanPham = x.TenSanPham,
                                       giaBan = x.GiaNiemYet,
                                       phanTram = x.PhanTramGiam,
                                       image = x.Anhsanphams.Where(p => p.TrangThai == true).Select(p => p.Image).FirstOrDefault(),
                                   }).Take(10).ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy ra giá lớn nhất
        [Route("GetPriceMax/{id}")]
        [HttpGet]
        public IActionResult GetPriceMax(int id)
        {
            try
            {
                var maxPrice = _context.Sanphams
                    .Where(p =>  p.LoaiId == id)
                    .Max(p => p.GiaNiemYet);

                return Ok(maxPrice);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy tin tức
        [Route("GetTinTuc")]
        [HttpGet]
        public IActionResult GetTinTuc()
        {
            try
            {
                var query = _context.Tintucs
                                    .Select(x => new
                                    {
                                        id = x.Id,
                                        name = x.Nhanvien.HoTen,
                                        tieuDe = x.TieuDe,
                                        noiDung = x.NoiDung,
                                        image = x.Image,
                                        createdAt = x.CreatedAt
                                    }).ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //Lấy ra chi tiết tin tức
        [Route("GetTinTucById/{id}")]
        [HttpGet]
        public IActionResult GetTinTucById(int id)
        {
            try
            {
                var query = _context.Tintucs.Where(p => p.Id == id)
                                    .Select(x => new
                                    {
                                        id = x.Id,
                                        name = x.Nhanvien.HoTen,
                                        tieuDe = x.TieuDe,
                                        noiDung = x.NoiDung,
                                        image = x.Image,
                                        createdAt = x.CreatedAt
                                    }).FirstOrDefault();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //Lấy ra tin tức tương tự
        [Route("GetTinTucTuongTu/{id}")]
        [HttpGet]
        public IActionResult GetTinTucTuongTu(int id)
        {
            try
            {
                var query = _context.Tintucs.OrderByDescending(p => p.CreatedAt)
                                    .Where(p => p.Id != id)
                                    .Select(x => new
                                    {
                                        id = x.Id,
                                        name = x.Nhanvien.HoTen,
                                        tieuDe = x.TieuDe,
                                        noiDung = x.NoiDung,
                                        image = x.Image,
                                        createdAt = x.CreatedAt
                                    }).Take(3).ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy liên hệ
        [Route("GetLienHe")]
        [HttpGet]
        public IActionResult GetLienHe()
        {
            try
            {
                var query = _context.Lienhes.FirstOrDefault();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //Lấy ra sản phẩm tìm kiếm
        [Route("GetSearchSanPham")]
        [HttpGet]
        public IActionResult GetSearchSanPham([FromQuery] string key)
        {
            try
            {
                var query = _context.Sanphams.AsQueryable();

                query = query.Where(l => l.TenSanPham.Contains(key));

                var totalItems = query.Count();
                var sanPham = query.Select(x => new
                {
                    id = x.Id,
                    tenSanPham = x.TenSanPham,
                    giaBan = x.GiaNiemYet,
                    phanTram = x.PhanTramGiam,
                    image = x.Anhsanphams.Where(p => p.TrangThai == true).Select(p => p.Image).FirstOrDefault(),
                }).ToList();

                var response = new
                {
                    TotalItems = totalItems,
                    Items = sanPham
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetKhacHangById/{id}")]
        [HttpGet]
        public IActionResult GetKhacHangById(int id)
        {
            try
            {
                var query = _context.Khachhangs.Find(id);
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //[Route("Update_KhachHang")]
        //[HttpPut]
        //public IActionResult UpdateKhachHang([FromBody] Khachang model)
        //{
        //    try
        //    {
        //        var query = _context.Khachangs.Find(model.Id);

        //        query.HoTen = model.HoTen;
        //        query.DiaChi = model.DiaChi;
        //        query.GioiTinh = model.GioiTinh;
        //        query.NgaySinh = model.NgaySinh;

        //        _context.SaveChanges();

        //        return Ok(new { message = "Cập nhập thông tin khách hàng thành công" });

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        [Route("Create_HoaDonBan")]
        [HttpPost]
        public IActionResult CreateHoaDonBan([FromBody] Hoadonban model)
        {
            try
            {
                _context.Hoadonbans.Add(model);

                var newHoaDon = new List<Chitiethoadonban>();

                foreach (var cthd in model.Chitiethoadonbans)
                {
                    var sanPham = _context.Sanphams.Find(cthd.SanPhamId);

                    if (sanPham.SoLuong < cthd.SoLuong || sanPham.SoLuong < 1)
                    {
                        return BadRequest(new { message = "Số lượng sản phẩm không đủ " });
                    }

                    sanPham.SoLuong -= cthd.SoLuong;

                    var ct = new Chitiethoadonban
                    {
                        HoaDonId = model.Id,
                        SanPhamId = cthd.SanPhamId,
                        SoLuong = cthd.SoLuong,
                        GiaBan = cthd.GiaBan,
                        ThanhTien = cthd.ThanhTien
                    };
                    newHoaDon.Add(ct);

                }
                int? totalAmount = newHoaDon.Sum(ct => ct.ThanhTien);
                model.TongTien = totalAmount;

                _context.SaveChanges();
                return Ok(new
                {

                    id = model.Id,
                    message = "Đặt hàng thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //Tài khoản
        [Route("Signin")]
        [HttpPost]
        public IActionResult Authenticate([FromBody] Khachhang model)
        {
            if (model == null)
                return BadRequest();

            var query = _context.Khachhangs
                .FirstOrDefault(x => x.UserName == model.UserName);

            if (query == null)
                return NotFound(new { Message = "Tài khoản không tồn tại! Vui lòng nhập lại." });

            if (query.PassWord != model.PassWord)
            {
                return BadRequest(new { Message = "Mật khẩu không đúng! Vui lòng nhập lại." });
            }

            query.Token = CreateJwt(query);
            var newAccessToken = query.Token;
            var newRefreshToken = CreateRefreshToken();
            query.RefreshToken = newRefreshToken;
            query.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);
            _context.SaveChanges();

            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            });
        }

        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] Khachhang model)
        {
            if (model == null)
                return BadRequest();

            // check email
            if (await CheckEmailExistAsync(model.Email))
                return BadRequest(new { Message = "Email đã tồn tại!" });
            await _context.AddAsync(model);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                Status = 200,
                message = "Đăng ký thành công!"
            });
        }

        [Route("RefreshToken")]
        [HttpPost]
        public async Task<IActionResult> Refresh([FromBody] TokenApiDto tokenApiDto)
        {
            if (tokenApiDto is null)
                return BadRequest("Yêu cầu của khách hàng không hợp lệ");
            string accessToken = tokenApiDto.AccessToken;
            string refreshToken = tokenApiDto.RefreshToken;
            var principal = GetPrincipleFromExpiredToken(accessToken);
            var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = await _context.Khachhangs.FirstOrDefaultAsync(u => u.Email == email);
            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                return BadRequest("Yêu cầu không hợp lệ");
            var newAccessToken = CreateJwt(user);
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            await _context.SaveChangesAsync();
            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
            });
        }



        private Task<bool> CheckEmailExistAsync(string? email)
            => _context.Khachhangs.AnyAsync(x => x.Email == email);

        private string CreateJwt(Khachhang model)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.SecretKey);
            var identity = new ClaimsIdentity(new Claim[]
            {
                        new Claim(ClaimTypes.Email, model.Email),
                        new Claim(ClaimTypes.Name, model.HoTen),
                        new Claim("id", model.Id.ToString()),
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private string CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = _context.Khachhangs
                .Any(a => a.RefreshToken == refreshToken);
            if (tokenInUser)
            {
                return CreateRefreshToken();
            }
            return refreshToken;
        }

        private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes(_appSettings.SecretKey);
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Đây là mã thông báo không hợp lệ");
            return principal;

        }
    }
}
