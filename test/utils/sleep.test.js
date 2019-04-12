import sleep from '@src/utils/sleep';

describe('sleep test', () => {
  test('should return true', async () => {
    await sleep();
    expect(true).toBeTruthy();
  });
});
