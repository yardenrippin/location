import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponen } from './home/home.component';
import { AgmCoreModule } from '@agm/core';
import { LocationService } from './_service/location.service';
import { ListComponent } from './List/List.component';





@NgModule({
   declarations: [
      AppComponent,
      NavMenuComponent,
      HomeComponen,
      ListComponent,
      
   ],
   imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({

      apiKey: 'AIzaSyAZX-fpyz93Ib0sGOQCBsbbp5nbInHVRnI',
      libraries: ['places']
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponen, pathMatch: 'full' },
      { path: 'List', component: ListComponent }
      
    ])
  ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
