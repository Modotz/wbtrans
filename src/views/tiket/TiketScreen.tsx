import React, {useState, useEffect, useRef, useCallback} from 'react';
//import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView,
  RefreshControl,
  FlatList,
  SectionList,
  Image,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput, Checkbox} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import colors from '../../constants/Colors';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import IconFa5 from 'react-native-vector-icons/dist/FontAwesome5';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Legent from '../../components/Legent';

import {API_URL} from '../../constants/Repositories';

const TiketScreen = ({navigation}: {navigation: any}, route) => {
  const [loading, setLoading] = useState(true);
  const [isMutasi, setIsMutasi] = useState(false);
  const [lastDtReservasiId, setLastDtReservasiId] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [visibleForm, setVisibleForm] = useState(false);
  const scrollRef = useRef();
  // State Account
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [csoKdOutlet, setCsoKdOutlet] = useState('');
  const [csoOutlet, setCsoOutlet] = useState('');
  const [csoKota, setCsoKota] = useState('');
  const [bleMac, setBleMac] = useState('');

  // State for jadwal
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [modalStart, setModalStart] = useState(false);
  const [modalEnd, setModalEnd] = useState(false);
  const [modalJadwal, setModalJadwal] = useState(false);
  const [startSelectedItems, setStartSelectedItems] = useState([]);
  const [endSelectedItems, setEndSelectedItems] = useState([]);
  const [jadwalSelectedItems, setJadwalSelectedItems] = useState([]);
  const [startOutletDatasource, setStartOutletDatasource] = useState([]);
  const [endOutletDatasource, setEndOutletDatasource] = useState([]);
  const [jadwal, setJadwal] = useState([]);
  const [itemJadwal, setItemJadwal] = useState([]);
  const [idJadwal, setIdJadwal] = useState([]);
  const [idDtJadwal, setIdDtJadwal] = useState([]);
  const [dtJadwalId, setDtJadwalId] = useState('');
  const [kendaraan, setKendaraan] = useState([
    {
      id: '0',
      kd_kendaraan: '',
      plat_nomor: '',
      kd_layout: '',
      jml_dek: '',
      kapasitas: '',
    },
  ]);

  const [keberangkatan, setKeberangkatan] = useState({
    manifest: '',
    tgl_manifest: '',
    manifest_paket: '',
    tgl_manifest_paket: '',
    kd_kendaraan: '',
    kendaraan: '',
    kd_sopir: '',
    nama_sopir: '',
    nrp: '',
    tgl_berangkat: '',
    total_penumpang: 0,
    total_paket: 0,
    tgl_paket: '',
    harga_tiket: {
      id: '',
      kd_trip: '',
      harga: '',
      discount: '',
    },
    status_keberangkatan: '',
  });

  const [sopir, setSopir] = useState([
    {
      id: '0',
      kd_sopir: '',
      nrp: '',
      nama: '',
    },
  ]);

  const [kdKendaraan, setKdKendaraan] = useState('');
  const [kdSopir, setKdSopir] = useState('');

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log(dtJadwalId);
    if (dtJadwalId != '') {
      getDetailJadwal(dtJadwalId);
    }
    setRefreshing(false);
  }, []);

  const initStartOutlet = () => {
    if (startSelectedItems == null) {
      var data = [
        {
          id: '',
          kota: '',
          name: 'PILIH ASAL',
        },
      ];
      return data;
    } else {
      return startSelectedItems;
    }
  };

  const initEndOutlet = () => {
    if (endSelectedItems == null) {
      var data = [
        {
          id: '',
          kota: '',
          name: 'PILIH TUJUAN',
        },
      ];
      return data;
    } else {
      return endSelectedItems;
    }
  };

  const initJadwal = () => {
    if (jadwalSelectedItems == null) {
      var data = [
        {
          id: '',
          jam: '',
          name: 'PILIH JADWAL',
        },
      ];
      return data;
    } else {
      return jadwalSelectedItems;
    }
  };

  const getOutletStart = () => {
    fetch(API_URL + 'reservasi/outlets_asal', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(json => {
        //console.log(json);
        setStartOutletDatasource(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  const getOutletEnd = kd_outlet => {
    fetch(API_URL + 'reservasi/outlets_tujuan/' + kd_outlet, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(json => {
        setEndOutletDatasource(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  const getJadwal = () => {
    console.log('getJadwal----------------');
    setVisibleForm(false);
    var tanggal = Moment(date).format('yyyy-MM-DD');
    var startTrip = initStartOutlet().id;
    var endTrip = initEndOutlet().id;
    console.log('tanggal---------------->', tanggal);
    console.log('startTrip---------------->', startTrip);
    console.log('endTrip---------------->', endTrip);
    if (startTrip != null && endTrip != null) {
      fetch(API_URL + 'reservasi/jadwal', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tanggal: tanggal,
          start_trip: startTrip,
          end_trip: endTrip,
        }),
      })
        .then(resp => resp.json())
        .then(json => {
          //console.log(json.jadwal);
          setJadwal(json.jadwal);
          setModalJadwal(true);
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
  };

  const selectedJadwal = ({item}: {item: any}) => {
    console.log('selectedJadwal------>', item.id);
    setJadwalSelectedItems(item);
    getDetailJadwal(item.id);
    setModalJadwal(false);
    setKursiSelected([]);
  };

  const getDetailJadwal = id => {
    setLoading(true);
    setDtJadwalId(id);
    console.log('getDetailJadwal:', id);
    var start_trip = initStartOutlet().id;
    var end_trip = initEndOutlet().id;
    var kd_trip = start_trip + '-' + end_trip;

    if (id != null || id != '') {
      fetch(API_URL + 'reservasi/details/' + id + '/' + kd_trip, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(resp => resp.json())
        .then(json => {
          console.log('harga_tiket --->',json.harga_tiket);
          setIdJadwal(json.jadwal.id_jadwal);
          setIdDtJadwal(json.jadwal.id);
          setItemJadwal(json.dt_layout);
          setPrice(json.harga_tiket);
          setKendaraan(json.kendaraan);
          setKdSopir(json.kd_sopir);
          setSopir(json.sopir);
          setKeberangkatan(json.keberangkatan);
          setKdKendaraan(json.keberangkatan.kd_kendaraan);
          setKdSopir(json.keberangkatan.kd_sopir);
          clearKursi();
          clearForm();
          setLoading(false);
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
  };

  const RenderItemOutletStart = ({item}) => {
    let kdOutlet = item['id'];
    let namaOutlet = item['name'];
    return (
      <View>
        <Text
          style={styles.itemTextStyle}
          onPress={() => getOtletItemStart(item)}>
          {'[' + kdOutlet + ']' + '  ' + namaOutlet}
        </Text>
        <View
          style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C8C8C8',
          }}
        />
      </View>
    );
  };

  const RenderItemOutletEnd = ({item}) => {
    let kdOutlet = item['id'];
    let namaOutlet = item['name'];
    return (
      <View>
        <Text
          style={styles.itemTextStyle}
          onPress={() => getOtletItemEnd(item)}>
          {'[' + kdOutlet + ']' + '  ' + namaOutlet}
        </Text>
        <View
          style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C8C8C8',
          }}
        />
      </View>
    );
  };

  const getOtletItemStart = item => {
    setVisibleForm(false);
    let kdOutlet = item['id'];
    // let namaOutlet =item['name'];
    setStartSelectedItems(item);
    getOutletEnd(kdOutlet);
    setModalStart(!modalStart);
  };

  const getOtletItemEnd = item => {
    // let kdOutlet =item['id'];
    // let namaOutlet =item['name'];
    setVisibleForm(false);
    setEndSelectedItems(item);
    setModalEnd(!modalEnd);
  };

  const refresh = () => {
    if (dtJadwalId != '') {
      getDetailJadwal(dtJadwalId);
    }
  };

  // State for layouts
  const [penumpang, setPenumpang] = useState([]);
  const [kursiSelected, setKursiSelected] = useState([]);
  const [selected, setSelected] = useState(false);

  let jewelStyle = idKursi => {
    const result = penumpang.find(element => element == parseInt(idKursi));
    if (result) {
      return {
        width: 67,
        height: 85,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7FC7D9',
      };
    } else {
      return {
        width: 67,
        height: 85,
        alignItems: 'center',
        justifyContent: 'center',
      };
    }
  };

  const setKursi = idKursi => {
    if (isMutasi) {
      let last_dt_reservasi_id = '';
      let new_nomor_kursi = idKursi;
      let id_dt_jadwal = idDtJadwal;
      AsyncStorage.getItem('last_dt_reservasi_id').then(value => {
        setLastDtReservasiId(value), (last_dt_reservasi_id = value);
      });

      var data = JSON.stringify({
        last_dt_reservasi_id: lastDtReservasiId,
        new_nomor_kursi,
        id_dt_jadwal,
        created_by: userId,
      });

      console.log(data);

      fetch(API_URL + 'reservasi/mutasi', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
      })
        .then(resp => resp.json())
        .then(json => {
          console.log(json);
          setIsMutasi(false);
          getDetailJadwal(id_dt_jadwal);
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    } else {
      const result = penumpang.find(element => element == parseInt(idKursi));
      console.log('result:', result);
      if (result) {
        console.log('ada');
        setSelected(false);
        setPenumpang(penumpang =>
          penumpang.filter(i => i !== parseInt(idKursi)),
        );
        //console.log(kursiSelected);
        const _inputs = kursiSelected.filter(
          index => index.key != parseInt(idKursi),
        );
        console.log(_inputs);
        setKursiSelected(_inputs);
      } else {
        console.log('gak ada');
        setSelected(true);
        setPenumpang(penumpang => [...penumpang, parseInt(idKursi)]);
        const _inputs = [...kursiSelected];
        _inputs.push({key: parseInt(idKursi), value: ''});
        setKursiSelected(_inputs);
      }
    }
  };

  const clearKursi = () => {
    setPenumpang([]);
  };

  const clearForm = () => {
    setLoading(false);
    setTelepon(null);
    setNamaPemesan(null);
    setKeterangan(null);
    setHargaTiket(null);
    setOutlet(null);
    setKursiSelected([]);
    setSelection(false);

    scrollRef.current.scrollTo({
      y: 0,
      animated: true,
    });
    setVisibleForm(true);
  };

  const infoKursi = dtreservasiId => {
    //console.log('Info Kursi id:', dtreservasiId);
    fetch(API_URL + 'reservasi/info_kursi/' + dtreservasiId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(json => {
        //console.log(json);
        //setPenumpang(json);
        //navigation.navigate('DetailPenumpang', {data: json});
        navigation.navigate('DetailPenumpang', {
          data: json,
          onGoBack: data => {
            // Callback function to handle data from ScreenB
            console.log(data.message);
            if (data.mutasi == true) {
              setIsMutasi(data.mutasi);
              setMessage(data.message);
              AsyncStorage.setItem(
                'last_dt_reservasi_id',
                data.dt_reservasi_id,
              );
            } else {
              getDetailJadwal(data.id_dt_jadwal);
            }
          },
        });
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  const editKursi = dtreservasiId => {
    //console.log('Info Kursi id:', dtreservasiId);
    fetch(API_URL + 'reservasi/info_kursi/' + dtreservasiId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(json => {
        navigation.navigate('EditPenumpang', {
          id_dt_jadwal: idDtJadwal,
          data: json,
          priceList: price,
          onGoBack: data => {
            // Callback function to handle data from ScreenB
            console.log(data.message);
            if (data.mutasi == true) {
              setIsMutasi(data.mutasi);
              setMessage(data.message);
              AsyncStorage.setItem(
                'last_dt_reservasi_id',
                data.dt_reservasi_id,
              );
            } else {
              getDetailJadwal(data.id_dt_jadwal);
            }
          },
        });
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  let Sususnankursi = () => {
    if (itemJadwal == null) {
      return <View style={styles.kolom}></View>;
    } else {
      return (
        <>
          {itemJadwal.map(function (data, i) {
            return (
              <View style={styles.kolom} key={i}>
                {data.col1 == 0 ? (
                  <View style={styles.sheat_blank}></View>
                ) : data.penumpang1 == null ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col1)}
                    onPress={() => setKursi(data.col1)}>
                    <ImageBackground
                      source={require('../../images/kursi_kosong.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <Text style={styles.nomorKursiKosong}>{data.col1}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                ) : data.penumpang1.css_kursi == 'renderkursibook' ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col1)}
                    onPress={() => editKursi(data.penumpang1.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang1.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_pesan.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col1}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang1.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                ) : data.penumpang1.css_kursi == 'renderkursibooktransit' ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col1)}
                    onPress={() => editKursi(data.penumpang1.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang1.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_pesan1.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col1}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang1.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                ) : data.penumpang1.css_kursi == 'renderkursikonfirmtransit' ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col1)}
                    onPress={() => editKursi(data.penumpang1.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang1.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_konfirm1.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col1}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang1.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={jewelStyle(data.col1)}
                    onPress={() => infoKursi(data.penumpang1.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang1.kd_trip}
                      </Text>
                    </View>

                    <ImageBackground
                      source={require('../../images/kursi_konfirm.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col1}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang1.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                )}

                {data.col2 == 0 ? (
                  <View style={styles.sheat_blank}></View>
                ) : data.penumpang2 == null ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col2)}
                    onPress={() => setKursi(data.col2)}>
                    <ImageBackground
                      source={require('../../images/kursi_kosong.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <Text style={styles.nomorKursiKosong}>{data.col2}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                ) : data.penumpang2.css_kursi == 'renderkursibook' ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col2)}
                    onPress={() => editKursi(data.penumpang2.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang2.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_pesan.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col2}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang2.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                ) : data.penumpang2.css_kursi == 'renderkursibooktransit' ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col2)}
                    onPress={() => editKursi(data.penumpang2.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang2.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_pesan1.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col2}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang2.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                ) : data.penumpang2.css_kursi == 'renderkursikonfirmtransit' ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col2)}
                    onPress={() => editKursi(data.penumpang2.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang2.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_konfirm1.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col2}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang2.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={jewelStyle(data.col2)}
                    onPress={() => infoKursi(data.penumpang2.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang2.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_konfirm.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col2}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang2.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                )}

                {data.col3 == 0 ? (
                  <View style={styles.sheat_blank}></View>
                ) : data.penumpang3 == null ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col3)}
                    onPress={() => setKursi(data.col3)}>
                    <ImageBackground
                      source={require('../../images/kursi_kosong.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <Text style={styles.nomorKursiKosong}>{data.col3}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                ) : data.penumpang3.css_kursi == 'renderkursibook' ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col3)}
                    onPress={() => editKursi(data.penumpang3.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang3.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_pesan.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col3}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang3.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                ) : data.penumpang3.css_kursi == 'renderkursibooktransit' ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col3)}
                    onPress={() => editKursi(data.penumpang3.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang3.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_pesan1.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col3}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang3.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                ) : data.penumpang3.css_kursi == 'renderkursikonfirmtransit' ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col3)}
                    onPress={() => editKursi(data.penumpang3.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang3.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_konfirm1.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col3}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang3.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={jewelStyle(data.col3)}
                    onPress={() => infoKursi(data.penumpang3.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang3.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_konfirm.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col3}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang3.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                )}

                {data.col4 == 100 ? (
                  <View
                    style={{
                      width: 67,
                      height: 80,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ImageBackground
                      source={require('../../images/icon_sopir.png')}
                      resizeMode="stretch"
                      style={styles.imageBackground}></ImageBackground>
                    <Text>SOPIR</Text>
                  </View>
                ) : data.penumpang4 == null ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col4)}
                    onPress={() => setKursi(data.col4)}>
                    <ImageBackground
                      source={require('../../images/kursi_kosong.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <Text style={styles.nomorKursiKosong}>{data.col4}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                ) : data.penumpang4.css_kursi == 'renderkursibook' ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col4)}
                    onPress={() => editKursi(data.penumpang4.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang4.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_pesan.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col4}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang4.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                ) : data.penumpang4.css_kursi == 'renderkursibooktransit' ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col4)}
                    onPress={() => editKursi(data.penumpang4.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang4.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_pesan1.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col4}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang4.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                ) : data.penumpang4.css_kursi == 'renderkursikonfirmtransit' ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col4)}
                    onPress={() => editKursi(data.penumpang4.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang4.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_konfirm1.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col4}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang4.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={jewelStyle(data.col4)}
                    onPress={() => infoKursi(data.penumpang4.id)}>
                    <View style={styles.ruteKursi}>
                      <Text style={styles.textRute}>
                        {data.penumpang4.kd_trip}
                      </Text>
                    </View>
                    <ImageBackground
                      source={require('../../images/kursi_konfirm.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                          {data.col4}
                        </Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang4.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </>
      );
    }
  };

  const [openPrice, setOpenPrice] = useState(false);
  const [valuePrice, setValuePrice] = useState(null);
  const [price, setPrice] = useState([]);
  const [openAngkutan, setOpenAngkutan] = useState(false);
  const [valueAngkutan, setValueAngkutan] = useState(null);
  const [angkutan, setAngkutan] = useState([
    {label: 'Dari Outlet ke Outlet', value: 'Dari Outlet ke Outlet'},
  ]);

  const [isSelected, setSelection] = useState(false);
  const [value, setValue] = useState(null);

  const [telepon, setTelepon] = useState(null);
  const [namaPemesan, setNamaPemesan] = useState(null);
  const [keterangan, setKeterangan] = useState(null);
  const [hargaTiket, setHargaTiket] = useState([]);
  const [discount, setDiscountt] = useState(null);
  const [outlet, setOutlet] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user_id').then(value => setUserId(value));
    AsyncStorage.getItem('username').then(value => setUsername(value));
    AsyncStorage.getItem('kd_outlet').then(value => setCsoKdOutlet(value));
    AsyncStorage.getItem('outlet').then(value => setCsoOutlet(value));
    AsyncStorage.getItem('kota').then(value => setCsoKota(value));
    AsyncStorage.getItem('bleMac').then(value => setBleMac(value));

    getOutletStart();
  }, [route.params?.post]);

  const inputHandler = (key, text) => {
    const _inputs = [...kursiSelected];
    let index = _inputs.findIndex(el => el.key === key);
    _inputs[index].value = text;
    _inputs[index].key = key;
    setKursiSelected(_inputs);
  };

  const check = () => {
    console.log('kursiSelected:', kursiSelected);
    console.log('count:', kursiSelected.length);
  };

  const penumpangSama = () => {
    setSelection(!isSelected);
    if (!isSelected) {
      kursiSelected.map((item, i) => {
        const _inputs = [...kursiSelected];
        _inputs[i].value = namaPemesan;
        _inputs[i].key = item.key;
        setKursiSelected(_inputs);
      });
    } else {
      kursiSelected.map((item, i) => {
        const _inputs = [...kursiSelected];
        _inputs[i].value = '';
        _inputs[i].key = item.key;
        setKursiSelected(_inputs);
      });
    }
  };

  const booking = () => {
    //setLoading(true);
    let start_trip = initStartOutlet().id;
    let end_trip = initEndOutlet().id;

    let data = JSON.stringify({
      tgl_keberangkatan: Moment(date).format('yyyy-MM-DD'),
      jam_keberangkatan: initJadwal().jam_berangkat,
      start_trip: initStartOutlet().id,
      end_trip: initEndOutlet().id,
      id_jadwal: idJadwal,
      id_dt_jadwal: idDtJadwal,
      kd_jadwal: initJadwal().kd_jadwal,
      telp_pemesan: telepon,
      email_pemesan: '',
      nama_pemesan: namaPemesan,
      keterangan: keterangan,
      kd_voucher: '',
      harga_tiket: hargaTiket,
      id_angkutan: outlet,
      discount_promo: '0',
      discount_voucher: '0',
      agen_pemesan: username,
      outlet_pemesan: csoKdOutlet,
      kd_outlet: csoKdOutlet,
      created_by: userId,
      psgArray: kursiSelected,
    });

    console.log(data);

    // if (start_trip != null && end_trip != null) {
    //   fetch(API_URL + 'reservasi/booking', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: data,
    //   })
    //     .then(resp => resp.json())
    //     .then(json => {
    //       console.log('-----------------------');
    //       console.log({json});
    //       getDetailJadwal(idDtJadwal);
    //     })
    //     .catch(error => console.error(error))
    //     .finally(() => setLoading(false));
    // }
  };

  const goshow = () => {
    setLoading(true);
    let start_trip = initStartOutlet().id;
    let end_trip = initEndOutlet().id;

    let data = JSON.stringify({
      tgl_keberangkatan: Moment(date).format('yyyy-MM-DD'),
      jam_keberangkatan: initJadwal().jam_berangkat,
      start_trip: initStartOutlet().id,
      end_trip: initEndOutlet().id,
      id_jadwal: idJadwal,
      id_dt_jadwal: idDtJadwal,
      kd_jadwal: initJadwal().kd_jadwal,
      telp_pemesan: telepon,
      email_pemesan: '',
      nama_pemesan: namaPemesan,
      keterangan: keterangan,
      kd_voucher: '',
      harga_tiket: hargaTiket,
      id_angkutan: outlet,
      discount_promo: '0',
      discount_voucher: '0',
      agen_pemesan: username,
      outlet_pemesan: csoKdOutlet,
      kd_outlet: csoKdOutlet,
      created_by: userId,
      psgArray: kursiSelected,
    });

    console.log(data);

    if (start_trip != null && end_trip != null) {
      fetch(API_URL + 'reservasi/goshow', {
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
          getDetailJadwal(idDtJadwal);
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
  };

  const setarmada = () => {
    console.log('setarmada');
    let data = JSON.stringify({
      id_dt_jadwal: idDtJadwal,
      kd_kendaraan: kdKendaraan,
      kd_sopir: kdSopir,
      created_by: userId,
    });

    console.log(data);
    fetch(API_URL + 'reservasi/setarmada', {
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
        setModalVisible(false);
        getDetailJadwal(idDtJadwal);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  const openmanifest =() =>{
    console.log('openmanifest:',dtJadwalId);
    if(kdSopir == ''){
      Alert.alert("Kendaraan dan Sopir belum di atur.");
    }else{
      fetch(API_URL + 'reservasi/getmanifest/' + dtJadwalId, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(resp => resp.json())
        .then(json => {
          navigation.navigate('Manifest', {
            data: json,
            onGoBack: data => {
              // Callback function to handle data from ScreenB
              console.log(data.message);
              getDetailJadwal(data.id_dt_jadwal);
            },
          });
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.jadwal}>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Icons name="calendar-month" color={'white'} size={24} />
              <Text
                style={{
                  marginLeft: 5,
                  marginBottom: 15,
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                {Moment(date).format('dddd, DD-MM-yyyy')}
              </Text>
              <TouchableOpacity
                style={{alignItems: 'flex-end'}}
                onPress={() => refresh()}>
                <Icons name="refresh" color={'white'} size={24} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => setModalStart(true)}>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: Colors.white, fontSize: 14}}>
                  OUTLET ASAL
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  {initStartOutlet().id}
                </Text>
                <Text style={{color: Colors.white, fontSize: 11}}>
                  {initStartOutlet().name}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalEnd(true)}>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: Colors.white, fontSize: 14}}>
                  OUTLET TUJUAN
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  {initEndOutlet().id}
                </Text>
                <Text style={{color: Colors.white, fontSize: 11}}>
                  {initEndOutlet().name}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getJadwal()}>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: Colors.white, fontSize: 14}}>JADWAL</Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  {initJadwal().jam_berangkat}
                </Text>
                <Text style={{color: Colors.white, fontSize: 11}}>
                  {initJadwal().kd_jadwal}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setVisibleForm(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <Modal
          statusBarTranslucent={true}
          animationType="fade"
          transparent={false}
          visible={modalStart}
          onRequestClose={() => {
            setVisibleForm(false);
            setModalStart(!modalStart);
          }}>
          <View style={{paddingBottom: 100}}>
            <View
              style={{
                height: 100,
                backgroundColor: colors.red,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                OUTLET ASAL
              </Text>
            </View>
            <SectionList
              keyExtractor={(item, index) => item + index}
              sections={startOutletDatasource}
              renderItem={RenderItemOutletStart}
              renderSectionHeader={({section: {title}}) => (
                <Text style={styles.headertext}>{title}</Text>
              )}
            />
          </View>
        </Modal>

        <Modal
          style={{paddingBottom: 100}}
          statusBarTranslucent={true}
          animationType="slide"
          transparent={false}
          visible={modalEnd}
          onRequestClose={() => {
            setVisibleForm(false);
            setModalEnd(!modalEnd);
          }}>
          <View style={{marginBottom: 100}}>
            <View
              style={{
                height: 100,
                backgroundColor: colors.red,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                OUTLET TUJUAN
              </Text>
            </View>
            <SectionList
              style={{}}
              keyExtractor={(item, index) => item + index}
              sections={endOutletDatasource}
              renderItem={RenderItemOutletEnd}
              renderSectionHeader={({section: {title}}) => (
                <Text style={styles.headertext}>{title}</Text>
              )}
            />
          </View>
        </Modal>

        <Modal
          statusBarTranslucent={true}
          animationType="slide"
          transparent={false}
          visible={modalJadwal}
          onRequestClose={() => {
            //Alert.alert('Modal has been closed.');
            setModalJadwal(!modalJadwal);
          }}>
          <View style={{bottom: 0}}>
            <View
              style={{
                height: 80,
                backgroundColor: colors.red,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginTop: 15,
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                JADWAL KEBERANGKATAN
              </Text>
            </View>
            <FlatList
              data={jadwal}
              //renderItem={({ item }) => <Text style={styles.item}>{item.id_jadwal}</Text>}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => selectedJadwal({item})}
                  //onPress={detailsJadwal}
                  style={styles.card}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.red,
                        width: '30%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 5,
                        borderRadius: 10,
                      }}>
                      <Text style={{color: 'white', fontSize: 12}}>
                        {item.start_kota}
                      </Text>
                      <Text style={{color: 'white', fontSize: 12}}>
                        {item.end_kota}
                      </Text>
                    </View>
                    <View style={{width: '70%', padding: 5}}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <View style={{marginLeft: 10}}>
                          <Text style={{fontSize: 11}}>
                            {item.jam_berangkat}
                          </Text>
                          <Text style={{fontSize: 11}}>
                            Kapasitas: {item.kapasitas}
                          </Text>
                          <Text style={{fontSize: 11, color: 'green'}}>
                            Sisa Kursi: {item.sisa_kursi}
                          </Text>
                        </View>
                        <View>
                          <Text style={{fontSize: 11}}>{item.layanan}</Text>
                          <Text style={{fontSize: 11}}>{item.kd_jadwal}</Text>
                          <Text style={{fontSize: 11, color: 'red'}}>
                            Rp.{item.harga}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </Modal>
        {isMutasi ? (
          <View
            style={{
              height: 60,
              padding: 10,
              backgroundColor: 'yellow',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{margin: 10}}>Anda dalam mode Mutasi!</Text>
            <TouchableOpacity
              style={{
                height: 40,
                width: 70,
                backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}
              onPress={() => setIsMutasi(false)}>
              <Text style={{color: 'white'}}>Batal</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>

      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setVisibleForm(false);
          setModalVisible(!modalVisible);
        }}>
        <View style={{paddingBottom: 100}}>
          <View
            style={{
              height: 100,
              backgroundColor: colors.red,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              Pengaturan Armada
            </Text>
          </View>
          <View style={{padding: 10}}>
            <View
              style={{
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: Colors.white,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <View style={styles.containerObj}>
                <Text>Manifest</Text>
                <Text style={{fontWeight: '700'}}>
                  {keberangkatan.manifest}
                </Text>
              </View>
              <View style={styles.containerObj}>
                <Text>Tanggal Manifest</Text>
                <Text style={{fontWeight: '700'}}>
                  {keberangkatan.tgl_manifest}
                </Text>
              </View>

              <View style={styles.containerObj}>
                <Text>Kendaraan</Text>
                <Text style={{fontWeight: '700'}}>
                  {keberangkatan.kendaraan}
                </Text>
              </View>

              <View style={styles.containerObj}>
                <Text>Nama Sopir</Text>
                <Text style={{fontWeight: '700'}}>
                  {keberangkatan.nama_sopir + ' ' + keberangkatan.nrp}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: Colors.white,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Text style={{marginLeft: 10}}>Kendaraan</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={kendaraan}
                search
                maxHeight={300}
                labelField="label"
                valueField="kd_kendaraan"
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setKdKendaraan(item.kd_kendaraan);
                }}
                renderLeftIcon={() => (
                  <IconFa5
                    style={styles.icon}
                    color="black"
                    name="car"
                    size={20}
                  />
                )}
              />

              <Text style={{marginLeft: 10}}>Sopir</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={sopir}
                search
                maxHeight={300}
                labelField="label"
                valueField="kd_sopir"
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setKdSopir(item.kd_sopir);
                }}
                renderLeftIcon={() => (
                  <IconFa5
                    style={styles.icon}
                    color="black"
                    name="user"
                    size={20}
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.boxRow}>
            <TouchableOpacity style={styles.buttonBayar} onPress={() => openmanifest()}>
              <Text style={{color: 'white'}}>Cetak Manifest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonBayar}
              onPress={() => setarmada()}>
              <Text style={{color: 'white'}}>Simpan</Text>
            </TouchableOpacity>
            {/*<CetakTiket></CetakTiket>*/}
            <TouchableOpacity
              style={styles.buttonMutasi}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{color: 'red'}}>Kembali</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView
        style={{marginBottom: 80}}
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={styles.car}>
            {visibleForm ? (
              <>
                <Legent />
                <Sususnankursi />

                <View
                  style={{
                    marginTop: 10,
                    borderRadius: 10,
                    backgroundColor: Colors.white,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}>
                  <View
                    style={{
                      height: 50,
                      justifyContent: 'center',
                      borderBottomWidth: 0.5,
                    }}>
                    <Text
                      style={{
                        marginLeft: 16,
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      DATA PEMESAN
                    </Text>
                  </View>
                  <View style={{padding: 10}}>
                    <View style={{marginTop: 2}} />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TextInput
                        keyboardType="number-pad"
                        style={{backgroundColor: Colors.white, width: '60%'}}
                        label="Telepon Pemesan"
                        left={<TextInput.Icon icon="cellphone" />}
                        value={telepon}
                        onChangeText={newText => setTelepon(newText)}
                      />
                      <TouchableOpacity style={styles.buttonCheck}>
                        <Text style={{color: 'white'}}>Check Member</Text>
                      </TouchableOpacity>
                      {/* <Button title="Check Member" onPress={check} /> */}
                    </View>

                    <TextInput
                      style={{backgroundColor: Colors.white}}
                      label="Nama Pemesan"
                      left={<TextInput.Icon icon="account-box" />}
                      value={namaPemesan}
                      onChangeText={newText => setNamaPemesan(newText)}
                    />
                    <TextInput
                      style={{backgroundColor: Colors.white}}
                      label="Keterangan"
                      left={<TextInput.Icon icon="information" />}
                      value={keterangan}
                      onChangeText={newText => setKeterangan(newText)}
                    />

                    <Text style={{marginLeft: 10}}>Jenis Discount</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={price}
                      // search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      searchPlaceholder="Search..."
                      value={value}
                      onChange={item => {
                        setHargaTiket(item);
                      }}
                      renderLeftIcon={() => (
                        <IconFa5
                          style={styles.icon}
                          color="black"
                          name="money-bill"
                          size={20}
                        />
                      )}
                    />

                    <Text style={{marginLeft: 10}}>Jenis Angkutan</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={angkutan}
                      // search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      searchPlaceholder="Search..."
                      value={value}
                      onChange={item => {
                        setOutlet(item.value);
                      }}
                      renderLeftIcon={() => (
                        <IconFa5
                          style={styles.icon}
                          color="black"
                          name="caravan"
                          size={20}
                        />
                      )}
                    />
                    <View
                      style={{
                        backgroundColor: Colors.white,
                        marginBottom: 10,
                      }}></View>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    borderRadius: 10,
                    backgroundColor: Colors.white,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}>
                  <View
                    style={{
                      height: 50,
                      justifyContent: 'center',
                      borderBottomWidth: 0.5,
                    }}>
                    <Text
                      style={{
                        marginLeft: 16,
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      DATA PENUMPANG
                    </Text>
                  </View>
                  <View style={{padding: 10}}>
                    <View
                      style={{
                        height: 50,
                        paddingLeft: 10,
                        backgroundColor: Colors.white,

                        borderBottomWidth: 0.5,
                        borderBottomColor: 'black',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Checkbox
                        status={isSelected ? 'checked' : 'unchecked'}
                        onPress={() => {
                          penumpangSama();
                        }}
                      />
                      <Text style={{marginLeft: 10}}>
                        Centang jika nama penumpang sama
                      </Text>
                    </View>

                    {kursiSelected.map((input, key) => (
                      <TextInput
                        key={key}
                        style={{backgroundColor: Colors.white}}
                        label={'Nama penumpang ' + input.key}
                        left={<TextInput.Icon icon="account-box" />}
                        value={input.value}
                        onChangeText={text => inputHandler(input.key, text)}
                      />
                    ))}
                  </View>
                </View>
              </>
            ) : (
              <></>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomView}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              marginLeft: 10,
              borderRadius: 7,
            }}
            onPress={() => goshow()}>
            <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
              GO SHOW
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              marginLeft: 10,
              borderRadius: 7,
            }}
            onPress={() => booking()}>
            <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
              BOOKING
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'red',
            padding: 10,
            marginRight: 10,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
            IN
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgcolor,
  },
  boxRow: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jadwal: {
    backgroundColor: '#C40C0C',
    padding: 10,
  },
  card: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
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

  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },

  headertext: {
    fontSize: 14,
    paddingVertical: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
    backgroundColor: 'red',
    color: 'white',
    margin: 5,
    letterSpacing: 1,
  },
  itemTextStyle: {
    fontSize: 14,
    paddingVertical: 7,
    paddingLeft: 20,
    color: 'black',
    letterSpacing: 1,
    borderRadius: 4,
  },

  car: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    //alignItems: 'center',
  },
  sheat: {
    width: 60,
    height: 70,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    // borderColor: bdcolor,
    // backgroundColor: bgcolor,
  },
  sandaran: {
    width: 60,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    // borderColor: bdcolor,
  },

  kolom: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBackground: {
    width: 60,
    height: 75,
    flexDirection: 'column',
    alignItems: 'center',
  },
  ruteKursi: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 20,
    backgroundColor: 'yellowgreen',
  },
  textRute: {
    fontSize: 9,
  },
  sheat_blank: {
    width: 50,
    height: 60,
  },
  sheat_number: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: 'bold',
  },
  name: {
    marginTop: 20,
    fontSize: 11,
    color: Colors.black,
    fontWeight: 'bold',
    backgroundColor: 'yellow',
  },
  modeBayar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: -20,
    width: 70,
    height: 25,
  },
  nomorKursiKosong: {
    marginTop: 13,
    fontSize: 14,
    color: Colors.black,
    fontWeight: 'bold',
  },
  numberBooked: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'green',
    position: 'absolute',
    top: 1,
    right: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },

  bottomView: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    position: 'absolute', //Here is the trick
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 0, //Here is the trick
  },

  dropdown: {
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    backgroundColor: Colors.white,
  },
  icon: {
    marginLeft: 16,
    marginRight: 20,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  inputsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  buttonCheck: {
    width: '40%',
    height: 40,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonModal: {
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
  containerObj: {
    height: 50,
    paddingLeft: 10,
    backgroundColor: Colors.white,
  },
});
export default TiketScreen;
