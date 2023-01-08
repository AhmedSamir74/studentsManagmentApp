import React from 'react';
import { create } from 'react-test-renderer';
import { ChatCard } from '@components/common/ChatCard/ChatCard';
import moment from 'moment';

describe('Chat Card test', () => {
  const chat = {
    id: 'JDQWPLjr05ZCTM5IC9J1',
    class: 'A1',
    createdAt: '1673191775647',
    lastMessage:
      'I am currently out of the office and probably out-of-my-mind drunk.  Enjoy your workweek',
    rollNumber: '14',
    studentId: 'Xh2kWN1cBP9OY39jWaPV',
    studentImage:
      'https://www.shutterstock.com/image-photo/casually-handsome-confident-young-man-260nw-439433326.jpg',
    studentName: 'Ahmed',
    updatedAt: '1673191786644',
  };
  const element = create(<ChatCard chat={chat} query="" />);
  test('should render Chat Card successfully', () => {
    expect(element).toBeTruthy();
  });

  test('should show student name successfully', () => {
    const nameElement = element.root.findByProps({ testID: 'studentName' });
    expect(nameElement.props.children.props.textToHighlight).toBe(
      chat.studentName,
    );
  });

  test('should show chat time successfully', () => {
    const chatTimeElement = element.root.findByProps({ testID: 'updatedAt' });
    expect(chatTimeElement.props.children).toBe(
      moment(parseInt(chat.updatedAt, 10)).format('hh:mm A'),
    );
  });

  test('should show chat image successfully', () => {
    const chatImageElement = element.root.findByProps({ testID: 'chatImage' });
    expect(chatImageElement.props.source).toStrictEqual({
      uri: chat?.studentImage,
      priority: 'normal',
    });
  });
});
