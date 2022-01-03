using System;
using System.Collections.Generic;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Monolith.Entities.Auction;
using Monolith.Services.Interfaces;

namespace Monolith.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BidController : ControllerBase
    {
        private readonly IBidService _service;

        public BidController(IBidService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        [Authorize]
        public decimal GetCurrentBidValue(Guid id)
        {
            return this._service.GetCurrentBidValue(id);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Bid([FromBody] Bid bid)
        {
            var response = this._service.Bid(bid);
            return response ? Ok() : Conflict(new { message = "An error occurred while sending the request. Please refresh the page and try again." });
        }

        [HttpPost]
        [Authorize]
        public IActionResult Buy([FromBody] Bid bid)
        {
            var response = this._service.Buy(bid);
            return response ? Ok() : Conflict(new { message = "An error occurred while sending the request. Please refresh the page and try again." });
        }

        [HttpGet("{id}")]
        [Authorize]
        public List<Bid> GetAllBidsForProduct(Guid id)
        {
            return this._service.GetAllBidsForProduct(id);
        }
    }
}
