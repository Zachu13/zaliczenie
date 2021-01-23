import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExamService } from '../exam.service';
import { ExamRequest } from './ExamRequest.model';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss'],
})
export class NewExamComponent implements OnInit {
  newExamForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { courseId: string },
    private fb: FormBuilder,
    private examService: ExamService
  ) {}

  ngOnInit() {
    this.newExamForm = this.fb.group({
      description: [''],
    });
  }

  onSubmit() {
    const exam = new ExamRequest(
      this.data.courseId,
      this.newExamForm.get('description').value
    );
    this.examService.addExam(exam).subscribe();
  }
}
