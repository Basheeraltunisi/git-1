import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import { URLSearchParams, Jsonp } from '@angular/http';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private jsonp: Jsonp , private http: HttpClient) { }

  searchweatherData(location: string) {


    // return this.http.get('api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=7d7362b7da1bccd133fecd94d52e7fa1')
    // .pipe(map(res => res));
    const dataSub = new Subject<string>();

    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=7d7362b7da1bccd133fecd94d52e7fa1');

      // return dataSub;
  }

  search (term: string) {

    const search = new URLSearchParams();
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');


    return this.jsonp.get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
    // .map((response) => response.json()[1]);
    .pipe(map(data => data.json()[1]));
  }
  forcastdata(term: string) {
    return this.http.get(
      'http://api.openweathermap.org/data/2.5/forecast?q=' + term + '&APPID=7d7362b7da1bccd133fecd94d52e7fa1');
// api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml
  }
}
