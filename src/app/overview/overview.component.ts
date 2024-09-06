import { Component, OnInit, effect, inject, model, signal } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Student } from '../model/student';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { DialogModule } from 'primeng/dialog'
import { CourseService } from '../service/course.service';
import { Course } from '../model/course';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, TableModule, ToastModule, ToolbarModule, ButtonModule, CheckboxModule, DialogModule, FormsModule, ReactiveFormsModule, InputTextModule, RadioButtonModule, InputNumberModule, RippleModule, DropdownModule],
  providers: [StudentService],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  courseService = inject(CourseService);
  studentService = inject(StudentService);

  students = signal<Student[]>([]);
  newStudentDialogVisible = signal(false);
  submitted = model(false);
  courseList = <Course[]>[];
  newStudent = {} as Student;
  genders = [];

  constructor() {
    effect(() => console.debug('Signal state changed: ', this.students()));
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(c => this.courseList = c);
    this.studentService.getStudents().subscribe(s => this.students.set(s));
    this.genders = [ 'male', 'female']
  }

  onDeleteStudentEvent(student: Student) {
    console.debug('Delete student: ', student);
    // Remove student from array.
    this.students.update(st => st.filter(s => s.id !== student.id));
  }

  hideDialog() {
    this.newStudentDialogVisible.set(false);
    this.submitted.set(false);
  }

  isValid(student: Student): boolean {
    // TODO: Move to validators and write unit test! #US3548
    return !!student.first_name && !!student.last_name && !!student.email && !!student.gender;
  }

  saveStudent() {
    console.debug('New student submit: ', this.newStudent);

    this.submitted.set(true);

    if (!this.isValid(this.newStudent)) return;

    // New student id should be for one greater than the last last one.
    const lastStudentId = Math.max(...this.students().map(s => s.id));
    const student2add: Student = { ...this.newStudent, id: lastStudentId + 1 }

    this.students.set([... this.students(), student2add]);
    
    // On success clear model and close dialog.
    this.newStudentDialogVisible.set(false);
    this.newStudent = {} as Student;
  }

  // Just for demonstration purpose. Otherwise use ngModel two-way binding.
  onCourseChangeEvent(event: any, student: Student, course: Course) {
    this.students.update(currentStudents => {
      // Find the student by ID who needs the course update.
      const student2Update = currentStudents.find(s => s.id === student.id);

      if (student2Update.courses.includes(course.value)) {
        // If the selected course is already in student.courses, the checkbox is being unchecked, so remove the course.
        student2Update.courses = student2Update.courses.filter(c => c !== course.value)
      } else {
        // If the selected course is not in student.courses, the checkbox is being checked, so add the course.
        student2Update.courses.push(course.value);
      }

      return currentStudents;
    });
  }

}
