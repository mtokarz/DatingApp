using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTOs
{
    public class RegistrationDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 8)]
        public string Password { get; set; }
    }
}