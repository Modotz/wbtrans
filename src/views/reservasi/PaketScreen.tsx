import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  USBPrinter,
  NetPrinter,
  BLEPrinter,
} from "react-native-thermal-receipt-printer";

import ThermalPrinterModule from 'react-native-thermal-printer';

// ThermalPrinterModule.defaultConfig = {
//   ...ThermalPrinterModule.defaultConfig,
//   ip: '192.168.100.246',
//   port: 9100,
//   timeout: 30000,
// };

const PaketScreen = ({ navigation }: {navigation: any}) => {
  const [text, setText] = React.useState('');
  const [printers, setPrinters] = useState([]);
  const [currentPrinter, setCurrentPrinter] = useState();

  useEffect(() => {
    // BLEPrinter.init().then(()=> {
    //   BLEPrinter.getDeviceList().then(setPrinters);
    // });
    //setCurrentPrinter("0F:02:18:41:40:3B");
    //connectPrinter("0F:02:18:41:40:3B");

    
    
  }, []);

  const _connectPrinter = (printer) => {
    //connect printer
    BLEPrinter.connectPrinter(printer.inner_mac_address).then(
      setCurrentPrinter(printer.inner_mac_address),
      error => console.warn(error))
  }

  const connectPrinter = (inner_mac_address) => {
    //connect printer
    BLEPrinter.connectPrinter(inner_mac_address).then(
      console.log('Connected'),
      error => console.warn(error))
  }

  const printTextTest = () => {
    currentPrinter && BLEPrinter.printText("<C>sample text</C>\n");
  }

  const printBillTest = async () => {
    //currentPrinter && BLEPrinter.printBill("<C>WB TRANS CETAK TIKET</C>");
    try {
      console.log('We will invoke the native module here!');
      await ThermalPrinterModule.printBluetooth({ payload: state.text });

      //
      // bluetooth
      // await ThermalPrinterModule.printBluetooth({ payload: state.text });
      //

      console.log('done printing');
    } catch (err) {
      //error handling
      console.log(err.message);
    }

    // try {
    //   await ThermalPrinterModule.printBluetooth({
    //     payload: 'hello world',
    //     printerNbrCharactersPerLine: 38,
    //   });
    // } catch (err) {
    //   //error handling
    //   console.log(err.message);
    // }
  }

  const [state, setState] = useState({
    text:
      '[C]<img>https://via.placeholder.com/300.jpg</img>\n' +
      '[L]\n' +
      "[C]<u><font size='big'>ORDER N°045</font></u>\n" +
      '[L]\n' +
      '[C]================================\n' +
      '[L]\n' +
      '[L]<b>BEAUTIFUL SHIRT</b>[R]9.99e\n' +
      '[L]  + Size : S\n' +
      '[L]\n' +
      '[L]<b>AWESOME HAT</b>[R]24.99e\n' +
      '[L]  + Size : 57/58\n' +
      '[L]\n' +
      '[C]--------------------------------\n' +
      '[R]TOTAL PRICE :[R]34.98e\n' +
      '[R]TAX :[R]4.23e\n' +
      '[L]\n' +
      '[C]================================\n' +
      '[L]\n' +
      "[L]<font size='tall'>Customer :</font>\n" +
      '[L]Raymond DUPONT\n' +
      '[L]5 rue des girafes\n' +
      '[L]31547 PERPETES\n' +
      '[L]Tel : +33801201456\n' +
      '[L]\n' +
      "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
      "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>",
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.jadwal}>
        <Text
          style={{
            marginBottom: 10,
            color: Colors.white,
            fontSize: 18,
            fontWeight: '600',
          }}>
          Minggu, 17 September 2023
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: Colors.white, fontSize: 14}}>OUTLET ASAL</Text>
            <Text
              style={{color: Colors.white, fontSize: 18, fontWeight: '600'}}>
              DGO
            </Text>
            <Text style={{color: Colors.white, fontSize: 11}}>DAGO</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: Colors.white, fontSize: 14}}>
              OUTLET TUJUAN
            </Text>
            <Text
              style={{color: Colors.white, fontSize: 18, fontWeight: '600'}}>
              CKR
            </Text>
            <Text style={{color: Colors.white, fontSize: 11}}>CIKARANG</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: Colors.white, fontSize: 14}}>JADWAL</Text>
            <Text
              style={{color: Colors.white, fontSize: 18, fontWeight: '600'}}>
              07:00
            </Text>
            <Text style={{color: Colors.white, fontSize: 11}}>
              DGO-CKR-0700
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.car}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              marginBottom: 5,
            }}>
            DATA PENGIRIM
          </Text>

          <TextInput style={{backgroundColor: Colors.white}} label="Telepon" left={<TextInput.Icon icon="cellphone" />} />
          <TextInput style={{backgroundColor: Colors.white}} label="Nama lengkap" left={<TextInput.Icon icon="account-box" />} />
          <TextInput style={{backgroundColor: Colors.white}} label="Alamat" left={<TextInput.Icon icon="home-map-marker" />} />

          
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              marginTop: 20,
              marginBottom: 5,
            }}>
            DATA PENERIMA
          </Text>

          <TextInput style={{backgroundColor: Colors.white}} label="Telepon" left={<TextInput.Icon icon="cellphone" />} />
          <TextInput style={{backgroundColor: Colors.white}} label="Nama lengkap" left={<TextInput.Icon icon="account-box" />} />
          <TextInput style={{backgroundColor: Colors.white}} label="Alamat" left={<TextInput.Icon icon="home-map-marker" />} />
          <TextInput style={{backgroundColor: Colors.white}} label="Keterangan" left={<TextInput.Icon icon="square-edit-outline" />} />

          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              marginTop: 20,
              marginBottom: 5,
            }}>
            DATA PAKET
          </Text>
          <TextInput style={{backgroundColor: Colors.white}} label="Jenis Barang" left={<TextInput.Icon icon="cube" />} />
          <TextInput style={{backgroundColor: Colors.white}} label="Berat" left={<TextInput.Icon icon="format-size" />} />

          <TouchableOpacity
            style={styles.button}
            onPress={
              () => printBillTest()
            }>
            <Text style={{color: Colors.white, fontSize:18, fontWeight:'bold'}}>Hitung Harga</Text>
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
export default PaketScreen;
