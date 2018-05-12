import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { BugserviceService } from './services/bugservice.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './routes';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';

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
    FeatureModule,
    RouterModule.forRoot(rootRoute),
  ],
  providers: [BugserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
