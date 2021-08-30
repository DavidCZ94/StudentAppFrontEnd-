import { Component, ElementRef, OnInit, Renderer2, ViewChild, Input, AfterViewInit } from '@angular/core';
import { StudentsService } from '../../../core/services/students.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Student } from '../../../core/models/student.model';
import { INFERRED_TYPE } from '@angular/compiler/src/output/output_ast';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/core/models/course.model';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-create-update-student',
  templateUrl: './create-update-student.component.html',
  styleUrls: ['./create-update-student.component.scss']
})
export class CreateUpdateStudentComponent implements OnInit, AfterViewInit {

  form: any;
  fetchedCourses = false;
  faPlus = faPlus;
  updateMode = false;
  defaultStudent: Student = {
    id: 0,
    identificationType: '',
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
    identificationType: '',
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

  courses: Course[] = [];

  @ViewChild('updateCreateStudentModal') updateCreateStudentModal!: ElementRef;


  constructor(
    private renderer2: Renderer2,
    private studentService: StudentsService,
    private formBuilder: FormBuilder,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) {}

  ngOnInit(): void {
    this.fetchCourses();
    if( this.student.id ){
      this.updateMode = true;
    }else{
      this.updateMode = false;
    }
    this.buildForm();
  }

  fetchCourses(){
    this.coursesService.fetchCourses().subscribe(
      (res) => {
        this.courses = res;
        this.fetchedCourses = true;
        //console.log(this.studentCoursesField);
      }
    )
  }

  showModal(){
    this.studentService.setCurrentStudent(this.student);
  }
  
  ngAfterViewInit(): void {
    this.renderer2.listen(this.updateCreateStudentModal.nativeElement, 'shown.bs.modal', (event) => {
      this.student = this.studentService.getCurrentStudent();
      this.form.value = this.student;
      this.buildForm();
      if(this.fetchedCourses){
        this.courses.map(
          (course) => {
            this.addStudentCoursesField(course);
          }
        )
      }
    });
    this.renderer2.listen(this.updateCreateStudentModal.nativeElement, 'hidden.bs.modal', (event) => {
      this.student = this.defaultStudent;
      this.studentService.setCurrentStudent(this.defaultStudent);
    });
  }

  buildForm(){
    this.form = this.formBuilder.group({
      id: [this.student.id,],
      identificationType: [this.student.identificationType , [Validators.required, Validators.maxLength(2), Validators.minLength(2)] ],
      identification: [this.student.identification , [Validators.required, Validators.maxLength(15)]],
      name1: [this.student.name1 , [Validators.required, Validators.maxLength(20)]],
      name2: [this.student.name2 , [Validators.maxLength(20)]],
      lastName1: [this.student.lastName1 , [Validators.required, Validators.maxLength(20)]],
      lastName2: [this.student.lastName2 , [Validators.maxLength(20)]],
      email: [this.student.email , [Validators.email, Validators.maxLength(50)]],
      phone: [this.student.phone , [Validators.maxLength(20)]],
      direction: [this.student.direction ,[Validators.maxLength(50)]],
      city: [this.student.city ,[Validators.required,Validators.maxLength(50)]],
      studentCourses: this.formBuilder.array([])
    });
  }

  addStudentCoursesField(course: any){
    this.studentCoursesField.push(this.createStudentCoursesField(course));
  }
  
  private createStudentCoursesField(course: any){
    return this.formBuilder.group({
      status: [course.status],
      course: [course.name],
      finalGrade: [course.finalGrade]
    });
  }

  get studentCoursesField(){
    return this.form.get('studentCourses') as FormArray;
  }

  saveData(){
    if( this.form.valid ){
      if( this.student.id != 0  ){
        this.studentService.updateStudent(this.form.value)/* .subscribe(
          (res) => {
            console.log(res);
          }
        ); */
      }else{
        this.studentsService.createStudent(this.form.value)/* .subscribe(
          (res) => {
            console.log(res);
          }
        ); */
      }
    }else{
      this.form.markAllAsTouched();
    }
  }

}
