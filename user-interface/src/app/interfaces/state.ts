import { Course } from '../entities/course';

export interface EmailState {
  email: string;
  firstName: string;
  lastName: string;
};

export interface CoursesState {
  courses: Course[],
};
