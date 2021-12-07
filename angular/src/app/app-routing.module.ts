import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './authorization/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { LogoutComponent } from './authorization/logout/logout.component';
import { RegisterComponent } from './authorization/register/register.component';
import { ForgotPasswordComponent } from './authorization/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authorization/reset-password/reset-password.component';
import { AppComponent } from './app.component';

// const routes: Routes = [
//   {path: '', component: HomeComponent},
//   {path: 'login', component: LoginComponent},
//   {path: 'logout', component: LogoutComponent, canActivate:[AuthGuard]},
//   {path: 'register', component: RegisterComponent},
//   {path: 'forgot-password', component: ForgotPasswordComponent},
//   {path: 'reset-password', component: ResetPasswordComponent},
//   {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
//   {path: 'profile', component: DashboardComponent, canActivate:[AuthGuard]},

//   {path: 'admin', component: DashboardComponent, canActivate:[AuthGuard]},
//   {path: 'user', component: DashboardComponent, canActivate:[AuthGuard]},
// ];
const routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent, canActivate:[AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: DashboardComponent, canActivate:[AuthGuard]},

  {
    path: 'admin',
    loadChildren: () => import('./pages/administration/administration.module').then(m => m.AdministrationModule),
    canActivate:[AuthGuard],
    data: { preload: true },
    // canLoad: [AuthGuard]
  },
  // {path: 'user', component: DashboardComponent, canActivate:[AuthGuard]},
  // {
  //   path: '',
  //   canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard],
  //   component: AppComponent,
  //   children: [
  //       {
  //           path: 'admin',
  //           loadChildren: () => import('./pages/administration/administration.module').then(m => m.AdministrationModule), //Lazy load admin module
  //           data: { preload: true },
  //           // canLoad: [AuthGuard]
  //       },

  //   ]
  // }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(
    //private router: Router,
    ) {
      debugger;

    }
}
