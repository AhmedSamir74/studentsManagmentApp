import firestore from '@react-native-firebase/firestore';
import { IChat, IStoreMessage, IStudent } from 'types';
import Config from 'react-native-config';

const STUDENTS_COLLECTION_NAME = Config.STUDENTS_COLLECTION_NAME || '';
const CHATS_COLLECTION_NAME = Config.CHATS_COLLECTION_NAME || '';
const MESSAGES_COLLECTION_NAME = Config.MESSAGES_COLLECTION_NAME || '';

class FirebaseController {
  constructor() {
    firestore().settings({ persistence: true });
  }
  private addDocument(collection: string, document: any) {
    return firestore().collection(collection).add(document);
  }

  private updateDocument(collection: string, document: any, attribute: any) {
    return firestore().collection(collection).doc(document).update(attribute);
  }

  private removeDocument(collectionName: string, id: string) {
    return firestore().collection(collectionName).doc(id).delete();
  }

  private getDocument(collection: string, documentID: string) {
    return firestore().collection(collection).doc(documentID).get();
  }

  filterDocuments(
    collection: string,
    filterAttribute: string,
    filterValue: any,
  ) {
    return firestore()
      .collection(collection)
      .orderBy(filterAttribute)
      .startAt(filterValue)
      .endAt(filterValue + '\uf8ff')
      .limit(20)
      .get();
  }

  getCollectionData({
    collectionName,
    orderBy,
    startAfter,
  }: {
    collectionName: string;
    orderBy?: { name: string; value: 'asc' | 'desc' };
    startAfter?: unknown;
  }) {
    const collectionRef = firestore().collection(collectionName).limit(20);
    if (orderBy?.name) {
      const reftOrderBy = collectionRef.orderBy(orderBy.name, orderBy.value);
      if (startAfter) {
        return reftOrderBy.startAfter(startAfter).get();
      }
      return reftOrderBy.get();
    } else {
      return collectionRef.get();
    }
  }

  onCollectionChange(collectionName: string, callBack: any) {
    return firestore()
      .collection(collectionName)
      .onSnapshot(
        QuerySnapshot => {
          callBack(QuerySnapshot.docs);
        },
        error => {
          console.error(error);
        },
      );
  }

  onCollectionChangeByCondition(
    collectionName: string,
    filterAttribute: string,
    filterValue: any,
    callBack: any,
  ) {
    return firestore()
      .collection(collectionName)
      .where(filterAttribute, '==', filterValue)
      .onSnapshot(
        QuerySnapshot => {
          callBack(QuerySnapshot.docs);
        },
        error => {
          console.error('==>', error);
        },
      );
  }

  /** STUDENTS **/
  addStudent(student: IStudent) {
    return this.addDocument(STUDENTS_COLLECTION_NAME, student);
  }

  updateStudent(studentId: string, student: IStudent) {
    return this.updateDocument(STUDENTS_COLLECTION_NAME, studentId, student);
  }

  getStudents(studentName?: string, startAfter?: unknown) {
    if (studentName) {
      return this.getStudentsByName(studentName);
    } else {
      return this.getCollectionData({
        collectionName: STUDENTS_COLLECTION_NAME,
        orderBy: {
          name: 'firstName',
          value: 'asc',
        },
        startAfter,
      });
    }
  }

  getStudentsByName(name: string) {
    return this.filterDocuments(STUDENTS_COLLECTION_NAME, 'firstName', name);
  }

  getStudentData(studentId: string) {
    return this.getDocument(STUDENTS_COLLECTION_NAME, studentId);
  }

  // CHATS

  getChatsByName(name: string) {
    return this.filterDocuments(CHATS_COLLECTION_NAME, 'studentName', name);
  }

  getStudentChat(studentId: string) {
    return firestore()
      .collection(CHATS_COLLECTION_NAME)
      .where('studentId', '==', studentId)
      .get();
  }

  getChatMessages(chatId: string) {
    return firestore()
      .collection(MESSAGES_COLLECTION_NAME)
      .orderBy('createdAt', 'desc')
      .where('chatId', '==', chatId)
      .get();
  }

  getChats(studentName?: string, startAfter?: unknown) {
    if (studentName) {
      return this.getChatsByName(studentName);
    } else {
      return this.getCollectionData({
        collectionName: CHATS_COLLECTION_NAME,
        orderBy: {
          name: 'updatedAt',
          value: 'desc',
        },
        startAfter,
      });
    }
  }

  addChatRoom(chat: IChat) {
    return this.addDocument(CHATS_COLLECTION_NAME, chat);
  }

  updateChat(studentId: string, chat: IChat) {
    return this.updateDocument(CHATS_COLLECTION_NAME, studentId, chat);
  }

  // MESSAGES
  addChatMessage(message: IStoreMessage) {
    return this.addDocument(MESSAGES_COLLECTION_NAME, message);
  }
}

export default FirebaseController;
