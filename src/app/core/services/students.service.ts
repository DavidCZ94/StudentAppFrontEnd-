import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  fetchStudents(){
    console.log('Sturdents service');
  }
}
