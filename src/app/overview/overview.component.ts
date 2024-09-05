import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Student } from '../model/student';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { CourseService } from '../service/course.service';
import { Course } from '../model/course';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, TableModule, ToastModule, ToolbarModule, ButtonModule, CheckboxModule],
  providers: [StudentService],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  courseService = inject(CourseService);
  studentService = inject(StudentService);
  students = signal<Student[]>([]);
  courseList = <Course[]>[];

  constructor() {
    effect(() => console.debug('Signal state changed: ', this.students()));
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(c => this.courseList = c);
    this.studentService.getStudents().subscribe(s => this.students.set(s));
  }

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
