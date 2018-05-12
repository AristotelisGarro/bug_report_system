import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { BuglistComponent } from './buglist/buglist.component';
import { BugserviceService } from './services/bugservice.service';
import { HttpClientModule } from '@angular/common/http';
import { BugformComponent } from './bugform/bugform.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    BuglistComponent,
    BugformComponent
,
    NavComponent
],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [BugserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
