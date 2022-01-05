using System;
using System.Collections.Generic;
using System.Linq;

using System.Security.Claims;

using Microsoft.AspNetCore.Http;

using Monolith.Database;
using Monolith.Entities.Auction;
using Monolith.Services.Constants;
using Monolith.Services.Extensions;
using Monolith.Services.Interfaces;

namespace Monolith.Services
{
    public class ProductService : IProductService
    {
        private readonly DatabaseContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ProductService(DatabaseContext context, IHttpContextAccessor httpContextAccessor)
        {
            this._context = context;
            this._httpContextAccessor = httpContextAccessor;
        }

        public List<Product> GetProducts()
        {
            //TODO increase number
            return this._context.Products
                .OnlyAvailable()
                .Take(30)
                .ToList();
        }

        public Product GetProductById(Guid id)
        {
            return this._context.Products.FirstOrDefault(product => product.Id == id);
        }

        public List<Product> GetProductsBySearchCriteria(SearchCriteria request)
        {
            var result = new List<Product>();

            if (request.CategoryId != Guid.Empty && request.SearchText != string.Empty)
            {
                result = this._context.Products
                    .Where(product => product.CategoryId == request.CategoryId && product.Name.Contains(request.SearchText))
                    .OnlyAvailable();
            }
            else
            {
                if (request.CategoryId != Guid.Empty)
                {
                    result = this._context.Products
                        .Where(product => product.CategoryId == request.CategoryId)
                        .OnlyAvailable();

                }
                if (request.SearchText != string.Empty)
                {
                    result = this._context.Products
                        .Where(product => product.Name.Contains(request.SearchText))
                        .OnlyAvailable();

                }
            }

            return result.Take(30).ToList();
        }

        public List<Product> GetAllBidProducts()
        {
            if (_httpContextAccessor.HttpContext == null)
            {
                return new List<Product>();
            }

            var loggedInUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(User.Id);
            var productIds = this._context.Bids.Where(bid => bid.UserId == loggedInUserId).Select(bid => bid.ProductId).Distinct();

            return this._context.Products.Where(product => productIds.Contains(product.Id)).ToList();
        }
    }
}