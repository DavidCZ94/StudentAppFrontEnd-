import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  studentApiUrl = `${environment.studentAppApiUrl}/student`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  fetchStudents(){
    return this.httpClient.get<Student[]>(this.studentApiUrl);
  }
  
}
