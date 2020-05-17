import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { LocationService } from '../_service/location.service';
import { error } from '@angular/compiler/src/util';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'Home-root',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponen {

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  ipAddress : string;
  filename:string;
  full_address: string ="";


  @ViewChild('search',{static: false})
  public searchElementRef: ElementRef;

  constructor( private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone , private _service: LocationService) { }


    ngOnInit() {
      this._service.getIPAddress().subscribe(( data:any)=>{ debugger;
    
        this.ipAddress=data.ip;});
 
      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
       // this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;
  
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

           
              for (let index = 0; index < place.address_components.length; index++) {
               
               
      
                  
                  this.full_address=this.full_address+place.address_components[index].long_name+ " ";
                
                
              }
           
        
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
  
            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      });
    }
  
    // Get Current Location Coordinates
    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 8;
          this.getAddress(this.latitude, this.longitude);
        });
      }
    }
  
  
    markerDragEnd($event: MouseEvent) {
      console.log($event);
      this.latitude = $event.coords.lat;
      this.longitude = $event.coords.lng;
      this.getAddress(this.latitude, this.longitude);
    }
  
    getAddress(latitude, longitude) {
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
        debugger;
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            
            this.address = results[0].formatted_address;
            
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
  
      });
    }
    register(){
      
this._service.Senddata(this.filename,this.full_address,this.latitude,this.longitude ,'1234').subscribe(()=>{
alert("file" + this.filename + "attach to Database")
},error =>{alert ("server error")});




    }
  }