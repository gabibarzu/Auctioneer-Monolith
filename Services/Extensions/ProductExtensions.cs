using System;
using System.Collections.Generic;
using System.Linq;

using Monolith.Entities.Auction;

namespace Monolith.Services.Extensions
{
    public static class ProductExtensions
    {
        public static List<Product> OnlyAvailable(this IQueryable<Product> products)
        {
            return products.Where(product => product.Status == ProductStatus.Open &&
                                             //product.StarTime <= DateTime.Now &&
                                             product.EndTime >= DateTime.Now)
                .ToList();
        }

        public static bool IsAvailable(this Product product)
        {
            return product.Status == ProductStatus.Open &&
                   //product.StarTime <= DateTime.Now &&
                   product.EndTime >= DateTime.Now;
        }
    }
}