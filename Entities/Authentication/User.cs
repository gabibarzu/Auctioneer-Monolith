using System.Collections.Generic;

using Microsoft.AspNetCore.Identity;

using Monolith.Entities.Auction;

namespace Monolith.Entities.Authentication
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public List<Bid> Bids { get; set; } = new List<Bid>();
    }
}