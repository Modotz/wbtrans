import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

import BottomTabNavigation from './BottomTabNavigation';
import {
  Details,
  Kursi,
  DetailsData,
  DetailPenumpang,
  EditPenumpang,
  Tiket,
  Paket,
  CetakTiket,
  CetakTiket2,
  Printer,
  Manifest
} from '../views';

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="HomePage"
        options={{headerShown: false}}
        component={BottomTabNavigation}
      />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Kursi" component={Kursi} />
      <Stack.Screen name="DetailsData" component={DetailsData} />
      {/* <Stack.Screen name="DetailPenumpang" component={DetailPenumpang} /> */}
      <Stack.Screen
        name="DetailPenumpang"
        options={{
          title: 'Detail Penumpang',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={DetailPenumpang}
      />
      <Stack.Screen
        name="EditPenumpang"
        options={{
          title: 'Edit Penumpang',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={EditPenumpang}
      />
      <Stack.Screen
        name="Tiket"
        options={{
          title: 'Reservasi Penumpang',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={Tiket}
      />
      
      <Stack.Screen
        name="Paket"
        options={{
          title: 'Reservasi Paket',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={Paket}
      />
      <Stack.Screen
        name="CetakTiket"
        options={{
          title: 'Cetak Tiket V1',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={CetakTiket}
      />
      <Stack.Screen
        name="CetakTiket2"
        options={{
          title: 'Cetak Tiket V2',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={CetakTiket2}
      />
      <Stack.Screen
        name="Printer"
        options={{
          title: 'Bluetooth List',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={Printer}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="BottomTabNavigationRoutes"
          component={BottomTabNavigation}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailPenumpang"
          options={{
            title: 'Detail Penumpang',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={DetailPenumpang}
        />
        <Stack.Screen
          name="EditPenumpang"
          options={{
            title: 'Edit Penumpang',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={EditPenumpang}
        />
        <Stack.Screen
          name="Tiket"
          options={{
            title: 'Reservasi Penumpang',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={Tiket}
        />
        <Stack.Screen
          name="Paket"
          options={{
            title: 'Reservasi Paket',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={Paket}
        />
        <Stack.Screen
          name="CetakTiket"
          options={{
            title: 'Cetak Tiket V1',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={CetakTiket}
        />
        <Stack.Screen
          name="CetakTiket2"
          options={{
            title: 'Cetak Tiket V2',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={CetakTiket2}
        />
        <Stack.Screen
          name="Printer"
          options={{
            title: 'Bluetooth',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={Printer}
        />
        <Stack.Screen
          name="Manifest"
          options={{
            title: 'Manifest',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={Manifest}
        />
      </Stack.Navigator>
      {/* <MyStack /> */}
    </NavigationContainer>
  );
}
