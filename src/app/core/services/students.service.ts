import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Course } from '../models/course.model';
import { Student } from '../models/student.model';
import { StudentCourse } from '../models/studentCourse.model';
import { TemporalCourse } from '../models/temporalCourse.model';

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

  studentCourses : StudentCourse[] = [];

  updateMode = false;

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  }); 

  constructor(
    private httpClient: HttpClient,
  ) { }

  fetchStudents(){
    return this.httpClient.get<Student[]>(this.studentApiUrl);
  }

  createStudent(student: Student){
    const studentToSend = this.setStudentToSend(student);
    const json = JSON.stringify(studentToSend); 
    return this.httpClient.post<Student>(this.studentApiUrl, json, {headers: this.headers});
  }

  updateStudent(student: Student){
    const studentToSend = this.setStudentToSend(student);
    const json = JSON.stringify(studentToSend); 
    return this.httpClient.put<Student>(`${this.studentApiUrl}/${student.id}`, json, {headers: this.headers});
  }
  
  setStudentToSend(student: Student){
    student.studentCourses?.map(
      (course: TemporalCourse) => {
        if( course.status ){
          // Duplicates Validation 
          const duplicateFound = this.studentCourses.find( (studentCourse: StudentCourse) => studentCourse.idCurso == course.id);

          if( duplicateFound ){
          }else{
            this.studentCourses.push({
              idStudent: student.id,
              idCurso: course.id,
              finalGrade: parseFloat( parseFloat( course.finalGrade ).toFixed(2)) | 0,
            });
          }
        }
      });
    delete student.studentCourses;

    const studentToSend = {
      ...student,
      studentCourse : this.studentCourses
    }
    return studentToSend;
  }

  getCurrentStudent(){
    return this.currentStudent;
  }

  setCurrentStudent(student: Student){
    this.currentStudent = student;
  }

  setUpdateMode(updateMode: boolean){
    this.updateMode = updateMode;
  }

  getUpdateMode(){
    return this.updateMode;
  }

}
