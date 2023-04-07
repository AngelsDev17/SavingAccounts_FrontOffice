import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/guards/auth.guard';
import { GenerateAccountComponent } from './components/generate-account/generate-account.component';
import { LogoutGuard } from './helpers/guards/logout.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LogoutGuard]
  },
  {
    path: 'generate-account',
    component: GenerateAccountComponent,
    canActivate: [LogoutGuard]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
