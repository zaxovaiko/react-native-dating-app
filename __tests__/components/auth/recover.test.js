import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Recover from '../../../components/auth/password/Recover';

jest.useFakeTimers();
jest.mock('react-router-native', () => ({
  ...jest.requireActual('react-router-native'),
  useHistory: () => ({
    path: jest.fn(),
    push: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock('../../../api/user', () => ({
  createUser: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => ({
  auth: jest.fn(),
}));

describe('Recover component', () => {
  Enzyme.configure({adapter: new Adapter()});
  const wrapper = Enzyme.shallow(<Recover />);
  test('should renders correctly', async () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should contains email caption', () => {
    expect(
      wrapper.findWhere((node) => node.prop('testID') === 'recover-caption'),
    ).toExist();
  });
});
