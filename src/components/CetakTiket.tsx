import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  USBPrinter,
  NetPrinter,
  BLEPrinter,
} from 'react-native-thermal-receipt-printer';

import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
  ALIGN,
} from 'tp-react-native-bluetooth-printer';

import Logos from '../constants/images/logo';
import {API_URL} from '../constants/Repositories';

export default function CetakTiket() {
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [printers, setPrinters] = useState([]);
  const [currentPrinter, setCurrentPrinter] = useState();
  const [tiket, setTiket] = useState({
    telp_travel: '',
    kd_tiket: '',
    kelas: '',
    jam_keberangkatan: '',
    nama_penumpang: '',
    kursi: '',
    tgl_keberangkatan: '',
    start_trip: '',
    end_trip: '',
    start_outlet: '',
    end_outlet: '',
    start_kota: '',
    end_kota: '',
    harga_tiket: '',
    biaya_jemput: '',
    biaya_antar: '',
    discount: '',
    return: '',
    total_bayar: '',
    tgl_pelunasan: '',
    agen_pelunasan: '',
    outlet_pelunasan: '',
  });

  useEffect(() => {
    BluetoothManager.connect('0F:02:18:41:40:3B'); // the device address scanned.
  }, []);

  const printText = async (text, height = 0, width = 0) => {
    return await BluetoothEscposPrinter.printText(text, {
      encoding: 'GBK',
      codepage: 0, // This is Turkish codepage. If you want to print English characters, you don't need to set this option.
      fonttype: 0, // This is default font type.
      widthtimes: width, // Text width times
      heigthtimes: height, // Text heigth time
    });
  };

  const printTextTest = async (item) => {
    let id  = item.id;
    console.log(item.id);
    fetch( API_URL + 'reservasi/cetaktiket/'+id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(async json => {
        //console.log(json);
        setTiket(json);

        let base64Image = Logos.logoprint;
          
        console.log('Cetak Tiket');
        await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER);
        await BluetoothEscposPrinter.setBold(1);
        await printText('WBTRANS\n\r', 0, 1);
        await BluetoothEscposPrinter.printPic(base64Image, {
          width: 150,
          left: 110,
        });
        await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER);
        await printText('\n\r', 0, 0);
        await printText(json.telp_travel + '\n\r', 0, 0);
        await BluetoothEscposPrinter.printText(
          '--------------------------------\n\r',
          {},
        );
        await BluetoothEscposPrinter.setBold(1);
        await BluetoothEscposPrinter.printText('TIKET\n\r', {});
        await BluetoothEscposPrinter.printText(json.telp_travel + '\n\r', {});
        await BluetoothEscposPrinter.setBold(0);
        await BluetoothEscposPrinter.printText(
          '--------------------------------\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
          'Kelas : ' + json.telp_travel + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText('By: 0\n\r', {});
        await BluetoothEscposPrinter.printText(
            json.jam_keberangkatan + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
            json.nama_penumpang + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText('KURSI\n\r', {});
        await BluetoothEscposPrinter.printText(json.kursi + '\n\r', {});
        await BluetoothEscposPrinter.printText(
          '--------------------------------\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
            json.tgl_keberangkatan + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
          'Pergi : ' + json.tgl_keberangkatan + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText('Pick Up:\n\r', {});
        await BluetoothEscposPrinter.printText(json.start_outlet + '\n\r', {});
        await BluetoothEscposPrinter.printText('Drop Off\n\r', {});
        await BluetoothEscposPrinter.printText(json.end_outlet + '\n\r', {});
        await BluetoothEscposPrinter.printText(
          '--------------------------------\n\r',
          {},
        );
        await BluetoothEscposPrinter.setBold(1);
        await BluetoothEscposPrinter.printText(
          'Tarif: Rp. ' + json.harga_tiket + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.setBold(0);
        await BluetoothEscposPrinter.printText(
          '--------------------------------\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText('Biaya Jemput : Rp.0\n\r', {});
        await BluetoothEscposPrinter.printText('Biaya Antar : Rp.0\n\r', {});
        await BluetoothEscposPrinter.printText(
          'Diskon : ' + json.discount + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText('Return\n\r', {});
        await BluetoothEscposPrinter.printText(
          'Rp. ' + json.discount + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
          'Bayar Rp. ' + json.total_bayar + '\n\r\n\r',
          {},
        );

        await BluetoothEscposPrinter.printText(
          tiket.tgl_pelunasan + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
          'Pencetak : ' + json.agen_pelunasan + '\n\r\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
          '-------------VOUCHER------------\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
          'Nama : ' + json.nama_penumpang + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
            json.start_outlet +
            '(' +
            json.start_kota +
            ') - ' +
            json.end_outlet +
            '(' +
            json.end_kota +
            ')\n\r\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText('TIKET BALIK\n\r', {});
        await BluetoothEscposPrinter.printText('FREE\n\r\n\r', {});
        await BluetoothEscposPrinter.printText(json.kd_tiket + '\n\r\n\r', {});
        await BluetoothEscposPrinter.printText('Berlaku Hingga\n\r', {});
        await BluetoothEscposPrinter.printText(
            json.tgl_pelunasan + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText('\n\r\n\r\n\r', {});

      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <View>
      <TouchableOpacity
      style={styles.buttonBayar}
      onPress={() => printTextTest(7)}>
      <Text style={{color: 'white'}}>CETAK</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBayar: {
    flex: 1,
    height: 40,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
