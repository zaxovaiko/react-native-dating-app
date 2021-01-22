import {isName} from '../../validators/user';

describe('User validator', () => {
  test('should return true', () => {
    expect(isName('Adam Sendler')).toBeTruthy();
  });

  test('should return false on long string', () => {
    expect(isName('Adam Sendler Adam Sendler Adam Sendler')).toBeFalsy();
  });

  test('should return false on short string', () => {
    expect(isName('Ada')).toBeFalsy();
  });

  test('should return false on empty string', () => {
    expect(isName('')).toBeFalsy();
  });

  test('should return false on object different from string', () => {
    expect(isName(43)).toBeFalsy();
  });
});
