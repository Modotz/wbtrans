import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ThermalPrinterModule from 'react-native-thermal-printer';

ThermalPrinterModule.defaultConfig = {
  ...ThermalPrinterModule.defaultConfig,
  macAddress: "0F:02:18:41:40:3B"
};

// type BluetoothPrinter = {
//   deviceName: "BlueTooth Printer";
//   macAddress: "0F:02:18:41:40:3B";
// };

const CetakTiketScreen = ({ navigation }: {navigation: any}) => {
  
  useEffect(() => {

  }, []);

  const printBillTest = async () => {
    //currentPrinter && BLEPrinter.printBill("<C>WB TRANS CETAK TIKET</C>");
    try {
      console.log('We will invoke the native module here!');
      await ThermalPrinterModule.printBluetooth({ payload: tiket.text });

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

  //'[C]<img>http://192.168.100.5:8088/trans/images/trans/logo.png</img>\n' +
  const [tiket, setTiket] = useState({
    text:
      "[C]<b><font size='10'>WBTRANS</font></b>\n" +
      "[C]<b><font size='10'>0818 826 288</font></b>" 
      // '[C]<img>http://192.168.100.5:8088/trans/images/trans/logo.png</img>\n' +
      // '[C]<b>WWW.WBTRANS.ID</b>\n' +
      // '[C]<b>0818 826 288</b>\n' 
      // '[C]----------------------\n' +
      // '[C]<b>TIKET</b>\n' +
      // '[C]<b>TWBT230923PEGH</b>\n' +
      // '[C]======================\n' +
      // '[C]<b>Kelas : REGULAR</b>\n' +
      // '[C]<b>By: 0</b>\n' +
      // '[C]<b>11:00</b>\n\n' +
      // '[C]<b>DIKA</b>\n' +
      // '[C]<b>KURSI</b>\n' +
      // '[C]<b>8</b>\n' +
      // '[C]----------------------\n' +
      // '[C]<b>04-Feb-2024</b>\n' +
      // '[C]<b>Pergi : 04-Feb-2024</b>\n' +
      // '[C]<b>Pick Up:</b>\n' +
      // '[C]<b>SUBANG</b>\n' +
      // '[C]<b>Drop Off:</b>\n' +
      // '[C]<b>DAGO</b>\n' +
      // '[C]----------------------\n' +
      // '[C]<b>Tarif: Rp. 160.000</b>\n' +
      // '[C]----------------------\n' +
      // '[C]<b>Biaya Jemput : Rp.0</b>\n' +
      // '[C]<b>Biaya Antar : Rp.0</b>\n' +
      // '[C]<b>Diskon : </b>\n' +
      // '[C]<b>Return</b>\n' +
      // '[C]<b>Rp. 30.000</b>\n' +
      // '[C]<b>Bayar Rp. 130.000</b>\n' +
      // '[C]<b>04-Feb-2024 14:27:47</b>\n' +
      // '[C]<b>Pencetak : RAHMAN</b>\n' +
      // '[C]-------VOUCHER]-------n' +
      // '[C]<b>Nama : DIKA</b>\n' +
      // '[C]Dago (BANDUNG) - Subang(SUBANG) </b>\n\n' +
      // '[C]<b>TIKET BALIK</b>\n' +
      // '[C]<b>FREE</b>\n\n' +
      // '[C]<b>WBT230923632Z</b>\n\n' +
      // '[C]<b>Berlaku Hingga</b>\n' +
      // '[C]<b>20-03-2024</b>\n' 

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

          
          <TouchableOpacity
            style={styles.button}
            onPress={
              () => printBillTest()
            }>
            <Text style={{color: Colors.white, fontSize:18, fontWeight:'bold'}}>Cetak Tiket</Text>
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
export default CetakTiketScreen;
