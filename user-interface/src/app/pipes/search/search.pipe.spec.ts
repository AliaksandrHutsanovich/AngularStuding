import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPipe } from './search.pipe';
import { Course } from '../../entities/course';

describe('SearchPipe', () => {
  let pipe;

  let entryValues;

  beforeEach(async(() => {
    pipe = new SearchPipe();

    entryValues = [
      new Course(
        1,
        'Angular studing. Framework outside and inside',
        '12-15-2020',
        '88',
        'Learn about where you can find course description, what information thay include, how they work and details about various' +
        'components about course description. Course description report information about a university of college`s classes. They are published' +
        'both in course catalogs the outline degree requirements and in course schedules that contain for all courses offered during',
        true,
        [],
      ),
      new Course(
        2,
        'React. The most flexible framework',
        '12-9-2019',
        '134',
        'Learn about where you can find course description, what information thay include, how they work and details about various' +
        'components about course description. Course description report information about a university of college`s classes. They are published' +
        'both in course catalogs the outline degree requirements and in course schedules that contain for all courses offered during',
        false,
        [],
      ),
      new Course(
        3,
        'Vue. This new step in front end.',
        '4-20-2020',
        '110',
        'Learn about where you can find course description, what information thay include, how they work and details about various' +
        'components about course description. Course description report information about a university of college`s classes. They are published' +
        'both in course catalogs the outline degree requirements and in course schedules that contain for all courses offered during',
        true,
        [],
      ),
    ];
  }));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform should return proper value for array', async () => {

    const expectedRes = [
      new Course(
        2,
        'React. The most flexible framework',
        '12-9-2019',
        '134',
        'Learn about where you can find course description, what information thay include, how they work and details about various' +
        'components about course description. Course description report information about a university of college`s classes. They are published' +
        'both in course catalogs the outline degree requirements and in course schedules that contain for all courses offered during',
        false,
        [],
      ),
      new Course(
        3,
        'Vue. This new step in front end.',
        '4-20-2020',
        '110',
        'Learn about where you can find course description, what information thay include, how they work and details about various' +
        'components about course description. Course description report information about a university of college`s classes. They are published' +
        'both in course catalogs the outline degree requirements and in course schedules that contain for all courses offered during',
        true,
        [],
      ),
    ];
    console.log('entryValues1=', entryValues);
    const result = await pipe.transform(entryValues, 'Th');
    console.log('result=', result);
    expect(result).toEqual(expectedRes);
  });

  it('transform should return initial value if no second argument', async () => {
    console.log('entryValues2=', entryValues);
    const result = await pipe.transform(entryValues);
    console.log('result2=', result);
    expect(result).toEqual(entryValues);
  });
});
