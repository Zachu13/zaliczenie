import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Course } from './course.model';
import { CourseService } from './course.service';
import { ExamService } from './exam.service';
import { NewCourseComponent } from './new-course/new-course.component';
import { NewExamComponent } from './new-exam/new-exam.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private examService: ExamService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.courseService.fetchCourses().subscribe((response) => {
      this.courses = response;
    });
  }

  onDeleteCourse(id: string) {
    this.courseService.deleteCourse(id).subscribe((res) => {
      this.courseService
        .fetchCourses()
        .subscribe((response) => (this.courses = response));
    });
  }

  onDeleteExam(id: string) {
    this.examService.deleteExam(id).subscribe((res) => {
      this.courseService
        .fetchCourses()
        .subscribe((response) => (this.courses = response));
    });
  }

  passTheExam(id: string) {
    this.examService.passTheExam(id).subscribe((res) => {
      this.courseService
        .fetchCourses()
        .subscribe((response) => (this.courses = response));
    });
  }
  addCourse() {
    const dialogRef = this.dialog.open(NewCourseComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.courseService
        .fetchCourses()
        .subscribe((response) => (this.courses = response));
      console.log(`Dialog result: ${result}`);
    });
  }

  newExam(courseId: string) {
    const dialogRef = this.dialog.open(NewExamComponent, {
      data: { courseId: courseId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.courseService
        .fetchCourses()
        .subscribe((response) => (this.courses = response));
      console.log(`Dialog result: ${result}`);
    });
  }
}
