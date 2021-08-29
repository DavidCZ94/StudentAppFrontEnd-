import { Component, ElementRef, OnInit, Renderer2, ViewChild, Input } from '@angular/core';
import { StudentsService } from '../../../core/services/students.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';
import { Student } from '../../../core/models/student.model';

@Component({
  selector: 'app-create-update-student',
  templateUrl: './create-update-student.component.html',
  styleUrls: ['./create-update-student.component.scss']
})
export class CreateUpdateStudentComponent implements OnInit {

  form: any;
  faPlus = faPlus;
  updateMode = false;
  @Input() student: Student | any;


  constructor(
    private renderer2: Renderer2,
    private studentService: StudentsService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.setStudentId();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      name: [''],
      LastName: [''],
      phoneNumber: [''],
      post: ['']
    });
  }

  saveData(){
    console.log(this.form.value);
  }

  setStudentId(){
    const studentId = this.student;
    if( this.student == null ){
      this.updateMode = false;
    }else{
      this.updateMode = true;
    }
    this.buildForm();
  }

  getUpdateMode(): boolean {
    return this.updateMode;
  }

}
