import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { CoursesService } from './courses.service';
import { Course } from 'src/app/entities';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpSpy;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'put',
      'delete',
    ]);
    TestBed.configureTestingModule({
      providers: [
        CoursesService,
        { provide: HttpClient, useValue: httpSpy },
      ],
    });
    service = TestBed.inject(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addItem should make post request to api', () => {
    const course = new Course(
      4,
      'new course',
      '5-20-2020',
      '23',
      '',
      false,
      [],
    );
    service.addItem(course);
    expect(httpSpy.post).toHaveBeenCalled();
  });

  it('getItemById should make get request to api properly', () => {
    service.getItemById(3);
    expect(httpSpy.get).toHaveBeenCalledWith(
      'http://localhost:3000/courses/3',
    );
  });

  it('updateItem should make put request to api', () => {
    const course = new Course(
      4,
      'new course',
      '5-20-2020',
      '110',
      '',
      false,
      [],
    );
    service.updateItem(course);

    expect(httpSpy.put).toHaveBeenCalled();
  });

  it('getList should make get request to api', () => {
    service.getList(0, 2, 'qq');

    expect(httpSpy.get).toHaveBeenCalledWith(
      'http://localhost:3000/courses?start=0&count=2&search=qq',
    );

    service.getList(0, 2);

    expect(httpSpy.get).toHaveBeenCalledWith(
      'http://localhost:3000/courses?start=0&count=2',
    );
  });

  it('removeItem should make delete request to api', () => {
    service.removeItem(3);
    expect(httpSpy.delete).toHaveBeenCalledWith(
      'http://localhost:3000/courses/3',
    );
  });
});
