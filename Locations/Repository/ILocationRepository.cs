using Locations.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Locations.Repository
{
    public interface ILocationRepository
    {
        void CreatFile(string filename, string address, decimal latitud, decimal longitude, string ip);
        void ReadToClass(string path);
        void Add<T>(T entity) where T : class;
        Task Delete(int id);
        Task<bool> Saveall();
        Task<IEnumerable<My_Location>> Getall();
    }
}
