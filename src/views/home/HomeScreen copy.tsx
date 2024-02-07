// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Card from '../../components/Card';
import { green100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import colors from '../../constants/Colors';

const HomeScreen = ({ navigation }: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card2}>
        <View style={{padding:15, backgroundColor:'red',borderTopLeftRadius:10,borderTopRightRadius:10, justifyContent:'center'}}>
          <Text style={{color: Colors.white, fontSize:18, fontWeight:'600'}}>Reservasi Tiket</Text>
        </View>
        <View style={{padding:15}}>
          <Text style={{fontSize:14, color:Colors.black}}>OUTLET ASAL</Text>
          <Text style={{marginVertical:5,fontSize:18, color:Colors.black}}>DAGO (DGO)</Text>
          <View style={{borderBottomColor:'black', borderWidth:0.6, marginBottom:10}}></View>

          <Text style={{fontSize:14, color:Colors.black}}>OUTLET TUJUAN</Text>
          <Text style={{marginVertical:5,fontSize:18, color:Colors.black}}>CIKARANG (CKR)</Text>
          <View style={{borderBottomColor:'black', borderWidth:0.6, marginBottom:10}}></View>

          <Text style={{fontSize:14, color:Colors.black}}>Tanggal Berangkat</Text>
          <Text style={{marginVertical:5, fontSize:18, color:Colors.black}}>Minggu, 17 September 2023</Text>
          <View style={{borderBottomColor:'black', borderWidth:0.6, marginBottom:10}}></View>
          
          <Text style={{fontSize:14, color:Colors.black}}>Jam Berangkat</Text>
          <Text style={{marginVertical:5, fontSize:18, color:Colors.black}}>17:00</Text>
          <View style={{borderBottomColor:'black', borderWidth:0.6, marginBottom:10}}></View>

          <TouchableOpacity
            style={styles.button}
            onPress={
              () => navigation.navigate('Kursi')
            }>
            <Text style={{color: Colors.white, fontSize:18, fontWeight:'bold'}}>Cari</Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16
            }}>
            You are on Home Screen
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={
              () => navigation.navigate(
                'SettingsStack', { screen: 'Settings' }
              )}>
            <Text>Go to settng Tab</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={
              () => navigation.navigate('Details')
            }>
            <Text>Open Details Screen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={
              () => navigation.navigate('DetailsData')
            }>
            <Text>Open Details Data Screen</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          React Native Bottom Navigation
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    justifyContent:'center'
    //alignItems: 'center', // Centered horizontally
  },
  card: {
    height: 200,
    width: '100%',
    backgroundColor: '#f18484',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
  },
  card2: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 10
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FC4236',
    padding: 10,
    marginTop: 16,
  },
});
export default HomeScreen;