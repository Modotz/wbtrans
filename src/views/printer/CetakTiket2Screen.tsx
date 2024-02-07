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
import ItemList from '../../components/ItemList';

const CetakTiket2Screen = ({ navigation }: {navigation: any}) => {
  const [text, setText] = React.useState('');
  const [printers, setPrinters] = useState([]);
  const [currentPrinter, setCurrentPrinter] = useState();

  const [tiket, setTiket] = useState({
    text:
      "<C>WBTRANS</C>" +
      "<C>0818 826 288</C>" 
    //   "[C]<b><font size='10'>0818 826 288</font></b>" 
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

  useEffect(() => {
    BLEPrinter.init().then(()=> {
      BLEPrinter.getDeviceList().then(setPrinters);
    });

  }, []);

  const connect = (printer) => {
    
    let conStatus = BLEPrinter.connectPrinter(printer.inner_mac_address);
    if(conStatus){
        console.log('Connected to :',printer.inner_mac_address);
        setCurrentPrinter(printer.inner_mac_address);
    }else{
        error => console.warn(error);
    }
  };

  
  const printTextTest = () => {
    currentPrinter && BLEPrinter.printText(tiket.text);
  }

  const printBillTest = async () => {
    currentPrinter && BLEPrinter.printBill("<M>WB TRANS CETAK TIKET</M>");
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
                color="#00BCD4"
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
export default CetakTiket2Screen;
