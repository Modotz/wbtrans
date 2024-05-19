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
  Pressable,
} from 'react-native';
import {TextInput, Checkbox} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {API_URL} from '../../constants/Repositories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CetakTiket from '../../components/CetakTiket';

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

import Logos from '../../constants/images/logo';

export default function EditPenumpangScreen({route, navigation}) {
  const {data, priceList} = route.params;

  // State Account
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [csoKdOutlet, setCsoKdOutlet] = useState('');
  const [csoOutlet, setCsoOutlet] = useState('');
  const [csoKota, setCsoKota] = useState('');
  const [bleMac, setBleMac] = useState('');

  const [loading, setLoading] = useState(true);
  const [penumpang, setPenumpang] = useState({
    reservasi: {
      id: '',
      kd_reservasi: '',
      kd_booked: '',
      tgl_booked: '',
      tgl_keberangkatan: '',
      jam_keberangkatan: '',
      id_rute: '',
      start_trip: '',
      end_trip: '',
      id_jadwal: '',
      id_dt_jadwal: '',
      kd_jadwal: '',
      telp_pemesan: '',
      email_pemesan: '',
      nama_pemesan: '',
      keterangan: '',
      jml_tiket: '',
      total_harga_tiket: '',
      total_harga_makan: '',
      total_discount_voucher: '',
      total_discount_promo: '',
      total_discount: '',
      sub_total: '',
      sub_total_discount: '',
      total_bayar: '',
      dibayar: '',
      terhutang: '',
      tgl_berangkat: '',
      jam_berangkat: '',
      status: '',
      created_at: '',
      updated_at: '',
      last_updated_at: '',
      created_by: '',
    },
    dt_reservasi: {
      id: '',
      kd_reservasi: '',
      kd_tiket: '',
      id_dt_jadwal: '',
      seq: '',
      kursi: '',
      telp_penumpang: '',
      nama_penumpang: '',
      keterangan: '',
      id_harga: '',
      jenis_tiket: '',
      harga_tiket: '',
      harga_makan: '',
      kd_voucher: '',
      discount_voucher: '',
      discount_promo: '',
      discount: '',
      sub_total: '',
      total_bayar: '',
      agen_pemesan: '',
      outlet_pemesan: '',
      koordinat_pemesan: '',
      pembayaran_to: '',
      jns_pembayaran: '',
      status_pembayaran: '',
      agen_pelunasan: '',
      outlet_pelunasan: '',
      tgl_pelunasan: '',
      koordinat_pelunasan: '',
      status_cetak: '',
      cetak_tiket: '',
      total_cetak: '',
      status_mutasi: '',
      tgl_mutasi: '',
      cso_mutasi: '',
      alasan_pembatalan: '',
      tgl_pembatalan: '',
      cso_pembatalan: '',
      alasan_unseat: '',
      tgl_unseat: '',
      cso_unseat: '',
      jml_refund: '',
      nominal_refund: '',
      jns_refund: '',
      alasan_refund: '',
      tgl_refund: '',
      cso_refund: '',
      css_kursi: '',
      css_cetak: '',
      css_bayar: '',
      status_boarding: '',
      status: '',
      created_at: '',
      updated_at: '',
      last_updated_at: '',
      created_by: '',
    },
    end_trip: {
      id: '',
      kd_outlet: '',
      outlet: '',
      kota: '',
      alamat: '',
      email: '',
      telepon: '',
      pic: '',
      latitude: '',
      longitude: '',
      image_pic: '',
      image_outlet: '',
      keterangan: '',
      status_outlet: '',
      status: '',
    },
  });
  const [dtReservasiId, setDtReservasiId] = useState('');
  const [kdReservasi, setKdReservasi] = useState('');
  const [telepon, setTelepon] = useState(null);
  const [namaPenumpang, setNamaPenumpang] = useState(null);
  const [keterangan, setKeterangan] = useState(null);
  const [price, setPrice] = useState([]);
  const [hargaTiket, setHargaTiket] = useState([]);
  const [discount, setDiscountt] = useState(null);
  const [value, setValue] = useState(null);
  const [statusTiket, setStatusTiket] = useState('');
  const [alasan, setAlasan] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user_id').then(value => setUserId(value));
    AsyncStorage.getItem('username').then(value => setUsername(value));
    AsyncStorage.getItem('kd_outlet').then(value => setCsoKdOutlet(value));
    AsyncStorage.getItem('outlet').then(value => setCsoOutlet(value));
    AsyncStorage.getItem('kota').then(value => setCsoKota(value));
    AsyncStorage.getItem('bleMac').then(value => setBleMac(value));
    BluetoothManager.connect(bleMac);
    
    //console.log('dtreservasi:', data);
    //console.log('dtreservasi:');
    setPenumpang(data);
    setDtReservasiId(penumpang.dt_reservasi.id);
    setKdReservasi(penumpang.dt_reservasi.kd_reservasi);
    setNamaPenumpang(penumpang.dt_reservasi.nama_penumpang);
    setTelepon(penumpang.dt_reservasi.telp_penumpang);
    setKeterangan(penumpang.dt_reservasi.keterangan);
    setStatusTiket(penumpang.dt_reservasi.status);
    setPrice(priceList);
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
    let created_by = userId;

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
        await BluetoothEscposPrinter.printText(
          'By: ' + json.jns_pembayaran + '\n\r',
          {},
        );
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
        navigation.goBack(1);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  const mutasi = () => {};

  const batal = () => {
    let dt_reservasi_id = dtReservasiId;
    let kd_reservasi = kdReservasi;
    let created_by = userId;

    console.log(dt_reservasi_id);
    console.log(kd_reservasi);
    fetch(API_URL + 'reservasi/cancel', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dt_reservasi_id: dt_reservasi_id,
        kd_reservasi: kd_reservasi,
        alasan_pembatalan: alasan,
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

  const simpan = () => {
    setLoading(true);
    let dt_reservasi_id = dtReservasiId;
    let kd_reservasi = kdReservasi;
    let created_by = userId;

    console.log(dt_reservasi_id);
    console.log(kd_reservasi);

    let data = JSON.stringify({
      dt_reservasi_id: dt_reservasi_id,
      kd_reservasi: kd_reservasi,
      telp_pemesan: penumpang.reservasi.telp_pemesan,
      nama_pemesan: penumpang.reservasi.nama_pemesan,
      telp_penumpang: telepon,
      nama_penumpang: namaPenumpang,
      keterangan: keterangan,
      harga_tiket: hargaTiket,
      kd_voucher: '',
      created_by: created_by,
    });

    console.log(data);

    if (dt_reservasi_id != null && namaPenumpang != null) {
      fetch(API_URL + 'reservasi/edit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
      })
        .then(resp => resp.json())
        .then(json => {
          console.log('-----------------------');
          console.log({json});
          navigation.goBack(1);
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginBottom: 10}}>
        <View
          style={{margin: 10, borderRadius: 10, backgroundColor: Colors.white}}>
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                height: 50,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}>
              <IconMa
                style={{}}
                color="black"
                name="airline-seat-recline-extra"
                size={20}
              />
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                KURSI {penumpang.dt_reservasi.kursi}
              </Text>
              <IconFa5 style={{}} color="black" name="calendar" size={20} />
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                {penumpang.reservasi.tgl_keberangkatan}
              </Text>
              <IconFa5 style={{}} color="black" name="clock" size={20} />
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                {penumpang.reservasi.jam_keberangkatan}
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
                {penumpang.dt_reservasi.kd_tiket}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Drop Point</Text>
              <Text style={{fontWeight: '700'}}>{penumpang.end_trip.kota}</Text>
            </View>
            <View style={styles.textInput}>
              <TextInput
                style={{backgroundColor: Colors.white}}
                label="Nama Penumpang"
                value={namaPenumpang}
                onChangeText={newText => setNamaPenumpang(newText)}
              />
            </View>
            <View style={styles.textInput}>
              <TextInput
                keyboardType="number-pad"
                style={{backgroundColor: Colors.white}}
                label="No Telepon Penumpang"
                value={telepon}
                onChangeText={newText => setTelepon(newText)}
              />
            </View>
            <View style={styles.textInput}>
              <TextInput
                style={{backgroundColor: Colors.white}}
                label="Keterangan"
                value={keterangan}
                onChangeText={newText => setKeterangan(newText)}
              />
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
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>EDIT TARIF</Text>
          </View>
          <View style={{padding: 10}}>
            <View style={{}}>
              <Text style={{marginLeft: 10}}>Jenis Discount</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={price}
                valueField="xx"
                maxHeight={300}
                labelField="label"
                placeholder="Select item"
                searchPlaceholder="Search..."
                onChange={item => {
                  setHargaTiket(item);
                }}
              />
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
              <Text>Discount</Text>
              <Text style={{fontWeight: '700'}}>
                Rp. {penumpang.dt_reservasi.discount}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Discount Voucher</Text>
              <Text style={{fontWeight: '700'}}>
                Rp. {penumpang.dt_reservasi.discount_voucher}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Total</Text>
              <Text style={{fontWeight: '700'}}>
                Rp. {penumpang.dt_reservasi.sub_total}
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
              name="info-circle"
              size={20}
            />
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>INFORMASI</Text>
          </View>
          <View style={{padding: 10}}>
            <View style={styles.containerObj}>
              <Text>CSO Pemesan</Text>
              <Text style={{fontWeight: '700'}}>
              {penumpang.dt_reservasi.agen_pemesan}
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
              {penumpang.dt_reservasi.tgl_pelunasan}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Pembayaran</Text>
              <Text style={{fontWeight: '700'}}>
                {penumpang.dt_reservasi.jns_pembayaran}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Outlet Bayar</Text>
              <Text style={{fontWeight: '700'}}>
                {penumpang.dt_reservasi.outlet_pelunasan}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>CSO Cetak Tiket</Text>
              <Text style={{fontWeight: '700'}}>
                {penumpang.dt_reservasi.agen_pelunasan}
              </Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Waktu Boarding</Text>
              <Text style={{fontWeight: '700'}}></Text>
            </View>
          </View>
        </View>

        <View style={styles.boxRow}>
          <TouchableOpacity style={styles.buttonBayar} onPress={() => cetak()}>
            <Text style={{color: 'white'}}>CETAK</Text>
          </TouchableOpacity>
          {/*<CetakTiket></CetakTiket>*/}
          <TouchableOpacity
            style={styles.buttonMutasi}
            onPress={() => mutasi()}>
            <Text style={{color: 'red'}}>Mutasi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonMutasi}
            onPress={() => setModalVisible(true)}>
            <Text style={{color: 'red'}}>BATAL</Text>
          </TouchableOpacity>
          {statusTiket == 'LUNAS' ? (
            <></>
          ) : (
            <TouchableOpacity
              style={styles.buttonBayar}
              onPress={() => simpan()}>
              <Text style={{color: 'white'}}>SIMPAN</Text>
            </TouchableOpacity>
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.textInput}>
                <TextInput
                  style={{backgroundColor: Colors.white}}
                  label="Alasan Pembatalan"
                  value={alasan}
                  onChangeText={newText => setAlasan(newText)}
                />
              </View>
              <View style={styles.boxRow}>
                <TouchableOpacity
                  style={styles.buttonBayar}
                  onPress={() => batal()}>
                  <Text style={{color: 'white'}}>Ajukan</Text>
                </TouchableOpacity>
                {/*<CetakTiket></CetakTiket>*/}
                <TouchableOpacity
                  style={styles.buttonMutasi}
                  onPress={() => setModalVisible(!modalVisible)}>
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
    // borderBottomWidth: 0.5,
    // borderBottomColor: 'black',
  },
  textInput: {},
  boxRow: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    backgroundColor: Colors.white,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
