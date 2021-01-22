import {getAgeFromDate} from '../../helpers/date';

describe('Date helper', () => {
  test('should return 19', () => {
    expect(getAgeFromDate(new Date(2001, 8, 1))).toBe(19);
  });

  test('should return 0', () => {
    expect(getAgeFromDate(new Date(Date.now()))).toBe(0);
  });

  test('should throw error on string', () => {
    expect(() => getAgeFromDate('some text')).toThrow();
  });

  test('should htrow error in empty value', () => {
    expect(() => getAgeFromDate()).toThrow();
  });
});
