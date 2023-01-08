import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import {
  ChatCard,
  CustomLayout,
  EmptySearchCard,
  ErrorCard,
  SearchInput,
  Skelton,
} from '@components/common';
import { COLORS } from '@assets/theme/theme';
import throttle from 'lodash.throttle';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import FirebaseController from '@utils/FirebaseController';
import { IGetDocuemtnsParams } from 'types';

import styles from './styles';

export const ChatsListScreen = () => {
  const firebaseController = useRef(new FirebaseController()).current;

  const [chats, setChats] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);
  const [lastDocument, setLastDocument] =
    useState<FirebaseFirestoreTypes.DocumentData>();

  const [booleans, setBooleans] = useState({
    isLoading: true,
    isRefreshing: false,
    isListEnded: false,
  });

  const [loadingError, setLoadingError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getChats();
  }, []);

  const onBooleanChange = (key: keyof typeof booleans, value: boolean) =>
    setBooleans(prevState => ({
      ...prevState,
      [key]: value,
    }));

  const getChats = async (params?: IGetDocuemtnsParams) => {
    if (booleans.isListEnded) {
      return;
    }

    const lastDoc = params?.isPaginating ? lastDocument : undefined;
    const query = params?.isSearching ? params?.studentName : undefined;

    firebaseController
      .getChats(query, lastDoc)
      .then(async querySnapshot => {
        // In filteration
        if (!params || params?.isSearching || params?.isRefreshing) {
          setChats(querySnapshot.docs);
        } else if (params?.isPaginating) {
          // if paginating append the new students to the current students list
          setChats(prevState => [...prevState, ...querySnapshot.docs]);
        }
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        // for hiding the spiner under the list
        onBooleanChange('isListEnded', !querySnapshot.docs.length);
      })
      .catch(error => {
        setLoadingError("Can't Load data, Please try again");
        return error;
      })
      .finally(() => {
        onBooleanChange('isLoading', false);
      });
  };

  const delayedQuery = throttle(q => {
    getChats({ studentName: q, isSearching: true });
  }, 1000);

  const onChangeText = (str: string) => {
    onBooleanChange('isLoading', true);

    delayedQuery(str);
    setSearchQuery(str);
  };

  const EmptySearch = () => {
    return booleans.isLoading ? <Skelton /> : <EmptySearchCard />;
  };

  if (loadingError) {
    <ErrorCard>{loadingError}</ErrorCard>;
  }

  const onRefresh = () => {
    onBooleanChange('isRefreshing', true);

    // the settimout is for better user experience in refreshing
    setTimeout(() => {
      setSearchQuery('');
      getChats().then(() => {
        onBooleanChange('isRefreshing', false);
      });
    }, 1500);
  };

  const renderListFooterComp = () =>
    !booleans.isListEnded && !searchQuery && chats.length >= 6 ? (
      <ActivityIndicator
        size="small"
        color={COLORS.primary}
        style={styles.footerLoader}
      />
    ) : null;

  return (
    <CustomLayout style={styles.layout}>
      <SearchInput searchQuery={searchQuery} onChangeText={onChangeText} />

      <FlatList
        refreshing={booleans.isRefreshing}
        onRefresh={onRefresh}
        data={chats}
        renderItem={({ item }) => (
          <ChatCard
            query={searchQuery}
            chat={{ id: item.id, ...item.data() }}
          />
        )}
        ListEmptyComponent={EmptySearch}
        ListFooterComponent={renderListFooterComp}
        onEndReachedThreshold={0.3}
        onEndReached={() =>
          chats.length >= 6 && getChats({ isPaginating: true })
        }
      />
    </CustomLayout>
  );
};
