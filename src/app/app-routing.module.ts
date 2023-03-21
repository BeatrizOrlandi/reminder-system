import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReminderComponent } from './Forms/reminder/reminder.component';

const routes: Routes = [
  { path: 'formulario', component: ReminderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
