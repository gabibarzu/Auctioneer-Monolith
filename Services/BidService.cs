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
    public class BidService : IBidService
    {
        private readonly DatabaseContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BidService(DatabaseContext context, IHttpContextAccessor httpContextAccessor)
        {
            this._context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public decimal GetCurrentBidValue(Guid productId)
        {
            var product = this._context.Products.FirstOrDefault(prod => prod.Id == productId);
            if (product == null || !product.IsAvailable())
            {
                return 0;
            }
            var bids = _context.Bids.Where(bid => bid.ProductId == productId);
            if (bids.Any())
            {
                return bids.Max(bid => bid.Value) + 1;
            }
            return product.StartPrice;
        }

        public bool Bid(Bid bid)
        {
            if (!ValidateBid(bid) || _httpContextAccessor.HttpContext == null)
            {
                return false;
            }

            bid.UserId = _httpContextAccessor.HttpContext.User.FindFirstValue(User.Id);
            bid.Time = DateTime.Now;

            this._context.Bids.Add(bid);
            this._context.SaveChanges();
            return true;
        }

        public bool Buy(Bid bid)
        {
            if (!ValidateBid(bid) || _httpContextAccessor.HttpContext == null)
            {
                return false;
            }

            bid.UserId = _httpContextAccessor.HttpContext.User.FindFirstValue(User.Id);
            bid.Time = DateTime.Now;

            this._context.Bids.Add(bid);

            var product = this._context.Products.FirstOrDefault(prod => prod.Id == bid.ProductId);
            if (product != null)
            {
                product.Status = ProductStatus.InstantSold;
            }

            this._context.SaveChanges();
            return true;
        }

        public List<Bid> GetAllBidsForProduct(Guid productId)
        {
            return _context.Bids.Where(bid => bid.ProductId == productId).OrderByDescending(bid => bid.Time).ToList();
        }

        private bool ValidateBid(Bid bid)
        {
            if (_httpContextAccessor.HttpContext == null)
            {
                return false;
            }

            var loggedInUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(User.Id);
            if (loggedInUserId != bid.UserId)
            {
                return false;
            }

            var product = this._context.Products.FirstOrDefault(prod => prod.Id == bid.ProductId);
            if (product == null || !product.IsAvailable())
            {
                return false;
            }

            var bids = _context.Bids.Where(b => b.ProductId == bid.ProductId);
            if (!bids.Any())
            {
                return true;
            }

            var maxBidValue = bids.Max(b => b.Value);
            return bid.Value > maxBidValue;
        }
    }
}
