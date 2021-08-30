import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  studentApiUrl = `${environment.studentAppApiUrl}/Courses`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  fetchCourses(){
    return this.httpClient.get<Course[]>(this.studentApiUrl);
  }

}
