import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { ExamRequest } from './new-exam/ExamRequest.model';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  baseUrl = 'https://zaliczenie.btry.eu/api/Exams';

  constructor(private http: HttpClient, private alertService: AlertService) {}

  addExam(examRequest: ExamRequest) {
    return this.http.post(`${this.baseUrl}`, examRequest).pipe(
      tap(
        (success) => this.alertService.succesAlert('Exam added successfully'),
        (error) => this.alertService.errorAlert('Unable to add exam')
      )
    );
  }

  deleteExam(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      tap(
        (success) => this.alertService.succesAlert('Exam deleted successfully'),
        (error) => this.alertService.errorAlert('Unable to delete exam')
      )
    );
  }

  passTheExam(id: string) {
    return this.http.put(`${this.baseUrl}/${id}`, null).pipe(
      tap(
        (success) => this.alertService.succesAlert('Exam passed'),
        (error) => this.alertService.errorAlert('Unable to pass the exam')
      )
    );
  }
}
