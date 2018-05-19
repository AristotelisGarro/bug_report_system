import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core/core.module';
import { BugsModule } from './feature/bugs/bugs.module';

const rootRoute: Routes = [
  {path: '', redirectTo: 'bugs', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent
],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    BugsModule,
    RouterModule.forRoot(rootRoute),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
