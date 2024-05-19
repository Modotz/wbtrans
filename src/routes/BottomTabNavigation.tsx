

import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from '../views/home/HomeScreen';
import TiketScreen from '../views/tiket/TiketScreen';
import PaketScreen from '../views/paket/PaketScreen';
import profileScreen from '../views/profile/ProfileScreen';

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
        <Tab.Screen name="Tiket" 
        component={TiketScreen} 
        options={{
          tabBarLabel: 'Tiket',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="card-bulleted-outline"
              color={color}
              size={25}
            />
          ),
        }}/>
        <Tab.Screen name="Paket" 
        component={PaketScreen} 
        options={{
          tabBarLabel: 'Paket',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="gift"
              color={color}
              size={25}
            />
          ),
        }}/>
        <Tab.Screen name="Profile" 
        component={profileScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={25}
            />
          ),
        }}/>
        
      </Tab.Navigator>

  );
}
export default BottomTabNavigation;