using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult>Register(RegistrationDTO user) 
        {
            user.Username = user.Username.ToLower();
            if(await _repo.UserExists(user.Username))
            {
                return BadRequest("User Already Exists");
            }
            User newUser = new User{Username = user.Username};
            
            await _repo.Register(newUser, user.Password);
            return StatusCode(201);
        }
    }
}