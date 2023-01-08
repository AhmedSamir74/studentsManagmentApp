import React from 'react';
import {
  LoadingScreen,
  StudentDetailsScreen,
  OnBoarding,
  ChatRoomScreen,
} from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import { strings } from '../localization';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '@assets/theme/theme';
import { StyleSheet } from 'react-native';
import { shareApp } from '@utils/links';
const StackNavigator = createStackNavigator();

const MainNavigation = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Loading"
        component={LoadingScreen}
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        name="MainNavigator"
        component={MainTabNavigator}
        options={{
          title: strings('studentsManagmentApp'),
          headerRight: () => (
            <MaterialCommunityIcons
              name="share-variant"
              color={theme.colors.lightBlue}
              size={25}
              style={styles.shareIcon}
              onPress={shareApp}
            />
          ),
          headerLeft: () => null,
        }}
      />
      <StackNavigator.Screen
        name="StudentDetails"
        component={StudentDetailsScreen}
        options={{
          headerBackTitle: '',
          title: strings('studentDetails'),
        }}
      />
      <StackNavigator.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route: { params } }: any) => {
          const { studentName }: { studentName: string } = params;
          return {
            headerBackTitle: '',
            title: studentName || strings('chatRoom'),
          };
        }}
      />
    </StackNavigator.Navigator>
  );
};
const styles = StyleSheet.create({
  shareIcon: { marginEnd: 15 },
});
export default MainNavigation;
