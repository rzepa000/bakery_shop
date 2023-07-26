import { Component, Input, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html'

})
export class HeroComponent implements OnInit{
  center: google.maps.LatLngLiteral = {lat: 51.88185627530865, lng: -0.4204942906446889};  
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

 
  
  ngOnInit() {
    
  }

}
