import React from 'react';
import { create } from 'react-test-renderer';
import { StudentCard } from '@components/common/StudentCard/StudentCard';
import { strings } from '@localization';

describe('Student Card test', () => {
  const student = {
    id: 'nNe07jKI0pDV74hJEUc3',
    class: 'B2',
    firstName: 'Ahmed',
    image:
      'https://www.shutterstock.com/image-photo/casually-handsome-confident-young-man-260nw-439433326.jpg',
    isEnabled: true,
    lastName: 'Ahmed',
    rollNumber: '2',
  };
  const element = create(<StudentCard student={student} query="" />);
  test('should render Chat Card successfully', () => {
    expect(element).toBeTruthy();
  });

  test('should show student name successfully', () => {
    const nameElement = element.root.findByProps({ testID: 'studentName' });
    expect(nameElement.props.children.props.textToHighlight).toBe(
      student.firstName + ' ' + student.lastName,
    );
  });

  test('should show class and roll number successfully', () => {
    const callAndRollElement = element.root.findByProps({
      testID: 'callAndRollNumber',
    });
    expect(callAndRollElement.props.children).toStrictEqual([
      strings('class'),
      ': ',
      student.class,
      '\n',
      strings('rollNumber'),
      ': ',
      student.rollNumber,
    ]);
  });

  test('should show chat image successfully', () => {
    const chatImageElement = element.root.findByProps({ testID: 'cardImage' });
    expect(chatImageElement.props.source).toStrictEqual({
      uri: student?.image,
      priority: 'normal',
    });
  });

  test("should hide disabled Label when student's isEnabled attribute = true ", () => {
    const disabledLabel = element.root.findAllByProps({
      testID: 'disabledView',
    });
    expect(disabledLabel).toHaveLength(0);
  });

  test("should show disabled Label when student's isEnabled attribute = false ", () => {
    element.update(
      <StudentCard student={{ ...student, isEnabled: false }} query="" />,
    );
    const disabledLabel = element.root.findByProps({
      testID: 'disabledView',
    });
    expect(disabledLabel).toBeDefined();
  });
});
