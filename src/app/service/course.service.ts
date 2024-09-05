import { Injectable } from '@angular/core';
import { data } from '../../assets/demo/data/courses.json'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  getCourses() : Observable<any> {
    return of(data);
  }
}
