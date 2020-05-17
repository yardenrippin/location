import { Component, OnInit } from '@angular/core';
import { LocationService } from '../_service/location.service';
import { LocationList } from '../_service/locationList';
import { Router } from '@angular/router';


@Component({
  selector: 'app-List',
  templateUrl: './List.component.html',
  styleUrls: ['./List.component.css']
})
export class ListComponent implements OnInit {
  locations: LocationList[];

  constructor(private _server: LocationService, private route: Router) { }

  ngOnInit() {
    this.get();
  }


get() {
this._server.getall().subscribe(data =>
  {  this.locations = data }, error => {alert(error)});
}

Delete(id: number) {
  
    if (confirm("Do You Whant Delete This Employee?")) {
      this._server.Delete(id).subscribe(success=>{this.get();},error=>{alert(error)});
    } 
  }
  Mapit(latitude, longitude){
    this.route.navigate(['/mapit']);
  }
}
