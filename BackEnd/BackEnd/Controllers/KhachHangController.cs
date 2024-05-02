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

    public class KhachHangController : ControllerBase
    {
        private votcaulongContext _context;

        public KhachHangController(votcaulongContext context)
        {
            _context = context;
        }

        [Route("GetAll_KhacHang")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var query = _context.Khachhangs.ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
