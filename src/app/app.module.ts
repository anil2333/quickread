import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ApiService} from './api.service';
import {Configuration} from './configuration';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenService } from './token.service';
import { HeaderComponent } from './header/header.component';
import { TopsliderComponent } from './topslider/topslider.component';
import { PopularsummariesComponent } from './popularsummaries/popularsummaries.component';
import { ContactfooterComponent } from './contactfooter/contactfooter.component';
import { FooterComponent } from './footer/footer.component';
import { SummariesComponent } from './summaries/summaries.component';
import { SearchComponent } from './search/search.component';
import { SummaryComponent } from './summary/summary.component';
import { ReadMoreComponent } from './read-more.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SafeHtmlPipe } from './safehtml.pipe';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { GsPlayerModule} from 'gs-player';
import { timeFormat } from './timeFormat.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    TopsliderComponent,
    PopularsummariesComponent,
    ContactfooterComponent,
    FooterComponent,
    SummariesComponent,
    SearchComponent,
    SummaryComponent,
    ReadMoreComponent,
    SafeHtmlPipe,
    timeFormat,
    AboutComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SlickCarouselModule,
    NgxAudioPlayerModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    AutocompleteLibModule,
    GsPlayerModule
  ],
  providers: [ApiService,Configuration,TokenService,LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
