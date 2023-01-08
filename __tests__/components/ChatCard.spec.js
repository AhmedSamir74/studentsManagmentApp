import { ChatCard } from '@components/common/ChatCard/ChatCard';
import React from 'react';
import { create } from 'react-test-renderer';

describe('Testing Student Card', () => {
  const mockedNavigate = jest.fn();

  const student = {
    class: 'B2',
    firstName: 'Ahmed',
    image:
      'https://www.shutterstock.com/image-photo/casually-handsome-confident-young-man-260nw-439433326.jpg',
    isEnabled: true,
    lastName: 'Ahmed',
    rollNumber: '2',
  };
  test('should render student card successfully', () => {
    jest.mock('@react-navigation/native', () => ({
      ...jest.requireActual('@react-navigation/native'),
      useNavigation: () => {
        return mockedNavigate;
      },
    }));
    const element = create(<ChatCard chat={student} query="" />).root
      .children[0];
    expect(element).toBeTruthy();
  });
});
