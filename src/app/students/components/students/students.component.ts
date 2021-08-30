import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/core/services/students.service';
import { Student } from '../../../core/models/student.model';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  faPlus = faPlus;

  students :Student[] = [];
  errorFetchingStudents = false;
  
  defaultStudent: Student = {
    id: 0,
    identificationType: 'CC',
    identification: '',
    name1: '',
    name2: '',
    lastName1: '',
    lastName2: '',
    email: '',
    phone: '',
    direction: '',
    city: '',
  };

  constructor(
    private studentsService: StudentsService,
  ) { }

  ngOnInit(): void {
    console.log(this.students.length);
    this.studentsService.fetchStudents().subscribe(
      (res) => {
        this.errorFetchingStudents = false;
        this.students = res;
      },
      (err) => {
        this.errorFetchingStudents = true;
        console.log(err);
      });
  }

}
