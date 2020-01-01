import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//using lazy loading to load users module
const routes: Routes = [
  {path: '', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
