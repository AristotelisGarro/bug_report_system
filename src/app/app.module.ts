import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { BugserviceService } from './services/bugservice.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';


@NgModule({
  declarations: [
    AppComponent
],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    FeatureModule,
    RouterModule.forRoot(routes),
  ],
  providers: [BugserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
