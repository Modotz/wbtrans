// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import React, { useEffect, useState } from 'react'
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
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import {data} from '../../constats/images/index';

const ProfileScreen = () => {
  useEffect(()=>{
    console.log('Mount');
    //callAvatar();
    callAvatar2();
  },[]);

  function callAvatar(){
    const baseURL = 'https://api.sampleapis.com/avatar/info';
    fetch(baseURL)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
      });

  }

  function callAvatar2(){
    const baseURL = 'https://api.sampleapis.com/avatar/info';
    axios.get(baseURL, {
      
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const image = {uri: 'https://reactjs.org/logo-og.png'};
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 10, backgroundColor: '#FFFFFF'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{}}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://reactjs.org/logo-og.png',
              }}
            />
          </View>
          <View style={{marginLeft: 10, justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>Darrell Schmeler</Text>
            <Text style={{}}>elsie-goodman@gmail.com</Text>
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
        <Text style={{fontWeight: 'bold'}}>ACCOUNT</Text>
      </View>

      <View style={{padding: 10, backgroundColor: '#FFFFFF'}}>
        <View
          style={{
            height:50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={styles.imageList}
              source={{
                uri: 'https://reactjs.org/logo-og.png',
              }}
            />
          </View>
          <View
            style={{width: '75%',  justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>About US</Text>
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

      <View style={{borderBottomWidth:0.6, backgroundColor:'#8E8E93'}}></View>

      <View style={{padding: 10, backgroundColor: '#FFFFFF'}}>
        <View
          style={{
            height:50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={styles.imageList}
              source={{
                uri: 'https://reactjs.org/logo-og.png',
              }}
            />
          </View>
          <View
            style={{width: '75%',  justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>Location</Text>
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
      
      <View style={{borderBottomWidth:0.6, backgroundColor:'#8E8E93'}}></View>

      <View style={{padding: 10, backgroundColor: '#FFFFFF'}}>
        <View
          style={{
            height:50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={styles.imageList}
              source={{
                uri: 'https://reactjs.org/logo-og.png',
              }}
            />
          </View>
          <View
            style={{width: '75%',  justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>Currency</Text>
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

      <View style={{borderBottomWidth:0.6, backgroundColor:'#8E8E93'}}></View>

      <View style={{padding: 10, backgroundColor: '#FFFFFF'}}>
        <View
          style={{
            height:50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={styles.imageList}
              source={{
                uri: 'https://reactjs.org/logo-og.png',
              }}
            />
          </View>
          <View
            style={{width: '75%',  justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>Language</Text>
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
      
      <View style={{padding: 10, backgroundColor: '#FFFFFF'}}>
        <View
          style={{
            height:50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={styles.imageList}
              source={{
                uri: 'https://reactjs.org/logo-og.png',
              }}
            />
          </View>
          <View
            style={{width: '75%',  justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>Change Password</Text>
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

      <View style={{borderBottomWidth:0.6, backgroundColor:'#8E8E93'}}></View>

      <View style={{padding: 10, backgroundColor: '#FFFFFF'}}>
        <View
          style={{
            height:50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={styles.imageList}
              source={{
                uri: 'https://reactjs.org/logo-og.png',
              }}
            />
          </View>
          <View
            style={{width: '75%',  justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>Log Out</Text>
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

      <View style={{borderBottomWidth:0.6, backgroundColor:'#8E8E93'}}></View>
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
});
