import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './components/students/students.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateUpdateStudentComponent } from './components/create-update-student/create-update-student.component';


@NgModule({
  declarations: [
    StudentsComponent,
    CreateUpdateStudentComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class StudentsModule { }
