import { TransformTimePipe } from './transform-time.pipe';

describe('TransformTimePipe', () => {
  const pipe = new TransformTimePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform should return proper value in case of no value', async () => {
    const result = await pipe.transform('45');
    expect(result).toEqual('45min');
  });
});
