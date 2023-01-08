import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import {
  CustomLayout,
  EmptySearchCard,
  ErrorCard,
  SearchInput,
  Skelton,
  StudentCard,
} from '@components/common';
import { COLORS } from '@assets/theme/theme';

import FirebaseController from '@utils/FirebaseController';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { IGetDocuemtnsParams } from 'types';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export const HomeScreen = () => {
  const { addListener } = useNavigation();

  const firebaseController = useRef(new FirebaseController()).current;

  const [students, setStudents] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);

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
    const unsubscribe = addListener('focus', () => getStudents());

    return unsubscribe;
  }, []);

  const onBooleanChange = (key: keyof typeof booleans, value: boolean) =>
    setBooleans(prevState => ({
      ...prevState,
      [key]: value,
    }));

  const getStudents = async (params?: IGetDocuemtnsParams) => {
    if (params?.isPaginating && booleans.isListEnded) {
      return;
    }

    const lastDoc = params?.isPaginating ? lastDocument : undefined;
    const query = params?.isSearching ? params?.studentName : undefined;
    firebaseController
      .getStudents(query, lastDoc)
      .then(async querySnapshot => {
        // In filteration
        if (!params || params?.isSearching || params?.isRefreshing) {
          setStudents(querySnapshot.docs);
        } else if (params?.isPaginating) {
          // if paginating append the new students to the current students list
          setStudents(prevState => [...prevState, ...querySnapshot.docs]);
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

  const onChangeText = (str: string) => {
    onBooleanChange('isLoading', true);
    getStudents({ studentName: str, isSearching: true });
    setSearchQuery(str);
  };

  const EmptySearch = () => {
    return booleans.isLoading ? <Skelton /> : <EmptySearchCard />;
  };

  const onRefresh = () => {
    onBooleanChange('isRefreshing', true);

    // the settimout is for better user experience in refreshing
    setTimeout(() => {
      setSearchQuery('');
      getStudents().then(() => {
        onBooleanChange('isRefreshing', false);
      });
    }, 1500);
  };

  const renderListFooterComp = () =>
    !booleans.isListEnded && !searchQuery ? (
      <ActivityIndicator
        size="small"
        color={COLORS.primary}
        style={styles.footerLoader}
      />
    ) : null;

  if (loadingError) {
    <ErrorCard>{loadingError}</ErrorCard>;
  }
  return (
    <CustomLayout style={styles.layout}>
      <SearchInput searchQuery={searchQuery} onChangeText={onChangeText} />
      <FlatList
        refreshing={booleans.isRefreshing}
        onRefresh={onRefresh}
        data={students}
        renderItem={({ item }) => (
          <StudentCard
            query={searchQuery}
            student={{ id: item.id, ...item.data() }}
          />
        )}
        ListEmptyComponent={EmptySearch}
        ListFooterComponent={renderListFooterComp}
        onEndReachedThreshold={0.3}
        onEndReached={() => !searchQuery && getStudents({ isPaginating: true })}
      />
    </CustomLayout>
  );
};
