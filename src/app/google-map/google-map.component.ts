import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent implements OnInit {
  constructor() {}

  latitude: number;
  longtitude: number;
  user : string ;

  ngOnInit(): void {
    const user: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(sessionStorage.getItem('loggedUser'));

    let userId = user.email.split('@');
    this.user = userId[0].toUpperCase();

    this.setCurrentLocation();
  }

  onChooseLocation(event) {
    this.latitude = event.coords.lat;
    this.longtitude = event.coords.lng;
  }


  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longtitude = position.coords.longitude;
      });
    }
  }
}
