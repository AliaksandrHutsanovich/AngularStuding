import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('if no value, result shoud be value', () => {
    expect(pipe.transform(null, null)).toEqual(null);
  });

  it('if value is empty array, result should be empty array', () => {
    expect(pipe.transform([], 'a')).toEqual([]);
  })

  it('if value is an array with, more one element, a result should be right', () => {
    const entryData = [{ a: 2 }, { a: 1 }];
    const sortedData = [{ a: 1 }, { a: 2 }];
    expect(pipe.transform(entryData, 'a')).toEqual(sortedData);
  });
});
