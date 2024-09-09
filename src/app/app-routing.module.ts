import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ProfilComponent } from './profil/profil.component';
import { SettingsComponent } from './settings/settings.component';
import { CompetencesComponent } from './competences/competences.component';
import { MatchsComponent } from './matchs/matchs.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'competences', component: CompetencesComponent },
      { path: 'matchs', component: MatchsComponent },
      // Ajoute ici d'autres routes nécessitant le MainLayout
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
