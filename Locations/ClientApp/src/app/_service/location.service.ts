import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationList } from './locationList';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

url: string;

constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {this.url = baseUrl; }

Senddata(filename: string, address: string , latitude: number , longitude: number , ip: string) {

  return this.http.get(this.url + 'WeatherForecast/Create?filename=' + filename + '&address=' + address +
   ' &latitude=' + latitude + '&longitude=' + longitude + ' &ip=' + ip);
 
}
getIPAddress() {

  return this.http.get('https://www.cloudflare.com/cdn-cgi/trace');
}

getall(): Observable<any> {
 
  return this.http.get<LocationList>(this.url + 'WeatherForecast/getall');
  }

Delete(id: number) {

  return this.http.get(this.url + 'WeatherForecast/delete?id=' + id);
   
  }

}
