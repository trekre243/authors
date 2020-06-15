import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  {path: 'new', component: AddAuthorComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: '', component: MainComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
