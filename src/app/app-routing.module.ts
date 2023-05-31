import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaListaComponent } from './agenda-lista/agenda-lista.component';

const routes: Routes = [
  { 
    path: '', 
    component: AgendaListaComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
