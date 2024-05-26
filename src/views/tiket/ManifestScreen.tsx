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

export default function ManifestScreen({route, navigation}) {
  const {data} = route.params;

  // State Account
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [csoKdOutlet, setCsoKdOutlet] = useState('');
  const [csoOutlet, setCsoOutlet] = useState('');
  const [csoKota, setCsoKota] = useState('');
  const [manifest, setManifest] = useState({
    id: '',
    id_dt_jadwal: '',
    kd_manifest: '',
    kd_manifest_reservasi: '',
    kd_manifest_paket: '',
    kd_kendaraan: '',
    kapasitas: '',
    plat_nomor: '',
    tipe_kendaraan: '',
    kd_sopir: '',
    nama_sopir: '',
    nrp: '',
    harga_tiket: '',
    jml_booked: '',
    jml_paid: '',
    total_penumpang: '',
    total_paket: '',
    tgl_berangkat: '',
    jam_berangkat: '',
    kd_trip: '',
    start_trip: '',
    start_outlet: '',
    start_kota: '',
    end_trip: '',
    end_outlet: '',
    end_kota: '',
    kd_jadwal: '',
    cso_manifest: '',
    bbm: '0',
    fee_sopir: '0',
    order_fee_bulanan: '0',
    tol: '0',
    ban: '0',
    lain_lain: '0',
    parkir: '0',
    tambahan_bbm: '0',
    tambahan_tol: '0',
    status: '',
    created_at: '',
  });

  const [bleMac, setBleMac] = useState('');

  const [loading, setLoading] = useState(true);

  const [idDtJadwal, setIdDtJadwal] = useState('');
  const [kdKendaraan, setKdKendaraan] = useState('');
  const [kdSopir, setKdSopir] = useState('');
  const [bbm, setBbm] = useState('');
  const [feeSopir, setFeeSopir] = useState('');
  const [orderFeeBulanan, setOrderFeeBulanan] = useState('');
  const [tol, setTol] = useState('');
  const [ban, setBan] = useState('');
  const [lainLain, setLainLain] = useState('');
  const [parkir, setParkir] = useState('');
  const [tambahanBbm, setTambahanBbm] = useState('');
  const [tambahanTol, setTambahanTol] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user_id').then(value => setUserId(value));
    AsyncStorage.getItem('username').then(value => setUsername(value));
    AsyncStorage.getItem('kd_outlet').then(value => setCsoKdOutlet(value));
    AsyncStorage.getItem('outlet').then(value => setCsoOutlet(value));
    AsyncStorage.getItem('kota').then(value => setCsoKota(value));
    AsyncStorage.getItem('bleMac').then(value => setBleMac(value));
    BluetoothManager.connect(bleMac);

    setManifest(data);
    setIdDtJadwal(data.id);
    setKdKendaraan(data.kd_kendaraan);
    setKdSopir(data.kd_sopir);
    setBbm(data.bbm);
    setFeeSopir(data.fee_sopir);
    setOrderFeeBulanan(data.order_fee_bulanan);
    setTol(data.tol);
    setBan(data.ban);
    setLainLain(data.lain_lain);
    setParkir(data.parkir);
    setTambahanBbm(data.tambahan_bbm);
    setTambahanTol(data.tambahan_tol);
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

  const cetak = () => {
    var data = JSON.stringify({
      id_dt_jadwal: idDtJadwal,
      kd_kendaraan: kdKendaraan,
      kd_sopir: kdSopir,
      bbm: bbm,
      fee_sopir: feeSopir,
      order_fee_bulanan: orderFeeBulanan,
      tol: tol,
      ban: ban,
      lain_lain: lainLain,
      parkir: parkir,
      tambahan_bbm: tambahanBbm,
      tambahan_tol: tambahanTol,
      kd_outlet: csoKdOutlet,
      cso_kota: csoKota,
      jam_berangkat:manifest.jam_berangkat,
      created_by: userId,
    });

    console.log(data);

    fetch(API_URL + 'reservasi/manifest', {
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
        await BluetoothEscposPrinter.printText('WBTRANS\n\r', {});
        await BluetoothEscposPrinter.printText(json.kd_outlet + '\n\r', {});
        await BluetoothEscposPrinter.setBold(0);
        await BluetoothEscposPrinter.printText(
          '--------------------------------\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
          json.manifest.kd_manifest_reservasi + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
            json.kd_trip + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
            json.manifest.tgl_berangkat + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
            json.jam_berangkat + '\n\r',
          {},
        );
        await BluetoothEscposPrinter.printText(
            '--------------------------------\n\r',
            {},
          );
        await BluetoothEscposPrinter.printText('DAFTAR PENUMPANG\n\r', {});
        
        json.dt_reservasi.map(item => {
          BluetoothEscposPrinter.printText(item.kursi + '.' + item.nama_penumpang +'\n\r', {});
        });

        await BluetoothEscposPrinter.printText(
            '--------------------------------\n\r',
            {},
          );
        await BluetoothEscposPrinter.printText('DAFTAR PAKET\n\r', {});
        json.paket.map(item => {
            BluetoothEscposPrinter.printText(item.nama_pengirim + ' - ' + item.nama_penerima +'\n\r', {});
            BluetoothEscposPrinter.printText(item.telp_pengirim + ' - ' + item.telp_penerima +'\n\r', {});
            BluetoothEscposPrinter.printText('--------------------------------\n\r', {});
        });
        await BluetoothEscposPrinter.printText('--------------------------------\n\r', {});
        await BluetoothEscposPrinter.printText('CSO :' + json.cso+'\n\r', {});
        await BluetoothEscposPrinter.printText('Total Pax :' + json.manifest.total_penumpang +'\n\r', {});
        await BluetoothEscposPrinter.printText('Total Paket :' + json.manifest.total_paket +'\n\r', {});
        await BluetoothEscposPrinter.printText('Tgl Cetak :' + json.tgl_cetak +'\n\r', {});
        await BluetoothEscposPrinter.printText('\n\r\n\r\n\r', {});

        route.params.onGoBack({
          mutasi: false,
          message: 'Manifest',
          id_dt_jadwal: idDtJadwal,
        });
        navigation.goBack();
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginBottom: 10}}>
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
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>
              INFO MANIFEST
            </Text>
          </View>
          <View style={{padding: 10}}>
            <View style={styles.boxRowInfo}>
              <View style={{width: '40%'}}>
                <Text>Manifest</Text>
              </View>
              <Text style={{fontWeight: '700'}}>
                {manifest.kd_manifest_reservasi}
              </Text>
            </View>
            <View style={styles.boxRowInfo}>
              <View style={{width: '40%'}}>
                <Text>Tanggal Berangkat</Text>
              </View>
              <Text style={{fontWeight: '700'}}>{manifest.tgl_berangkat}</Text>
            </View>
            <View style={styles.boxRowInfo}>
              <View style={{width: '40%'}}>
                <Text>Jam Berangkat</Text>
              </View>
              <Text style={{fontWeight: '700'}}>{manifest.jam_berangkat}</Text>
            </View>
            <View style={styles.boxRowInfo}>
              <View style={{width: '40%'}}>
                <Text>Outlet Asal</Text>
              </View>
              <Text style={{fontWeight: '700'}}>{manifest.start_trip}</Text>
            </View>
            <View style={styles.boxRowInfo}>
              <View style={{width: '40%'}}>
                <Text>Outlet Asal</Text>
              </View>
              <Text style={{fontWeight: '700'}}>{manifest.end_outlet}</Text>
            </View>
            <View style={styles.boxRowInfo}>
              <View style={{width: '40%'}}>
                <Text>Kapasitas</Text>
              </View>
              <Text style={{fontWeight: '700'}}>{manifest.kapasitas}</Text>
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
            <IconFa5 style={styles.icon} color="black" name="car" size={20} />
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>KENDARAAN</Text>
          </View>
          <View style={{padding: 10}}>
            <View style={{}}>
              <View style={styles.boxRowInfo}>
                <View style={{width: '40%'}}>
                  <Text>KD Kendaraan</Text>
                </View>
                <Text style={{fontWeight: '700'}}>{manifest.kd_kendaraan}</Text>
              </View>

              <View style={styles.boxRowInfo}>
                <View style={{width: '40%'}}>
                  <Text>No Plat</Text>
                </View>
                <Text style={{fontWeight: '700'}}>{manifest.plat_nomor}</Text>
              </View>
              <View style={styles.boxRowInfo}>
                <View style={{width: '40%'}}>
                  <Text>Sopir 1</Text>
                </View>
                <Text style={{fontWeight: '700'}}>{manifest.nama_sopir}</Text>
              </View>
              <View style={styles.boxRowInfo}>
                <View style={{width: '40%'}}>
                  <Text>Sopir 2</Text>
                </View>
                <Text style={{fontWeight: '700'}}></Text>
              </View>
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
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>BIAYA</Text>
          </View>
          <View style={{padding: 10}}>
            <View style={styles.boxRow}>
              <View style={styles.fix}>
                <Text>FIX</Text>
              </View>
              <Text>BBM</Text>
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                style={{backgroundColor: Colors.white, height: 40, width: 150}}
                value={bbm}
                onChangeText={newText => setBbm(newText)}
              />
            </View>
            <View style={styles.boxRow}>
              <View style={styles.fix}>
                <Text>FIX</Text>
              </View>
              <Text>Fee Sopir</Text>
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                style={{backgroundColor: Colors.white, height: 40, width: 150}}
                value={feeSopir}
                onChangeText={newText => setFeeSopir(newText)}
              />
            </View>
            <View style={styles.boxRow}>
              <View style={styles.fix}>
                <Text>FIX</Text>
              </View>
              <Text>Order fee Bulanan</Text>
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                style={{backgroundColor: Colors.white, height: 40, width: 150}}
                value={orderFeeBulanan}
                onChangeText={newText => setOrderFeeBulanan(newText)}
              />
            </View>
            <View style={styles.boxRow}>
              <View style={styles.fix}>
                <Text>FIX</Text>
              </View>
              <Text>Tol</Text>
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                style={{backgroundColor: Colors.white, height: 40, width: 150}}
                value={tol}
                onChangeText={newText => setTol(newText)}
              />
            </View>
            <View style={styles.boxRow}>
              <View style={styles.add}>
                <Text style={{color: 'white'}}>ADD</Text>
              </View>
              <Text>Ban</Text>
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                style={{backgroundColor: Colors.white, height: 40, width: 150}}
                value={ban}
                onChangeText={newText => setBan(newText)}
              />
            </View>
            <View style={styles.boxRow}>
              <View style={styles.add}>
                <Text style={{color: 'white'}}>ADD</Text>
              </View>
              <Text>Lain-lain</Text>
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                style={{backgroundColor: Colors.white, height: 40, width: 150}}
                value={lainLain}
                onChangeText={newText => setLainLain(newText)}
              />
            </View>
            <View style={styles.boxRow}>
              <View style={styles.add}>
                <Text style={{color: 'white'}}>ADD</Text>
              </View>
              <Text>Parkir</Text>
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                style={{backgroundColor: Colors.white, height: 40, width: 150}}
                value={parkir}
                onChangeText={newText => setParkir(newText)}
              />
            </View>
            <View style={styles.boxRow}>
              <View style={styles.add}>
                <Text style={{color: 'white'}}>ADD</Text>
              </View>
              <Text>Tambahan BBM</Text>
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                style={{backgroundColor: Colors.white, height: 40, width: 150}}
                value={tambahanBbm}
                onChangeText={newText => setTambahanBbm(newText)}
              />
            </View>
            <View style={styles.boxRow}>
              <View style={styles.add}>
                <Text style={{color: 'white'}}>ADD</Text>
              </View>
              <Text>Tambahan Tol</Text>
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                style={{backgroundColor: Colors.white, height: 40, width: 150}}
                value={tambahanTol}
                onChangeText={newText => setTambahanTol(newText)}
              />
            </View>
          </View>
        </View>

        <View style={styles.boxRow}>
          <TouchableOpacity style={styles.buttonBayar} onPress={() => cetak()}>
            <Text style={{color: 'white'}}>CETAK</Text>
          </TouchableOpacity>
        </View>
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
  boxRowInfo: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxRow: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  fix: {
    width: 60,
    height: 35,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  add: {
    width: 60,
    height: 35,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
