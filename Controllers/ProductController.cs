using System;
using System.Collections.Generic;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Monolith.Entities.Auction;
using Monolith.Services.Interfaces;

namespace Monolith.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            this._service = service;
        }

        // GET: api/<ProductController>
        [HttpGet]
        [Authorize]
        public List<Product> Get()
        {
            return this._service.GetProducts();
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        [Authorize]
        public Product Get(Guid id)
        {
            return this._service.GetProductById(id);
        }

        // POST: api/<ProductController>
        [HttpPost]
        [Authorize]
        public List<Product> Get([FromBody] SearchCriteria request)
        {
            return this._service.GetProductsBySearchCriteria(request);
        }

        [HttpGet]
        [Route("GetAllBidProducts")]
        [Authorize]
        public List<Product> GetAllBidProducts()
        {
            return this._service.GetAllBidProducts();
        }
    }
}
