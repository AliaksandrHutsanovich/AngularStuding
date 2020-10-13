import { ICourse } from '../interfaces/course';

export class Course implements ICourse {
  id: number;
  title: string
  creationDate: string; 
  duration: string;
  description: string;
  topRated: boolean;
  authors: string[];

  constructor(
    courseId: number,
    courseTitle: string,
    courseCreationDate: string,
    courseDuration: string,
    courseDescription: string,
    topRated: boolean,
    authors: string[],
  ) {
    this.id = courseId;
    this.title = courseTitle;
    this.creationDate = courseCreationDate;
    this.duration = courseDuration;
    this.description = courseDescription;
    this.topRated = topRated;
    this.authors = authors;
  }
}
