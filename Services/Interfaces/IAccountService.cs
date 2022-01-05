using System.Collections.Generic;
using Monolith.Entities.Account;
using Monolith.Entities.Auction;

namespace Monolith.Services.Interfaces
{
    public interface IAccountService
    {
        AccountStat GetAccountStat();
        List<Product> GetProducts();
    }
}