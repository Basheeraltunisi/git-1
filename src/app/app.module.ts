import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WeatherService } from '../app/weather.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherData } from '../../src/app/weather-data';
import { JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ForcastComponent } from './forcast/forcast.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  { path: 'app-forcast',      component: ForcastComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '',
    component: AppComponent,
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ForcastComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    // other imports here
    AngularFontAwesomeModule,
    BrowserModule,
    HttpClientModule, JsonpModule, FormsModule, ReactiveFormsModule
     ],
  providers: [WeatherService, WeatherData],
  bootstrap: [AppComponent]
})
export class AppModule { }
