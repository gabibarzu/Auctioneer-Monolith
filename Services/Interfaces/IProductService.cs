using System;
using System.Collections.Generic;

using Monolith.Entities.Auction;

namespace Monolith.Services.Interfaces
{
    public interface IProductService
    {
        List<Product> GetProducts();

        Product GetProductById(Guid id);

        List<Product> GetProductsBySearchCriteria(SearchCriteria request);

        List<Product> GetAllBidProducts();
    }
}