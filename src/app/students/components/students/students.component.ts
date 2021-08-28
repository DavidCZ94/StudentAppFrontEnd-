import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/core/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  constructor(
    private studentsService: StudentsService,
  ) { }

  ngOnInit(): void {
    this.studentsService.fetchStudents();
  }

}
