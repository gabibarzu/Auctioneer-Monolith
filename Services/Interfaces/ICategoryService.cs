using System;
using System.Collections.Generic;

using Monolith.Entities.Auction;

namespace Monolith.Services.Interfaces
{
    public interface ICategoryService
    {
        List<Category> GetCategories();

        Category GetCategoryById(Guid categoryId);
    }
}
