using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Monolith.Entities.Auction
{
    [Table("Product", Schema = "auction")]
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [Column(TypeName = "varchar(max)")]
        public string Image { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal StartPrice { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal InstantPrice { get; set; }
        public DateTime StarTime { get; set; }
        public DateTime EndTime { get; set; }
        public ProductStatus Status { get; set; }

        public Guid CategoryId { get; set; }
        public Category Category { get; set; }

        public List<Bid> Bids { get; set; } = new List<Bid>();
    }
}