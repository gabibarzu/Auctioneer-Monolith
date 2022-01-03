using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using Monolith.Entities.Authentication;
using Monolith.Entities.Helpers;

namespace Monolith.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationSettings _applicationSettings;
        private readonly SignInManager<User> _signInManager;

        public AuthenticationController(UserManager<User> userManager, IOptions<ApplicationSettings> appSettings, SignInManager<User> signInManager)
        {
            this._userManager = userManager;
            this._applicationSettings = appSettings.Value;
            this._signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            var user = new User()
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(new { message = string.Join(" ", result.Errors.ToList().Select(error => error.Description)) });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            if (model.UserName == null)
            {
                return BadRequest(new { message = "Username cannot be null." });
            }

            if (model.Password == null)
            {
                return BadRequest(new { message = "Password cannot be null." });
            }

            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return BadRequest(new { message = "That user does not exist." });
            }

            if (await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor()
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim("id", user.Id),
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_applicationSettings.JwtSecret)), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new
                {
                    user.Id,
                    Username = user.UserName,
                    Token = token
                });
            }
            else
            {
                return BadRequest(new { message = "Password is incorrect." });
            }
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await this._signInManager.SignOutAsync();

            return Ok();
        }
    }
}
