using BloodWorks.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodWorks.Data
{
    public class BloodWorkContext : DbContext
    {
        public BloodWorkContext(DbContextOptions<BloodWorkContext> options) : base(options)
        {
        }

        public DbSet<BloodWork> BloodWork { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BloodWork>().ToTable("BloodWorks");
        }
    }
}
