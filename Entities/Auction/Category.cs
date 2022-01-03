using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Monolith.Entities.Auction
{
    [Table("Category", Schema = "auction")]
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }

        public List<Product> Products { get; set; } = new List<Product>();
    }
}