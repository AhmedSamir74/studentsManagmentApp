import React, { useState, useEffect, FC, useRef } from 'react';

import { CustomLayout, Skelton } from '@components/common';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GiftedChat, IChatMessage } from 'react-native-gifted-chat';

import styles from './style';
import FirebaseController from '@utils/FirebaseController';
import { ADMID_STORE_DATA, PREDEFINED_STUDENT_REPLY } from '@utils/constants';
import Toast from 'react-native-toast-message';
import { strings } from '@localization';
import { IStudent } from 'types';
export const ChatRoomScreen: FC = () => {
  const firebaseController = useRef(new FirebaseController()).current;
  const navigation = useNavigation<any>();

  const { params } = useRoute<any>();
  const studentId = params?.studentId;

  const [chatId, setChatId] = useState<string>('');
  const [student, setStudent] = useState<IStudent>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [messages, setMessages] = useState<IChatMessage[]>([]);

  const getStudentData = async () => {
    try {
      const response = await firebaseController.getStudentData(studentId);
      setStudent(response.data());
      navigation.setParams({
        studentName: response.data()?.lastName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const initializeChat = async () => {
    // check if there is a chat between admin and this student
    try {
      const studentChat = await firebaseController.getStudentChat(studentId);

      if (studentChat.empty) {
        // create chat room
        const response = await firebaseController.addChatRoom({
          studentId: studentId,
          studentImage: student?.image,
          studentName: student?.lastName,
          class: student?.class,
          rollNumber: student?.rollNumber,
          createdAt: new Date().getTime().toString(),
          updatedAt: new Date().getTime().toString(),
          lastMessage: '',
        });
        setChatId(response.id);
      } else {
        // get chat messages
        const chatMessages = await firebaseController.getChatMessages(
          studentChat.docs[0]?.id,
        );
        const mappedMessaged = chatMessages.docs.map(item => {
          const {
            text,
            createdAt,
            sender: { id, name, image },
          } = item.data();

          return {
            _id: item.id,
            text: text,
            createdAt: new Date(parseInt(createdAt, 10)),
            user: {
              _id: `${id}`,
              name: name,
              avatar: image,
            },
          };
        });

        setChatId(studentChat.docs[0].id);
        setMessages(mappedMessaged);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addMessageToServer = async (
    msg: string,
    sender?: typeof ADMID_STORE_DATA,
  ) => {
    try {
      await firebaseController.addChatMessage({
        chatId,
        text: msg,
        createdAt: new Date().getTime().toString(),
        sender: sender?.id ? sender : ADMID_STORE_DATA,
      });
      firebaseController.updateChat(chatId, {
        updatedAt: new Date().getTime().toString(),
        lastMessage: msg,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: strings('error'),
        text2: strings('failedToSendMsg'),
      });
      console.error(error);
      setMessages(prevState => [...prevState.slice(0, -1)]);
    }
  };

  const onSend = (msgs: IChatMessage[] = []) => {
    addMessageToServer(msgs[0].text);
    setMessages(previousMessages => GiftedChat.append(previousMessages, msgs));
  };

  const sendAutoReply = () => {
    addMessageToServer(PREDEFINED_STUDENT_REPLY, {
      id: studentId,
      name: `${student?.firstName} ${student?.lastName}`,
      image: student?.image || ADMID_STORE_DATA.image,
    });
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [
        {
          text: PREDEFINED_STUDENT_REPLY,
          _id: studentId,
          createdAt: new Date(),
          user: {
            _id: studentId,
          },
        },
      ]),
    );
  };

  useEffect(() => {
    getStudentData();
  }, []);

  useEffect(() => {
    if (messages?.length === 1) {
      sendAutoReply();
    }
  }, [messages]);

  useEffect(() => {
    if (student) {
      initializeChat();
    }
  }, [student]);
  return (
    <CustomLayout style={styles.layout}>
      {isLoading ? (
        <Skelton type="chat" />
      ) : (
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: ADMID_STORE_DATA.id,
          }}
        />
      )}
    </CustomLayout>
  );
};
