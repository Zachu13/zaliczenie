export class Course {
  records: [
    title: string,
    description: string,
    exams: string[],
    id: string,

    exams: [
      description: string,
      isPassed: boolean,
      screenshotPath: string,
      courseId: string,
      id: string
    ]
  ];
  id: string;
  message: string;
  count: number;
  isSuccess: boolean;
  operationDate: string;
  page: number;
  pageSize: number;
  nextPage: number;
}
