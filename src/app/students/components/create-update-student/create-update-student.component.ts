import { Component, ElementRef, OnInit, Renderer2, ViewChild, Input, AfterViewInit } from '@angular/core';
import { StudentsService } from '../../../core/services/students.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { Student } from '../../../core/models/student.model';
import { INFERRED_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-create-update-student',
  templateUrl: './create-update-student.component.html',
  styleUrls: ['./create-update-student.component.scss']
})
export class CreateUpdateStudentComponent implements OnInit, AfterViewInit {

  form: any;
  faPlus = faPlus;
  updateMode = false;
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
  @Input() student: Student = {
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

  @ViewChild('updateCreateStudentModal') updateCreateStudentModal!: ElementRef;


  constructor(
    private renderer2: Renderer2,
    private studentService: StudentsService,
    private formBuilder: FormBuilder,
    private studentsServices: StudentsService
  ) {}

  ngOnInit(): void {
    if( this.student.id == 0 ){
      this.updateMode = false;
    }else{
      this.updateMode = true;
    }
    this.buildForm();
  }

  showModal(){
    this.studentService.setCurrentStudent(this.student);
  }
  
  ngAfterViewInit(): void {
    this.renderer2.listen(this.updateCreateStudentModal.nativeElement, 'shown.bs.modal', (event) => {
      this.student = this.studentService.getCurrentStudent();
      this.form.value = this.student;
      this.buildForm();
    });
    this.renderer2.listen(this.updateCreateStudentModal.nativeElement, 'hidden.bs.modal', (event) => {
      this.student = this.defaultStudent;
      this.studentService.setCurrentStudent(this.defaultStudent);
    });
  }

  buildForm(){
    this.form = this.formBuilder.group({
      identificacionType: [this.student.identificationType , [Validators.required, Validators.maxLength(2), Validators.minLength(2)] ],
      identification: [this.student.identification , [Validators.required, Validators.maxLength(15)]],
      name1: [this.student.name1 , [Validators.required, Validators.maxLength(20)]],
      name2: [this.student.name2 , [Validators.maxLength(20)]],
      lastName1: [this.student.lastName1 , [Validators.required, Validators.maxLength(20)]],
      lastName2: [this.student.lastName2 , [Validators.maxLength(20)]],
      email: [this.student.email , [Validators.email, Validators.maxLength(50)]],
      phone: [this.student.phone , [Validators.maxLength(20)]],
      direction: [this.student.direction ,[Validators.maxLength(50)]],
      city: [this.student.city ,[Validators.required,Validators.maxLength(50)]],
    });
  }

  saveData(){
    console.log(this.form.valid);
    if( this.form.valid ){
      console.log(this.form.value);    
    }else{
      this.form.markAllAsTouched();
    }
  }

}
