using System.Collections.Generic;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Monolith.Entities.Auction;
using Monolith.Services.Interfaces;

namespace Monolith.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DealsController : ControllerBase
    {
        private readonly IDealsService _service;

        public DealsController(IDealsService service)
        {
            _service = service;
        }

        [HttpPost]
        [Authorize]
        public List<Product> LatestDeals([FromBody] LatestDeals request)
        {
            return this._service.LatestDeals(request);
        }
    }
}
