using System.Collections.Generic;
using System.Linq;

using Monolith.Database;
using Monolith.Entities.Auction;
using Monolith.Services.Extensions;
using Monolith.Services.Interfaces;

namespace Monolith.Services
{
    public class DealsService : IDealsService
    {
        private readonly DatabaseContext _context;

        public DealsService(DatabaseContext context)
        {
            this._context = context;
        }

        public List<Product> LatestDeals(LatestDeals request)
        {
            return this._context.Products.Where(product => product.Id != request.ProductId && product.CategoryId == request.CategoryId)
                .OnlyAvailable()
                .OrderByDescending(product => product.EndTime)
                .Take(4)
                .ToList();
        }
    }
}
