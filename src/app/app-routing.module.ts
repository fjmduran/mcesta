import { DownloadAppComponent } from './components/download-app/download-app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';
import { HomeComponent } from './components/home/home.component';
import { GrouplistComponent } from './components/grouplist/grouplist.component';
import { ProductGroupListComponent } from './components/product-group-list/product-group-list.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CestasComponent } from './components/cestas/cestas.component';
import { FryptoComponent } from './components/frypto/frypto.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  //{ path: 'local/:id', component: LocalComponent },
  //{ path: 'tienda/:id', component: TiendaComponent },
  //{ path: 'tiendasubgrupos/:idLocal/:idGrupo', component: TiendaSubgrupoComponent },
  { path: 'frypto', component: FryptoComponent },
  { path: 'cestas', component: CestasComponent },
  { path: 'grupos/:id', component: GrouplistComponent },  
  { path: 'productos/:idCesta/:idGrupo', component: ProductGroupListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'download', component: DownloadAppComponent },
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
