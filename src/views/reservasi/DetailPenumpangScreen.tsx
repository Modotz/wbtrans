import React, {useState, useEffect} from 'react';
import IconFa5 from 'react-native-vector-icons/dist/FontAwesome5';
import IconMa from 'react-native-vector-icons/dist/MaterialIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {TextInput, Checkbox} from 'react-native-paper';

import CetakTiket from '../../components/CetakTiket2';
import {API_URL} from '../../constants/Repositories';
import Logos from '../../constants/images/logo';
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


export default function DetailPenumpangScreen({route, navigation}) {
  const {data} = route.params;

  const [loading, setLoading] = useState(true);
  const [penumpang, setPenumpang] = useState({
    reservasi: {
      kd_booked: '',
      kd_tiket: '',
      outlet_pemesan: '',
      created_at: '',
      tgl_pelunasan: '',
      jns_pembayaran: '',
      outlet_pelunasan: '',
      agen_pelunasan: '',
      tgl_keberangkatan: '',
      jam_keberangkatan: '',
    },
    dt_reservasi: {
      id: '',
      kd_reservasi: '',
      kursi: '',
      nama_penumpang: '',
      telp_penumpang: '',
      harga_tiket: '',
      discount: '',
      total_bayar: '',
      keterangan:'',
    },
    end_trip: {
      kd_outlet: '',
      outlet: '',
      kota: '',
    },
  });
  const [dtReservasiId, setDtReservasiId] = useState('');
  const [kdReservasi, setKdReservasi] = useState('');
  const [alasanUnseat, setAlasanUnseat] = useState('');

  const [jmlRefund, setJmlRefund] = useState('');
  const [nominalRefund, setNominalRefund] = useState('');
  const [jnsRefund, setJnsRefund] = useState('');
  const [alasanRefund, setAlasanRefund] = useState('');

  const [modalUnseatVisible, setModalUnseatVisible] = useState(false);
  const [modalRefundVisible, setModalRefundVisible] = useState(false);

  useEffect(() => {
    //console.log('dtreservasi:',data);
    console.log('dtreservasi:');
    setPenumpang(data);
    setDtReservasiId(data.dt_reservasi.id);
    setKdReservasi(data.dt_reservasi.kd_reservasi);
  }, [penumpang]);

  const printText = async (text, height = 0, width = 0) => {
    return await BluetoothEscposPrinter.printText(text, {
      encoding: 'GBK',
      codepage: 0, // This is Turkish codepage. If you want to print English characters, you don't need to set this option.
      fonttype: 0, // This is default font type.
      widthtimes: width, // Text width times
      heigthtimes: height, // Text heigth time
    });
  };

  const cetak = () => {
    let dt_reservasi_id = dtReservasiId;
    let kd_reservasi = kdReservasi;
    let created_by = 'USR006';

    console.log(dt_reservasi_id);
    console.log(kd_reservasi);
    fetch(API_URL + 'reservasi/cetak_tiket', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dt_reservasi_id: dt_reservasi_id,
        kd_reservasi: kd_reservasi,
        created_by: created_by,
      }),
    })
      .then(resp => resp.json())
      .then(async json => {
        console.log(json);
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
        await BluetoothEscposPrinter.printText('By: '+ json.jns_pembayaran + '\n\r', {});
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

        await BluetoothEscposPrinter.printText(
          json.tgl_pelunasan + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
          'Pencetak : ' + json.agen_pelunasan + '\n\r\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
          '--------------------------------\n\n\r',
          {},
        );

        if((json.vouchers).length > 0){
          await BluetoothEscposPrinter.printText(
            '-------------VOUCHER------------\n\r',
            {},
          );

          if(json.jenis_tiket == "RETURN"){
            await BluetoothEscposPrinter.printText(
              'TIKET BALIK FREE\n\r',
              {},
            );
          }else if(json.jenis_tiket == "SETIA"){
            await BluetoothEscposPrinter.printText(
              'LIST VOUCHER\n\r',
              {},
            );
          }
        }
        await BluetoothEscposPrinter.printText(
          '--------------------------------\n\r',
          {},
        );

        json.vouchers.map((item) => {
           BluetoothEscposPrinter.printText(
            item.return_trip + '\n\r',
            {},
          );
          BluetoothEscposPrinter.printText(
            item.kd_voucher + '\n\r',
            {},
          );
          BluetoothEscposPrinter.printText(
            item.status_voucher + '\n\r',
            {},
          );
          BluetoothEscposPrinter.printText(
            'Berlaku Hingga\n\r',
            {},
          );
          BluetoothEscposPrinter.printText(
            item.period_expired + '\n\r',
            {},
          );
        });
        
        await BluetoothEscposPrinter.printText('\n\r\n\r\n\r', {});
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  const mutasi = () => {};

  const unseat = () => {
    let dt_reservasi_id = dtReservasiId;
    let kd_reservasi = kdReservasi;
    let created_by = 'USR006';

    console.log(dt_reservasi_id);
    console.log(kd_reservasi);
    fetch(API_URL + 'reservasi/unseat', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dt_reservasi_id: dt_reservasi_id,
        kd_reservasi: kd_reservasi,
        alasan_unseat: alasanUnseat,
        created_by: created_by,
      }),
    })
      .then(resp => resp.json())
      .then(async json => {
        console.log(json);
        navigation.goBack(1);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  const refund = () => {
    let dt_reservasi_id = dtReservasiId;
    let kd_reservasi = kdReservasi;
    let jml_refund= jmlRefund;
    let nominal_refund= nominalRefund;
    let jns_refund= jnsRefund;
    let alasan_refund= alasanRefund;
    let created_by = 'USR006';

    let data = JSON.stringify({
      dt_reservasi_id,
      kd_reservasi,
      jml_refund,
      nominal_refund,
      jns_refund,
      alasan_refund,
      created_by,
    });

    console.log(data);
    fetch(API_URL + 'reservasi/refund', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then(resp => resp.json())
      .then(async json => {
        console.log(json);
        navigation.goBack(1);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginBottom: 0}}>
        <View
          style={{margin: 10, borderRadius: 10, backgroundColor: Colors.white}}>
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                height: 50,
                alignItems: 'center',
                justifyContent:"space-between",
                marginHorizontal:20,
              }}>
              <IconMa
                style={{}}
                color="black"
                name="airline-seat-recline-extra"
                size={20}
              />
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>KURSI {penumpang.dt_reservasi.kursi}</Text>
              <IconFa5
                style={{}}
                color="black"
                name="calendar"
                size={20}
              />
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>{penumpang.reservasi.tgl_keberangkatan}</Text>
              <IconFa5
                style={{}}
                color="black"
                name="clock"
                size={20}
              />
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>{penumpang.reservasi.jam_keberangkatan}</Text>
            </View>
            
          </View>
        </View>
        <View
          style={{margin: 10, borderRadius: 10, backgroundColor: Colors.white}}>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              alignItems: 'center',
              borderBottomWidth: 0.5,
            }}>
            <IconFa5
              style={styles.icon}
              color="black"
              name="user-tie"
              size={20}
            />
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>PENUMPANG</Text>
          </View>
          <View style={{padding: 10}}>
            <View style={styles.containerObj}>
              <Text>No Booking</Text>
              <Text style={{fontWeight: '700'}}>
                {penumpang.reservasi.kd_booked}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>No Tiket</Text>
              <Text style={{fontWeight: '700'}}>
                {penumpang.reservasi.kd_tiket}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Nama Penumpang</Text>
              <Text style={{fontWeight: '700'}}>
                {penumpang.dt_reservasi.nama_penumpang}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Telp Penumpang</Text>
              <Text style={{fontWeight: '700'}}>
                {penumpang.dt_reservasi.telp_penumpang}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Keterangan</Text>
              <Text style={{fontWeight: '700'}}>{penumpang.dt_reservasi.keterangan}</Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Drop Point</Text>
              <Text style={{fontWeight: '700'}}>{penumpang.end_trip.kota}</Text>
            </View>
          </View>
        </View>

        <View
          style={{margin: 10, borderRadius: 10, backgroundColor: Colors.white}}>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              alignItems: 'center',
              borderBottomWidth: 0.5,
            }}>
            <IconFa5
              style={styles.icon}
              color="black"
              name="info-circle"
              size={20}
            />
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>INFORMASI</Text>
          </View>
          <View style={{padding: 10}}>
            <View style={styles.containerObj}>
              <Text>CSO Pemesan</Text>
              <Text style={{fontWeight: '700'}}>
                {penumpang.reservasi.outlet_pemesan}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Waktu Pesan</Text>
              <Text style={{fontWeight: '700'}}>
                {penumpang.reservasi.created_at}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Waktu Bayar</Text>
              <Text style={{fontWeight: '700'}}>
                {penumpang.reservasi.tgl_pelunasan}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Pembayaran</Text>
              <Text style={{fontWeight: '700'}}>
                {penumpang.reservasi.jns_pembayaran}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Outlet Bayar</Text>
              <Text style={{fontWeight: '700'}}>
                {penumpang.reservasi.outlet_pelunasan}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>CSO Cetak Tiket</Text>
              <Text style={{fontWeight: '700'}}>
                {penumpang.reservasi.agen_pelunasan}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Waktu Boarding</Text>
              <Text style={{fontWeight: '700'}}>
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{margin: 10, borderRadius: 10, backgroundColor: Colors.white}}>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              alignItems: 'center',
              borderBottomWidth: 0.5,
            }}>
            <IconFa5
              style={styles.icon}
              color="black"
              name="money-bill"
              size={20}
            />
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>TARIF</Text>
          </View>
          <View style={{padding: 10}}>
            <View style={styles.containerObj}>
              <Text>Harga Tiket</Text>
              <Text style={{fontWeight: '700'}}>
                Rp. {penumpang.dt_reservasi.harga_tiket}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Jenis Discount</Text>
              <Text style={{fontWeight: '700'}}>
                Rp. {penumpang.dt_reservasi.discount}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Total</Text>
              <Text style={{fontWeight: '700'}}>
                Rp. {penumpang.dt_reservasi.total_bayar}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.boxRow}>
          <TouchableOpacity style={styles.buttonBayar} onPress={() => cetak()}>
            <Text style={{color: 'white'}}>CETAK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonMutasi} onPress={() => setModalUnseatVisible(true)}>
            <Text style={{color: 'red'}}>UNSEAT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxRow}>
        <TouchableOpacity style={styles.buttonMutasi} onPress={() => setModalRefundVisible(true)}>
            <Text style={{color: 'red'}}>REFUND</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonMutasi}>
            <Text style={{color: 'red'}}>MUTASI</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalUnseatVisible}
          onRequestClose={() => {
            setModalUnseatVisible(!modalUnseatVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.textInput}>
                <TextInput
                  style={{backgroundColor: Colors.white}}
                  label="Alasan Unseat"
                  value={alasanUnseat}
                  onChangeText={newText => setAlasanUnseat(newText)}
                />
              </View>
              <View style={styles.boxRow}>
                <TouchableOpacity
                  style={styles.buttonBayar}
                  onPress={() => unseat()}>
                  <Text style={{color: 'white'}}>Ajukan</Text>
                </TouchableOpacity>
                {/*<CetakTiket></CetakTiket>*/}
                <TouchableOpacity
                  style={styles.buttonMutasi}
                  onPress={() => setModalUnseatVisible(!modalUnseatVisible)}>
                  <Text style={{color: 'red'}}>Kembali</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalRefundVisible}
          onRequestClose={() => {
            setModalRefundVisible(!modalRefundVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.textInput}>
                <TextInput
                  style={{backgroundColor: Colors.white}}
                  label="Jumlah Refund"
                  value={jmlRefund}
                  onChangeText={newText => setJmlRefund(newText)}
                />
              </View>
              <View style={styles.textInput}>
                <TextInput
                  style={{backgroundColor: Colors.white}}
                  label="Nominal Refund"
                  value={nominalRefund}
                  onChangeText={newText => setNominalRefund(newText)}
                />
              </View>
              <View style={styles.textInput}>
                <TextInput
                  style={{backgroundColor: Colors.white}}
                  label="Jenis Refund"
                  value={jnsRefund}
                  onChangeText={newText => setJnsRefund(newText)}
                />
              </View>
              <View style={styles.textInput}>
                <TextInput
                  style={{backgroundColor: Colors.white}}
                  label="Alasan Refund"
                  value={alasanRefund}
                  onChangeText={newText => setAlasanRefund(newText)}
                />
              </View>
              <View style={styles.boxRow}>
                <TouchableOpacity
                  style={styles.buttonBayar}
                  onPress={() => refund()}>
                  <Text style={{color: 'white'}}>Ajukan</Text>
                </TouchableOpacity>
                {/*<CetakTiket></CetakTiket>*/}
                <TouchableOpacity
                  style={styles.buttonMutasi}
                  onPress={() => setModalRefundVisible(!modalRefundVisible)}>
                  <Text style={{color: 'red'}}>Kembali</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    marginLeft: 16,
    marginRight: 10,
  },
  containerObj: {
    height: 50,
    paddingLeft: 10,
    backgroundColor: Colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  boxRow: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBayar: {
    flex: 1,
    height: 40,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonMutasi: {
    flex: 1,
    height: 40,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
