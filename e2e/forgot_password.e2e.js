/* eslint-disable jest/no-identical-title */
/* eslint-disable no-undef */
jest.setTimeout(500000);

describe('Send password changing link e2e test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have forgot pasword link', async () => {
    await waitFor(element(by.id('login-forgot')))
      .toBeVisible()
      .withTimeout(2000);
  });

  it('should redirect to forgot password page', async () => {
    await waitFor(element(by.id('login-forgot')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('login-forgot')).tap();

    await waitFor(element(by.id('recover-caption')))
      .toBeVisible()
      .withTimeout(3000);
    await waitFor(element(by.id('recover-email')))
      .toBeVisible()
      .withTimeout(3000);
    await waitFor(element(by.id('recover-submit')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should show error on recover page after tap', async () => {
    await waitFor(element(by.id('login-forgot')))
      .toBeVisible()
      .withTimeout(2000);
    await element(by.id('login-forgot')).tap();
    await waitFor(element(by.id('recover-submit')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('recover-submit')).tap();
    await waitFor(element(by.text('Email is invalid')))
      .toBeVisible()
      .withTimeout(3000);
  });

  // it('should success on recover page after writing existing email', async () => {
  //   await waitFor(element(by.id('login-forgot')))
  //     .toBeVisible()
  //     .withTimeout(2000);
  //   await element(by.id('login-forgot')).tap();
  //   await waitFor(element(by.id('recover-submit')))
  //     .toBeVisible()
  //     .withTimeout(3000);
  //   await waitFor(element(by.id('recover-email')))
  //     .toBeVisible()
  //     .withTimeout(2000);
  //   await element(by.id('recover-email')).typeText('zaxovaiko@gmail.com');
  //   await element(by.id('recover-submit')).tap();
  //   await waitFor(element(by.text('Please, check your email')))
  //     .toBeVisible()
  //     .withTimeout(3000);
  // });
});
