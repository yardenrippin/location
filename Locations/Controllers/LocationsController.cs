using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Locations.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace Locations.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocationsController : ControllerBase
    {
      
        private readonly ILocationRepository _locationRepository;

        public LocationsController(ILocationRepository locationRepository)
        {
           
            _locationRepository = locationRepository;
        }
        [HttpGet("Create")]
        public async Task<IActionResult> Userlication(string filename, string address, decimal latitude, decimal longitude, string ip)
        {
            
            _locationRepository.CreatFile(filename, address, latitude, longitude, ip);

            return Ok();
        }


    }
    }