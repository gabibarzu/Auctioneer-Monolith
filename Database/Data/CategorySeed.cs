using System;
using System.Collections.Generic;
using Monolith.Entities.Auction;

namespace Monolith.Database.Data
{
    public static class CategorySeed
    {
        public static List<Category> InitialCategories = new List<Category>()
        {
            new Category()
            {
                Id = Guid.NewGuid(),
                Name = "Cars",
                Icon = "car"
            },
            new Category()
            {
                Id = Guid.NewGuid(),
                Name = "Electronics",
                Icon = "camera"
            },
            new Category()
            {
                Id = Guid.NewGuid(),
                Name = "Fashion",
                Icon = "skin"
            },
            new Category()
            {
                Id = Guid.NewGuid(),
                Name = "Health & Beauty",
                Icon = "experiment"
            },
            new Category()
            {
                Id = Guid.NewGuid(),
                Name = "Home & Garden",
                Icon = "home"
            },
            new Category()
            {
                Id = Guid.NewGuid(),
                Name = "Sports",
                Icon = "trophy"
            }
        };
    }
}