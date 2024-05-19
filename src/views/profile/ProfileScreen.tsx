// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {data} from '../../constats/images/index';

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const [username, setUsername] = useState('');
  const [kdOutlet, setKdOutlet] = useState('');
  const [outlet, setOutlet] = useState('');
  const [kota, setKota] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('username').then(value => setUsername(value));
    AsyncStorage.getItem('kd_outlet').then(value => setKdOutlet(value));
    AsyncStorage.getItem('outlet').then(value => setOutlet(value));
    AsyncStorage.getItem('kota').then(value => setKota(value));
    AsyncStorage.getItem('email').then(value => setEmail(value));
    console.log('Mount');
    callAvatar();
    //callAvatar2();
  }, []);

  function callAvatar() {
    const baseURL = 'https://api.sampleapis.com/avatar/info';
    fetch(baseURL)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
      });
  }

  const createTwoButtonAlert = () =>
    Alert.alert('Konfirmasi', 'Yakin anda akan keluar dari aplikasi?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
        AsyncStorage.clear();
        navigation.navigate('Auth');
      }},
    ]);

  const image = {uri: 'https://reactjs.org/logo-og.png'};
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 10, backgroundColor: '#FFFFFF'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{}}>
            <Image
              style={styles.image}
              source={require('../../images/icon_sopir.png')}
            />
          </View>
          <View style={{marginLeft: 10, justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>{username}</Text>
            <Text style={{}}>{email}</Text>
            <Text style={{}}>Outlet {outlet}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          padding: 10,
          marginVertical: 5,
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: 'bold'}}>AKUN</Text>
      </View>

      <View
        style={{
          marginHorizontal: 10,
          padding: 10,
          borderRadius: 5,
          backgroundColor: '#FFFFFF',
        }}>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Image
              style={styles.imageList}
              source={{
                uri: 'https://reactjs.org/logo-og.png',
              }}
            /> */}
            <Icons
                  name="information-outline"
                  color={'black'}
                  size={24}
                />
          </View>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>Tentang Aplikasi</Text>
          </View>
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="arrow-forward-ios"
              color={'#E5E5EA'}
              size={25}
            />
          </View>
        </View>
      </View>

      <View style={styles.button}>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icons
                  name="book-information-variant"
                  color={'black'}
                  size={24}
                />
          </View>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>Buku Panduan</Text>
          </View>
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="arrow-forward-ios"
              color={'#E5E5EA'}
              size={25}
            />
          </View>
        </View>
      </View>

      {/* <View style={{borderBottomWidth:0.6, backgroundColor:'#8E8E93'}}></View> */}

      <View style={styles.button}>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icons
                  name="google-translate"
                  color={'black'}
                  size={24}
                />
          </View>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>Bahasa</Text>
          </View>
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="arrow-forward-ios"
              color={'#E5E5EA'}
              size={25}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          padding: 10,
          marginVertical: 5,
          justifyContent: 'center',
          backgroundColor: '#F5F5F5',
        }}>
        <Text style={{fontWeight: 'bold'}}>MORE</Text>
      </View>

      <TouchableOpacity
        style={{
          marginHorizontal: 10,
          padding: 10,
          borderRadius: 5,
          backgroundColor: '#FFFFFF',
        }}
        onPress={() => navigation.navigate('Printer')}>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icons
                  name="printer"
                  color={'black'}
                  size={24}
                />
          </View>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>Printer</Text>
          </View>
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="arrow-forward-ios"
              color={'#E5E5EA'}
              size={25}
            />
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.button}>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icons
                  name="lock-check-outline"
                  color={'black'}
                  size={24}
                />
          </View>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>Ubah Password</Text>
          </View>
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="arrow-forward-ios"
              color={'#E5E5EA'}
              size={25}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => createTwoButtonAlert()}>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icons
                  name="exit-to-app"
                  color={'black'}
                  size={24}
                />
          </View>
          <View style={{width: '75%', justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>Keluar</Text>
          </View>
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="arrow-forward-ios"
              color={'#E5E5EA'}
              size={25}
            />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    //flex: 1,
    //justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  imageList: {
    //flex: 1,
    //justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  button: {
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
});
