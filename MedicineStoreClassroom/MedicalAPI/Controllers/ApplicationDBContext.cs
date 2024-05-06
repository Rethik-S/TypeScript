using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MedicalAPI.Controllers
{
    public class ApplicationDBContext : DbContext, IDisposable
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            
        }
        public DbSet<Users> users {get; set;}
        public DbSet<Medicines> medicines {get; set;}
        public DbSet<Orders> orders {get; set;}
    }
}