using System;
using System.Collections.Generic;
using System.Linq;

using Monolith.Database;
using Monolith.Entities.Auction;
using Monolith.Services.Interfaces;

namespace Monolith.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly DatabaseContext _context;

        public CategoryService(DatabaseContext context)
        {
            this._context = context;
        }

        public List<Category> GetCategories()
        {
            var categories = new List<Category>
            {
                new Category()
                {
                    Id = Guid.NewGuid(),
                    Name = "All",
                    Icon = "appstore"
                }
            };
            categories.AddRange(_context.Categories.OrderBy(category => category.Name).ToList());
            categories.Add(new Category()
            {
                Id = Guid.NewGuid(),
                Name = "Last minute deal",
                Icon = "clock-circle"
            });

            return categories;
        }

        public Category GetCategoryById(Guid id)
        {
            return _context.Categories.FirstOrDefault(category => category.Id == id);
        }
    }
}
