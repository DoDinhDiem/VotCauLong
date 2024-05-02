using Back_End.Models;
using Back_End.Models.Dto;
using Back_End.Models.Helpers;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class LoginController : ControllerBase
    {
        private votcaulongContext _context;
        private AppSettings _appSettings;
        public LoginController(votcaulongContext context, IOptions<AppSettings> appSetting)
        {
            _context = context;
            _appSettings = appSetting.Value;
        }

        [Route("Login")]
        [HttpPost]
        public IActionResult Authenticate([FromBody] Nhanvien model)
        {
            try
            {
                if(model == null)
                {
                    return BadRequest();
                }

                var user = _context.Nhanviens
                                       .Include(x => x.Role)
                                       .FirstOrDefault(x => x.UserName == model.UserName);
                if(user == null)
                {
                    return NotFound(new
                    {
                        message = "Email không tồn tại! Vui lòng nhập lại."
                    });
                }
                if(user.PassWord != model.PassWord) 
                {
                    return NotFound(new
                    {
                        message = "Mật khẩu không đúng! Vui lòng nhập lại.."
                    });
                }

                if (user.TrangThai != true)
                {
                    return NotFound(new
                    {
                        message = "Tài khoản đã bị khóa!."
                    });
                }

                user.Token = CreateJwt(user);
                var newAccessToken = user.Token;
                var newRefreshToken = CreateRefreshToken();
                user.RefreshToken = newRefreshToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);
               _context.SaveChanges();

                return Ok(new TokenApiDto()
                {
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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
            var user = await _context.Nhanviens.FirstOrDefaultAsync(u => u.Email == email);
            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                return BadRequest("Yêu cầu không hợp lệ");
            var newAccessToken = CreateJwt(user);
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            _context.SaveChanges();
            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
            });
        }


        private string CreateJwt(Nhanvien model)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.SecretKey);
            string roleTenRole = model.Role?.TenRole ?? string.Empty;

            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, roleTenRole),
                new Claim("id", model.Id.ToString()),
                new Claim(ClaimTypes.Email, model.Email),
                new Claim(ClaimTypes.Name, model.HoTen)
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private string CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = _context.Nhanviens
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
                throw new SecurityTokenException("Mã token không hợp lệ!");
            return principal;

        }
    }
}
