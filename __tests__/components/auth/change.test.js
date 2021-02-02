import React from 'react';
import renderer from 'react-test-renderer';
import Change from '../../../components/auth/password/Change';

jest.useFakeTimers();
jest.mock('react-router-native', () => ({
  useHistory: () => ({
    path: jest.fn(),
    push: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock('@react-native-firebase/auth', () => ({
  auth: jest.fn(),
}));

test('should renders correctly', async () => {
  const tree = renderer.create(<Change />).toJSON();
  expect(tree).toMatchSnapshot();
});
