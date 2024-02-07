import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
export default function Legent() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 5}}>
        <View style={styles.kolom}>
          <View style={styles.kolomImage}>
            <Image
              style={{width: 20, height: 25, resizeMode: 'stretch'}}
              source={require('../images/kursi_kosong.gif')}></Image>
            <Text style={{fontSize: 10}}>Kursi Kosong</Text>
          </View>
          <View style={styles.kolomImage}>
            <Image
              style={{width: 20, height: 25, resizeMode: 'stretch'}}
              source={require('../images/kursi_pesan.gif')}></Image>
            <View style={styles.textImage}>
              <Text style={{fontSize: 10}}>Kursi</Text>
              <Text style={{fontSize: 10}}>Booked</Text>
            </View>
          </View>
          <View style={styles.kolomImage}>
            <Image
              style={{width: 20, height: 25, resizeMode: 'stretch'}}
              source={require('../images/kursi_pesan1.gif')}></Image>
            <View style={styles.textImage}>
              <Text style={{fontSize: 10}}>Booked</Text>
              <Text style={{fontSize: 10}}>Transit</Text>
            </View>
          </View>
          <View style={styles.kolomImage}>
            <Image
              style={styles.image}
              source={require('../images/kursi_konfirm.gif')}>
            </Image>
            <View style={styles.textImage}>
              <Text style={{fontSize: 10}}>Sudah</Text>
              <Text style={{fontSize: 10}}>Bayar</Text>
            </View>
          </View>
        </View>

        <View style={styles.kolom}>
          <View style={styles.kolomImage}>
            <Image
              style={{width: 20, height: 25, resizeMode: 'stretch'}}
              source={require('../images/kursi_jamak.gif')}></Image>
            <View style={styles.textImage}>
              <Text style={{fontSize: 10}}>Kursi</Text>
              <Text style={{fontSize: 10}}>Multiple</Text>
            </View>
          </View>
          <View style={styles.kolomImage}>
            <Image
              style={{width: 20, height: 25, resizeMode: 'stretch'}}
              source={require('../images/kursi_konfirm1.gif')}></Image>
            <View style={styles.textImage}>
              <Text style={{fontSize: 10}}>Bayar</Text>
              <Text style={{fontSize: 10}}>Transit</Text>
            </View>
          </View>
          <View style={styles.kolomImage}>
            <Image
              style={{width: 20, height: 25, resizeMode: 'stretch'}}
              source={require('../images/kursi_pesan1.gif')}></Image>
            <View style={styles.textImage}>
              <Text style={{fontSize: 10}}>Booked</Text>
              <Text style={{fontSize: 10}}>Transit</Text>
            </View>
          </View>
          <View style={styles.kolomImage}>
            <Image
              style={styles.image}
              source={require('../images/kursi_konfirm.gif')}>
            </Image>
            <View style={styles.textImage}>
              <Text style={{fontSize: 10}}>Sudah</Text>
              <Text style={{fontSize: 10}}>Bayar</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kolom: {
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  kolomImage: {
    width:50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image:{
    width: 20, 
    height: 25, 
    resizeMode: 'stretch'
  },
  textImage: {
    flexDirection:'column',
  },
});
