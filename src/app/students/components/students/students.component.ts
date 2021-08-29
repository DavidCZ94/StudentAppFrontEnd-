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

  constructor(
    private studentsService: StudentsService,
  ) { }

  ngOnInit(): void {
    this.studentsService.fetchStudents().subscribe(
      (res) => {
        this.students = res;
      },
      (err) => {
        console.log(err);
      });
  }

}
