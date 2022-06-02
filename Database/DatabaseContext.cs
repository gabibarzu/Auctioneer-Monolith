using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using Monolith.Entities.Auction;

namespace Monolith.Database
{
    public class DatabaseContext : IdentityDbContext
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Category>().HasData(Data.CategorySeed.InitialCategories);
            builder.Entity<Product>().HasData(Data.ProductSeed.GenerateProducts());
        }

        public DatabaseContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Bid> Bids { get; set; }
    }
}