import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
})
export class NewCourseComponent implements OnInit {
  newCourseForm: FormGroup;

  constructor(private courseService: CourseService, private fb: FormBuilder) {}

  ngOnInit() {
    this.newCourseForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.newCourseForm.get('title').value);
    formData.append('description', this.newCourseForm.get('description').value);

    this.courseService
      .postCourse(formData)
      .subscribe((res) => console.log(res));
  }
}
