import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  studentApiUrl = `${environment.studentAppApiUrl}/student`;

  currentStudent: Student = {
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
  };;

  updateMode = false;

  constructor(
    private httpClient: HttpClient,
  ) { }

  fetchStudents(){
    return this.httpClient.get<Student[]>(this.studentApiUrl);
  }

  getCurrentStudent(){
    return this.currentStudent;
  }

  setCurrentStudent(student: Student){
    this.currentStudent = student;
  }
  
}
