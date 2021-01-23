import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseUrl = 'https://zaliczenie.btry.eu/api/Course';

  constructor(private http: HttpClient, private alertService: AlertService) {}

  fetchCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(
        (res) => this.alertService.succesAlert('Success'),
        (err) => this.alertService.errorAlert('Failed')
      )
    );
  }

  postCourse(formData) {
    return this.http.post(this.baseUrl, formData).pipe(
      tap(
        (res) => this.alertService.succesAlert('Course added successfully'),
        (err) => this.alertService.errorAlert('Unable to add course')
      )
    );
  }
}
