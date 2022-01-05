using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

using Monolith.Database;
using Monolith.Entities.Account;
using Monolith.Entities.Auction;
using Monolith.Services.Constants;
using Monolith.Services.Extensions;
using Monolith.Services.Interfaces;

namespace Monolith.Services
{
    public class AccountService : IAccountService
    {
        private readonly DatabaseContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AccountService(DatabaseContext context, IHttpContextAccessor httpContextAccessor)
        {
            this._context = context;
            this._httpContextAccessor = httpContextAccessor;
        }

        public AccountStat GetAccountStat()
        {
            if (_httpContextAccessor.HttpContext == null)
            {
                return new AccountStat();
            }

            var loggedInUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(User.Id);
            var userBids = this._context.Bids.Where(bid => bid.UserId == loggedInUserId).ToList();

            var accountStat = new AccountStat
            {
                TotalNumberOfBids = userBids.GetTotalNumberOfBids(),
                HighestBid = userBids.GetHighestBid(),
                LowestBid = userBids.GetLowestBid(),
                TotalMoneySpent = userBids.GetTotalMoneySpent()
            };

            return accountStat;
        }

        public List<Product> GetProducts()
        {
            if (_httpContextAccessor.HttpContext == null)
            {
                return new List<Product>();
            }

            var loggedInUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(User.Id);
            var userProductIds = this._context.Bids.Where(bid => bid.UserId == loggedInUserId).Select(bid => bid.ProductId).Distinct().ToList();

            var products = this._context.Products.ToList().Where(product => userProductIds.Contains(product.Id))
                .ToList();

            return products;
        }
    }
}