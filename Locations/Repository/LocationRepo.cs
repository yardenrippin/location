using Locations.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Locations.Repository
{
    public class LocationRepo : ILocationRepository
    {
        public DataContext _Context { get; }

        public LocationRepo(DataContext context)
        {
            _Context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _Context.Add(entity);
        }



        public async Task Delete(int id)
        {
            var Location = await _Context.Locations.FirstOrDefaultAsync(X => X.Id == id);
            _Context.Locations.Remove(Location);
        }

        public async Task<IEnumerable<My_Location>> Getall()
        {
            var locatins = await _Context.Locations.ToListAsync();

            return locatins;
        }

        public async Task<bool> Saveall()
        {
            return await _Context.SaveChangesAsync() > 0;
        }

        public void CreatFile(string filename, string address, decimal latitud, decimal longitude, string ip)
        {
            string fileName = "Files/" + filename + ".txt";

            try
            {

                if (File.Exists(fileName))
                {
                    File.Delete(fileName);
                    return;
                }


                using (StreamWriter sw = File.CreateText(fileName))
                {

                    byte[] info = new UTF8Encoding(true).GetBytes("This is some text in the file.");
                    sw.WriteLine("New file created: " + DateTime.Now.ToString());
                    sw.WriteLine("Location Name: " + address);
                    sw.WriteLine("latitud: " + latitud);
                    sw.WriteLine("longitude: " + longitude);
                    sw.WriteLine("ip: " + ip);
                }


            }
            catch (Exception Ex)
            {
                Console.WriteLine(Ex.ToString());
            }
        }
        public void ReadToClass(string path)
        {
            using (StreamReader myFile = new StreamReader(path))
            {
               
                while (!myFile.EndOfStream)
                {
                    My_Location L = new My_Location();
                    var date = myFile.ReadLine();
                    //ned to convert to datetime
                    L.LocationName = myFile.ReadLine();
                    L.Latitude = decimal.Parse(myFile.ReadLine());
                    L.Longitude = decimal.Parse(myFile.ReadLine());
                    L.IPAddress = myFile.ReadLine();
                    
                }
            }
        }
    }
}
