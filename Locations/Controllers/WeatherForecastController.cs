using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Locations.Data;
using Locations.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Locations.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
   
        private readonly ILocationRepository _repo;
        public WeatherForecastController(ILocationRepository locationRepository)
        {
            _repo = locationRepository;
        }
   
         [HttpGet("Create")]
        public async Task<IActionResult> Userlication(string filename, string address, decimal latitude, decimal longitude, string ip)
        {

            My_Location my_Location = new My_Location() {LocationName= address,Date=DateTime.Now,Latitude=latitude,Longitude=longitude,IPAddress=ip};


            _repo.Add(my_Location);


            this._repo.CreatFile(filename, address, latitude, longitude, ip);

            if (await _repo.Saveall())
                return Ok();

            return BadRequest();
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetData()
        {
            var data = await _repo.Getall();

            if (data==null|| data.Count()<=0)
            {
                return BadRequest("canot find data ");
            }

            return Ok(data);
        }

        [HttpGet("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            if(id <= 0)
                return BadRequest("location dont exist on data");

            await _repo.Delete(id);
            if (await _repo.Saveall())
                return Ok();

            return BadRequest("faild to delete");
        }

    }
}
