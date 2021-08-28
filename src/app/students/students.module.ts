import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './components/students/students.component';


@NgModule({
  declarations: [
    StudentsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    RouterModule
  ]
})
export class StudentsModule { }
