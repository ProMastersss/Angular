import {NgModule} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {BrowserModule} from '@angular/platform-browser';

import {LayoutModule} from '@angular/cdk/layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeroesComponent} from './components/heroes/heroes.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HeroDetailsComponent} from './components/hero-details/hero-details.component';
import {MessagesComponent} from './components/messages/messages.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./services/in-memory-data.service";
import {HeroSearchComponent} from './components/hero-search/hero-search.component';
import {HeroFormComponent} from './components/hero-form/hero-form.component';
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [AppComponent, NavbarComponent, HeroesComponent, HeroDetailsComponent, MessagesComponent, DashboardComponent, HeroSearchComponent, HeroFormComponent],
  imports: [
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: true}),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
