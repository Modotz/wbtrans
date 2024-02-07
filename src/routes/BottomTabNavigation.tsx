

import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from '../views/home/HomeScreen';
import ReservasiScreen from '../views/reservasi/ReservasiScreen';
import AppsScreen from '../views/apps/AppsScreen';


//const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
import { NavigationContainer } from '@react-navigation/native';

function BottomTabNavigation() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={26}
            />
          ),
        }} />
        <Tab.Screen name="Reservasi" 
        component={ReservasiScreen} 
        options={{
          tabBarLabel: 'Reservasi',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="apps"
              color={color}
              size={25}
            />
          ),
        }}/>
        <Tab.Screen name="Apps" 
        component={AppsScreen} 
        options={{
          tabBarLabel: 'Apps',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={25}
            />
          ),
        }}/>
        {/* <Tab.Screen name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={25}
            />
          ),
        }}/> */}
        
      </Tab.Navigator>

  );
}
export default BottomTabNavigation;