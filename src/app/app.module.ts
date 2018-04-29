import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BuglistComponent } from './buglist/buglist.component';
import { BugserviceService } from './bugservice.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    BuglistComponent
],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [BugserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
