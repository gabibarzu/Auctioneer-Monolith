using System;
using System.ComponentModel.DataAnnotations.Schema;

using Monolith.Entities.Authentication;

namespace Monolith.Entities.Auction
{
    [Table("Bid", Schema = "auction")]

    public class Bid
    {
        public Guid Id { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Value { get; set; }
        public DateTime Time { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public Guid ProductId { get; set; }
        public Product Product { get; set; }
    }
}