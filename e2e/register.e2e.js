/* eslint-disable jest/no-identical-title */
/* eslint-disable no-undef */
import faker from 'faker';

jest.setTimeout(500000);

describe('Register test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have register elements visible', async () => {
    await expect(element(by.id('login-signup'))).toBeVisible();
    await element(by.id('login-signup')).tap();
    await expect(element(by.id('register-title'))).toBeVisible();
    await expect(element(by.id('register-subtitle'))).toBeVisible();
    await expect(element(by.id('register-email'))).toBeVisible();
    await expect(element(by.id('register-passw'))).toBeVisible();
    await expect(element(by.id('register-submit'))).toBeVisible();
    await expect(element(by.id('register-login-link'))).toBeVisible();
  });

  it('should show error message on empty data', async () => {
    await expect(element(by.id('login-signup'))).toBeVisible();
    await element(by.id('login-signup')).tap();
    await waitFor(element(by.id('register-email')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('register-email')).typeText('');

    await waitFor(element(by.id('register-pass')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('register-pass')).typeText('\n');

    await expect(element(by.id('register-terms'))).toBeVisible();
    await element(by.id('register-terms')).tap();
    await waitFor(element(by.text('OK')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.text('OK')).tap();

    await expect(element(by.id('register-submit'))).toBeVisible();
    await element(by.id('register-submit')).tap();

    await waitFor(element(by.id('register-error')))
      .toBeVisible()
      .withTimeout(20000);
  });

  it('should show error message on existing user', async () => {
    await expect(element(by.id('login-signup'))).toBeVisible();
    await element(by.id('login-signup')).tap();
    await waitFor(element(by.id('register-email')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('register-email')).typeText('zaxovaiko@gmail.com');

    await waitFor(element(by.id('register-pass')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('register-pass')).typeText('password\n');

    await expect(element(by.id('register-terms'))).toBeVisible();
    await element(by.id('register-terms')).tap();
    await waitFor(element(by.text('OK')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.text('OK')).tap();

    await expect(element(by.id('register-submit'))).toBeVisible();
    await element(by.id('register-submit')).tap();

    await waitFor(element(by.id('register-error')))
      .toBeVisible()
      .withTimeout(20000);
  });

  it('should show error message on existing user', async () => {
    await expect(element(by.id('login-signup'))).toBeVisible();
    await element(by.id('login-signup')).tap();
    await waitFor(element(by.id('register-email')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('register-email')).typeText('zaxovaiko@gmail.com');

    await waitFor(element(by.id('register-pass')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('register-pass')).typeText('password\n');

    await expect(element(by.id('register-terms'))).toBeVisible();
    await element(by.id('register-terms')).tap();
    await waitFor(element(by.text('OK')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.text('OK')).tap();

    await expect(element(by.id('register-submit'))).toBeVisible();
    await element(by.id('register-submit')).tap();

    await waitFor(element(by.id('register-error')))
      .toBeVisible()
      .withTimeout(20000);
  });

  it('should create a new user', async () => {
    await expect(element(by.id('login-signup'))).toBeVisible();
    await element(by.id('login-signup')).tap();
    await waitFor(element(by.id('register-email')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('register-email')).typeText(faker.internet.email());

    await waitFor(element(by.id('register-pass')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('register-pass')).typeText('password\n');

    await expect(element(by.id('register-terms'))).toBeVisible();
    await element(by.id('register-terms')).tap();
    await waitFor(element(by.text('OK')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.text('OK')).tap();

    await expect(element(by.id('register-submit'))).toBeVisible();
    await element(by.id('register-submit')).tap();

    await waitFor(element(by.id('setup-img')))
      .toBeVisible()
      .withTimeout(50000);
  });
});
