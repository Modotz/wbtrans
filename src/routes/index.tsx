import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './BottomTabNavigation';
import { Details, Kursi,  DetailsData, DetailPenumpang, NewTiket,Tiket, 
    Paket, CetakTiket,CetakTiket2,CetakTiket3 } from '../views';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator screenOptions={{}} >
            <Stack.Screen name="HomePage" options={{headerShown: false}} component={BottomTabNavigation} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Kursi"  component={Kursi} />
            <Stack.Screen name="DetailsData" component={DetailsData} />
            <Stack.Screen name="DetailPenumpang" component={DetailPenumpang} />
            <Stack.Screen name="Tiket" options={{ 
                title: 'Reservasi Penumpang',
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} component={Tiket} />
            <Stack.Screen name="NewTiket" options={{ 
                title: 'Reservasi Penumpang',
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} component={NewTiket} />
            <Stack.Screen name="Paket"  options={{ 
                title: 'Reservasi Paket',
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} component={Paket} />
            <Stack.Screen name="CetakTiket" options={{ 
                title: 'Cetak Tiket V1',
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} component={CetakTiket} />
            <Stack.Screen name="CetakTiket2" options={{ 
                title: 'Cetak Tiket V2',
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} component={CetakTiket2} />
            <Stack.Screen name="CetakTiket3" options={{ 
                title: 'Cetak Tiket V3',
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} component={CetakTiket3} />
        </Stack.Navigator>
    );
}


export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}