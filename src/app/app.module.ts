import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GetNewsComponent } from './components/get-news.component';
import { DisplayNewsComponent } from './components/display-news.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewsService } from './NewsService';
import { HttpClientModule } from '@angular/common/http';
import { CountryService } from './CountryService';

@NgModule({
  declarations: [
    AppComponent,
    GetNewsComponent,
    DisplayNewsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [NewsService, CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
