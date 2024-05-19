import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

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

export default function CetakTiket(data) {
  //const {data} = route.params;

  useEffect(() => {
    BluetoothManager.connect('66:32:AA:01:EB:30');
    //printTextTest(data);
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

  const printTextTest = async (json) => {
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
      'Kelas : ' + json.kelas + '\n\r',
      {},
    );
    await BluetoothEscposPrinter.printText(
      'By: ' + json.jns_pembayaran + '\n\r',
      {},
    );
    await BluetoothEscposPrinter.printText(json.jam_keberangkatan + '\n\r', {});
    await BluetoothEscposPrinter.printText(json.nama_penumpang + '\n\r', {});
    await BluetoothEscposPrinter.printText('KURSI\n\r', {});
    await BluetoothEscposPrinter.printText(json.kursi + '\n\r', {});
    await BluetoothEscposPrinter.printText(
      '--------------------------------\n\r',
      {},
    );
    await BluetoothEscposPrinter.printText(json.tgl_keberangkatan + '\n\r', {});
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
      'Diskon : Rp. ' + json.discount + '\n\r',
      {},
    );
    await BluetoothEscposPrinter.printText('Diskon Promo\n\r', {});
    await BluetoothEscposPrinter.printText(
      'Rp. ' + json.discount_promo + '\n\r',
      {},
    );
    await BluetoothEscposPrinter.printText('Diskon Voucher\n\r', {});
    await BluetoothEscposPrinter.printText(
      'Rp. ' + json.discount_voucher + '\n\r',
      {},
    );
    await BluetoothEscposPrinter.printText(
      'Bayar Rp. ' + json.total_bayar + '\n\r\n\r',
      {},
    );

    await BluetoothEscposPrinter.printText(json.tgl_pelunasan + '\n\r', {});
    await BluetoothEscposPrinter.printText(
      'Pencetak : ' + json.agen_pelunasan + '\n\r\n\r',
      {},
    );
    await BluetoothEscposPrinter.printText(
      '--------------------------------\n\n\r',
      {},
    );

    if (json.vouchers.length > 0) {
      await BluetoothEscposPrinter.printText(
        '-------------VOUCHER------------\n\r',
        {},
      );

      if (json.jenis_tiket == 'RETURN') {
        await BluetoothEscposPrinter.printText('TIKET BALIK FREE\n\r', {});
      } else if (json.jenis_tiket == 'SETIA') {
        await BluetoothEscposPrinter.printText('LIST VOUCHER\n\r', {});
      }
    }
    await BluetoothEscposPrinter.printText(
      '--------------------------------\n\r',
      {},
    );

    json.vouchers.map(item => {
      BluetoothEscposPrinter.printText(item.return_trip + '\n\r', {});
      BluetoothEscposPrinter.printText(item.kd_voucher + '\n\r', {});
      BluetoothEscposPrinter.printText(item.status_voucher + '\n\r', {});
      BluetoothEscposPrinter.printText('Berlaku Hingga\n\r', {});
      BluetoothEscposPrinter.printText(item.period_expired + '\n\r', {});
    });

    await BluetoothEscposPrinter.printText('\n\r\n\r\n\r', {});
  };

  return <View></View>;
}
