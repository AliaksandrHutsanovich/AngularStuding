import { Course } from './course';

describe('Course', () => {
  it('should create an instance', () => {
    expect(
      new Course(
        1,
        'new course',
        '11-9-2020',
        '22min',
        '',
        false,
        [],
      )
    ).toBeTruthy();
  });
});
