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

const ReservasiScreen = ({ navigation }: {navigation: any}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
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
              marginBottom: 16,
            }}>
            WB Trans
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Penumpang')}>
            <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Penumpang</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Paket')}>
            <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Paket</Text>
          </TouchableOpacity>
          
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          {/* React Native Bottom Navigation */}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          www.wbtrans.com
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default ReservasiScreen;