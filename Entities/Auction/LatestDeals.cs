using System;

namespace Monolith.Entities.Auction
{
    public class LatestDeals
    {
        public Guid ProductId { get; set; }
        public Guid CategoryId { get; set; }
    }
}