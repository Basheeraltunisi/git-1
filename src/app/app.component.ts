import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import {Subject} from 'rxjs';
import { WeatherData } from '../app/weather-data';
import { Observable } from 'rxjs';
// import { debounceTime } from 'rxjs/operator/debounceTime';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { map, filter, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchValue: string;
  items: Observable<Array<String>>;
  search: string;
  term = new FormControl();
  listweather = [];
  chart = [];
  cloudy: boolean;
  clearsky: boolean;
  fog: boolean;
  rain: boolean;
  haze: boolean;
  cities: boolean;
    constructor( public weatherdata: WeatherData, public weatherservice: WeatherService) {
      this.items = this.term.valueChanges.pipe( debounceTime(100), distinctUntilChanged(),
     switchMap(term => this.weatherservice.search(term)));
   //  console.log(this.items);
  }
  searchweather(city) {
    this.searchValue = city;
    this.weatherservice.searchweatherData(city).subscribe((data) => {
       console.log(data);

       const coord = data['coord'];
       const main = data['main'];
       const sys = data['sys'];
       const clouds = data['clouds'];
       const weather = data['weather'];
       const wind = data['wind'];
       const name = data['name'];

       this.weatherdata.longitude = coord['lon'];
       this.weatherdata.latitude = coord['lat'];
       this.weatherdata.city = name;
       this.weatherdata.windspeed = wind['speed'];
       this.weatherdata.sunrise = sys['sunrise'];
       this.weatherdata.sunset = sys['sunset'];
       this.weatherdata.Rainfall = weather[0]['description'];
       this.weatherdata.pressure = main['pressure'];
       this.weatherdata.humidity = main['humidity'];
       this.weatherdata.temp_max = main['temp_max'];
       this.weatherdata.temp_min = main['temp_min'];
       this.weatherdata.temp = Math.round(((main['temp'] ) - 273.15 )).toString();
       this.weatherdata.temp  = this.weatherdata.temp  + ' °C';
       this.weatherdata.deg = wind['deg'];

      //  if (weather[0]['description'] === 'fog') {
      //   this.fog = true;
      //   this.cloudy = false;
      //   this.clearsky = false;
      //   this.rain = false;
      //  } else
      if (weather[0]['description'] === 'clear sky' ) {
        this.fog = false;
        this.cloudy = false;
        this.clearsky = true;
        this.rain = false;
       } else {
          this.fog = false;
        this.cloudy = true;
        this.clearsky = false;
        this.rain = false;
       }
      // else if (weather[0]['description'] === 'few clouds' ) {
      //  else if (weather[0]['description'] === 'light rain' ) {
      //   this.fog = false;
      //   this.cloudy = false;
      //   this.clearsky = false;
      //   this.rain = true;
      //  } else if (weather[0]['description'] === 'haze' ) {
      //   this.fog = false;
      //   this.cloudy = false;
      //   this.clearsky = false;
      //   this.rain = false;
      //   this.haze = true;
      //  }
     }, (err) => {
       console.log(err);
     });
    // this.searchValue = '';
  }

  forcasttemp() {
    this.weatherservice.forcastdata(this.searchValue).subscribe((data) => {
     // console.log(data);
      this.listweather = data['list'];
      console.log(this.listweather);
      const temp_max = [];
      const temp_min = [];
      const alldates = [];
      for (let i = 0; i < this.listweather.length; i++ ) {
        const main = (this.listweather[i]['main']);
        temp_max.push(main['temp_max']);
        temp_min.push(main['temp_min']);
        alldates.push(this.listweather[i]['dt_txt']);
      }

      const weatherDates = [];
      alldates.forEach((res) => {
        const jsdate = new Date(res * 1000);
        weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}));
      });

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: alldates,
          datasets: [
            { label: 'max temp',
              data: temp_max,
              borderColor: '#3cba9f',
              fill: false
            },
            {
              label: 'min temp',
              data: temp_min,
              borderColor: '#ffcc00',
              fill: false
            },
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              label: 'Date',
              display: true
            }],
            yAxes: [{
              label: 'Max and Min Temp',
              display: true
            }]
          }
        }
      });
       });
  }

  forcastrain() {
   // console.log('raind ', this.searchValue);
    this.weatherservice.forcastdata(this.searchValue).subscribe((data) => {
     // console.log(data);
      this.listweather = data['list'];
      console.log(this.listweather);
      const rain = [];
     // const temp_min = [];
      const alldates = [];
      for (let i = 0; i < this.listweather.length; i++ ) {
       if (this.listweather[i]['rain']['3h'] !== undefined ) {
        rain.push(this.listweather[i]['rain']['3h']);
        alldates.push(this.listweather[i]['dt_txt']);
       }
      }

      const weatherDates = [];
      alldates.forEach((res) => {
        const jsdate = new Date(res * 1000);
        weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}));
      });

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: alldates,
          datasets: [
            { label: 'Rain',
              data: rain,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              label: 'Date',
              display: true
            }],
            yAxes: [{
              label: 'Rain',
              display: true
            }]
          }
        }
      });
       });
  }

  forcastsnow() {
     this.weatherservice.forcastdata(this.searchValue).subscribe((data) => {
       this.listweather = data['list'];
       console.log(this.listweather);
       const snow = [];
       const alldates = [];
       for (let i = 0; i < this.listweather.length; i++ ) {
        if ( this.listweather[i]['snow'] !== undefined ) {
          if (this.listweather[i]['snow']['3h'] !== undefined) {
            console.log(this.listweather[i]['snow']['3h']);
         snow.push(this.listweather[i]['snow']['3h']);
         alldates.push(this.listweather[i]['dt_txt']);
          }
        }
       }
       const weatherDates = [];
       alldates.forEach((res) => {
         const jsdate = new Date(res * 1000);
         weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}));
       });

       this.chart = new Chart('canvas', {
         type: 'line',
         data: {
           labels: alldates,
           datasets: [
             { label: 'Snow',
               data: snow,
               borderColor: '#3cba9f',
               fill: false
             }
           ]
         },
         options: {
           legend: {
             display: true
           },
           scales: {
             xAxes: [{
               label: 'Date',
               display: true
             }],
             yAxes: [{
               label: 'snow',
               display: true
             }]
           }
         }
       });
        });
   }
}
