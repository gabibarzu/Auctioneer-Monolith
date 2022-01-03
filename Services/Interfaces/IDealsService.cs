using System.Collections.Generic;

using Monolith.Entities.Auction;

namespace Monolith.Services.Interfaces
{
    public interface IDealsService
    {
        public List<Product> LatestDeals(LatestDeals request);
    }
}
