import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummariesComponent} from './summaries/summaries.component';
import { GuestGuard } from './Guards/guest.guard';
import { AuthGuard } from './Guards/auth.guard';
import { SearchComponent } from './search/search.component';
import { SummaryComponent } from './summary/summary.component';
import { AboutComponent } from './about/about.component';



const routes: Routes = [
  {path: 'summaries', component: SummariesComponent},
  {path: 'summaries/:cat', component: SummariesComponent},
  {path: 'search', component: SearchComponent},
  {path: 'summary/:sid', component: SummaryComponent,children:[],canActivate:[],runGuardsAndResolvers: 'always'},
  {path: 'about', component: AboutComponent},
  {path: '**', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled',onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
