import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTdxComponent } from './Components/homeTdx/homeTdx.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeTdxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
