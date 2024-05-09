using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalAPI;

[Table("users", Schema = "public")]
public class Users
{
    [Key]
    public int UserID { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Password { get; set; }
    public double Balance { get; set; }
    public byte[] UserImage { get; set; }


}
