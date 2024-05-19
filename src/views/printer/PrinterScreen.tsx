import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    USBPrinter,
    NetPrinter,
    BLEPrinter,
} from "react-native-thermal-receipt-printer";

import {
    BluetoothManager,
    BluetoothEscposPrinter,
    BluetoothTscPrinter,
    ALIGN,
  } from "tp-react-native-bluetooth-printer";

import ItemList from '../../components/ItemList';

const PrinterScreen = ({ navigation }: {navigation: any}) => {
  
    // Sumber
    // https://www.npmjs.com/package/tp-react-native-bluetooth-printer?activeTab=readme

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [printers, setPrinters] = useState([]);
  const [currentPrinter, setCurrentPrinter] = useState();

  useEffect(() => {
    BLEPrinter.init().then(()=> {
      BLEPrinter.getDeviceList().then(setPrinters);
    });

  }, []);

  const getList = () =>{
    
  }

  const connect = (printer) => {
    
    // let conStatus = BLEPrinter.connectPrinter(printer.inner_mac_address);
    // if(conStatus){
    //     console.log('Connected to :',printer.inner_mac_address);
    //     setCurrentPrinter(printer.inner_mac_address);
    // }else{
    //     error => console.warn(error);
    // }
    AsyncStorage.setItem('bleMac', printer.inner_mac_address);
    console.log('Connected to :',printer.inner_mac_address);
    BluetoothManager.connect(printer.inner_mac_address) // the device address scanned.
    Alert.alert('Info', 'Perangkat terhubung =' + printer.inner_mac_address, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const printText = async (text, height = 0, width = 0) => {
    return await BluetoothEscposPrinter.printText(text, {
      encoding: "GBK", 
      codepage: 0, // This is Turkish codepage. If you want to print English characters, you don't need to set this option.
      fonttype: 0, // This is default font type.
      widthtimes: width, // Text width times
      heigthtimes: height, // Text heigth time
    });
  };
  
  const printTextTest = async () => {
    let base64Image = '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'
    console.log('Cetak Tiket');
    await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER);
    await BluetoothEscposPrinter.setBold(1);
    await printText("WBTRANS\n\r",0,1);
    await BluetoothEscposPrinter.printPic(base64Image, {width:150, left:110});
    await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER);
    await printText("\n\r",0,0);
    await printText("0818 826 288\n\r",0,0);
    await BluetoothEscposPrinter.printText("--------------------------------\n\r",{});
    await BluetoothEscposPrinter.setBold(1);
    await BluetoothEscposPrinter.printText("TIKET\n\r", {});
    await BluetoothEscposPrinter.printText("TIKET WB TRANS\n\r", {});
    await BluetoothEscposPrinter.setBold(0);
    await BluetoothEscposPrinter.printText("--------------------------------\n\r",{});
    await BluetoothEscposPrinter.printText("\n\r\n\r\n\r", {});
  }

 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.car}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              marginBottom: 5,
            }}>
            Bluetooth List
          </Text>

          <View style={{}}>
          {printers.map((item, index) => {
            return (
              <ItemList
                key={index}
                onPress={() => connect(item)}
                label={item.device_name}
                value={item.inner_mac_address}
                connected={item.address === item.inner_mac_address}
                actionText="Hubungkan"
                color="red"
              />
            );
          })}
        </View>
          
          <TouchableOpacity
            style={styles.button}
            onPress={
              () => printTextTest()
            }>
            <Text style={{color: Colors.white, fontSize:18, fontWeight:'bold'}}>Test Print</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    //backgroundColor: 'pink',
  },
  jadwal: {
    backgroundColor: '#E21818',
    padding: 10,
  },
  car: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    //alignItems: 'center',
  },
  searchSection: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#E21818',
    padding: 10,
    marginTop: 16,
  },
});
export default PrinterScreen;
