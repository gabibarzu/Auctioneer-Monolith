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
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoryController(ICategoryService service)
        {
            this._service = service;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        [Authorize]
        public List<Category> Get()
        {
            return _service.GetCategories();
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        [Authorize]
        public Category Get(Guid id)
        {
            return this._service.GetCategoryById(id);
        }
    }
}
