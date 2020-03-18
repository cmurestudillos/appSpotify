import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Servicios
import {AuthGuardService} from './services/auth-guard.service.ts.guard';
// Componentes
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import {AccessTokenComponent} from './components/access-token/access-token.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'search', component: SearchComponent},
  {path: 'artist/:id', component: ArtistaComponent, canActivate: [AuthGuardService]},
  { path: 'access_token', component: AccessTokenComponent },
  {path: '', pathMatch:'full', redirectTo:'home'},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
