using System;

namespace Monolith.Entities.Auction
{
    public class SearchCriteria
    {
        public Guid CategoryId { get; set; }
        public string SearchText { get; set; }
    }
}