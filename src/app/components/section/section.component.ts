import { Component, OnInit, Input } from '@angular/core';
import { Map, tileLayer } from 'leaflet';
import { WeatherService } from 'src/app/services/weather.service';
import { InterfaceGeocoding } from 'src/app/models';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  /* A decorator that allows us to pass data from the parent component to the child component. */
  @Input() data!: InterfaceGeocoding;
  /* Setting the default values for the latitude, longitude and city. */
  latitude: number = 48.8584;
  longitude: number = 2.3428;
  country: string = 'Paris, FR';
  /* Setting the default values for the map, result and error. */
  map!: Map;
  result: any;
  error: string = ""

  constructor(private weatherservice: WeatherService) { }

  /**
   * We're creating a map with a tile layer and adding it to the map div
   */
  ngOnInit(): void {
    /* Creating a map with a marker on it. */
    this.map = new Map('map');

    /* Adding a tile layer to the map. */
    tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 4,
      attribution:
        '&copy; <a href="http://openstreetmap.org">Openstreetmap</a>',
    }).addTo(this.map);

    /* Calling the onChange method with the default values. */
    this.onChange({ country: this.country, lat: this.latitude, lon: this.longitude, name: '', state: '' });
  }

  /**
   * The function takes the latitude and longitude of the city and passes it to the weather service to
   * get the weather data
   */
  onChange(data: InterfaceGeocoding): void {
    this.weatherservice.getCurrentWeather(data.lat, data.lon).subscribe({
      /* It's setting the result to the data that we get from the API. */
      next: (data) => {
        this.result = data;
      },
      error: (err) => {
        /* It's setting the error message to the error message that we get from the API. */
        this.error = err.error.message
      },
    });

    /* Setting the view of the map to the latitude and longitude of the city. */
    this.map.setView([data.lat, data.lon], 8);
  }
}