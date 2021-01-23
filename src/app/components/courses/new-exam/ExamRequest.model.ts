export class ExamRequest {
  courseId: string;
  description: string;

  constructor(courseId: string, description: string) {
    (this.courseId = courseId), (this.description = description);
  }
}
