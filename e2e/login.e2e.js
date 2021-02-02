/* eslint-disable jest/no-identical-title */
/* eslint-disable no-undef */
jest.setTimeout(500000);

describe('Log in test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have log in elements visible', async () => {
    await expect(element(by.id('login-title'))).toBeVisible();
    await expect(element(by.id('login-subtitle'))).toBeVisible();
    await expect(element(by.id('login-email'))).toBeVisible();
    await expect(element(by.id('login-password'))).toBeVisible();
    await expect(element(by.id('login-submit'))).toBeVisible();
    await expect(element(by.id('login-signup'))).toBeVisible();
  });

  it('should show error message on empty data', async () => {
    await waitFor(element(by.id('login-email')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('login-email')).typeText('');

    await waitFor(element(by.id('login-password')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('login-password')).typeText('\n');

    await expect(element(by.id('login-submit'))).toBeVisible();
    await element(by.id('login-submit')).tap();

    await waitFor(element(by.id('login-error')))
      .toBeVisible()
      .withTimeout(20000);
  });

  it('should show error message on non-existing user', async () => {
    await waitFor(element(by.id('login-email')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('login-email')).typeText('nonExistingUser@gmail.com');

    await waitFor(element(by.id('login-password')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('login-password')).typeText('\n');

    await expect(element(by.id('login-submit'))).toBeVisible();
    await element(by.id('login-submit')).tap();

    await waitFor(element(by.id('login-error')))
      .toBeVisible()
      .withTimeout(20000);
  });

  it('should log into existing account', async () => {
    await waitFor(element(by.id('login-email')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('login-email')).typeText('zaxovaiko@gmail.com1');

    await waitFor(element(by.id('login-password')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('login-password')).typeText('password\n');

    await expect(element(by.id('login-submit'))).toBeVisible();
    await element(by.id('login-submit')).tap();

    await waitFor(element(by.id('topbar')))
      .toBeVisible()
      .withTimeout(50000);
  });
});
