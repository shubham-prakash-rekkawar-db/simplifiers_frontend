import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../constants/theme';
import {View, Text} from 'react-native';
import HomeStackNavigator from './HomeStackNavigation';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "rgba(255,255,255,0.5)",
        tabBarShowLabel: false,
        tabBarIconStyle: {
          margin: 8
        },
        tabBarItemStyle: {
          padding: 8
        },
        tabBarStyle: [
          {
            display: 'flex'
          },
          null
        ]
      }}
      >
      <Tab.Screen name="Home" component={HomeStackNavigator} options={()=>({
                tabBarIcon:
                ({focused, color, size})=>(
                  <Feather name="home" size={size} color={color} />
                )
            })}/>
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});