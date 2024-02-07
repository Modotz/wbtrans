import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  SectionList,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';

function TicketSchedule({detailsJadwal}) {
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
  const [detailJadwal, setDetailJadwal] = useState([]);
  const [loading, setLoading] = useState(true);

  //keberangkatan
  const [sectionListDataSource, setSectionListDataSource] = useState([]);
  // End

  const [itemJadwal, setItemJadwal] = useState([]);

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
    fetch(
      'http://192.168.100.5:8088/trans/api/reservasi/outlets_asal',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(resp => resp.json())
      .then(json => {
        setStartOutletDatasource(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  const getOutletEnd = (kd_outlet) => {
    fetch('http://192.168.100.5:8088/trans/api/reservasi/outlets_tujuan/'+kd_outlet, {
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
    var tanggal = Moment(date).format('yyyy-MM-DD');
    var startTrip = initStartOutlet().id;
    var endTrip = initEndOutlet().id;
    console.log('tanggal---------------->', tanggal);
    console.log('startTrip---------------->', startTrip);
    console.log('endTrip---------------->', endTrip);
    if (startTrip != null && endTrip != null) {
      fetch('http://192.168.100.5:8088/trans/api/reservasi/jadwal', {
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
  };

  const getDetailJadwal = id => {
    if (id != null || id != '') {
      fetch('http://192.168.100.5:8088/trans/api/reservasi/details/' + id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(resp => resp.json())
        .then(json => {
          //console.log('bind json', json.layout);
          // set call back
          //data di kirim ke parent
          setItemJadwal(detailsJadwal(json));
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    getOutletStart();
  }, []);

  //---------------------------------

  const RenderItemOutletStart = ({item}) => {
    let kdOutlet =item['id'];
    let namaOutlet =item['name'];
    return (
      <View>
        <Text style={styles.itemTextStyle} onPress={() => getOtletItemStart(item)}>
          {'['+kdOutlet+']'+ '  ' + namaOutlet}
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
    let kdOutlet =item['id'];
    let namaOutlet =item['name'];
    return (
      <View>
        <Text style={styles.itemTextStyle} onPress={() => getOtletItemEnd(item)}>
          {'['+kdOutlet+']'+ '  ' + namaOutlet}
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
    let kdOutlet =item['id'];
    // let namaOutlet =item['name'];
    setStartSelectedItems(item);
    getOutletEnd(kdOutlet);
    setModalStart(!modalStart);
  };

  const getOtletItemEnd = item => {
    // let kdOutlet =item['id'];
    // let namaOutlet =item['name'];
    setEndSelectedItems(item);
    setModalEnd(!modalEnd);
  };

  //--------------------------------

  return (
    <View>
      <View style={styles.jadwal}>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <View style={{flexDirection: 'row'}}>
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
          </View>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => setModalStart(true)}>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: Colors.white, fontSize: 14}}>
                OUTLET ASAL
              </Text>
              <Text
                style={{color: Colors.white, fontSize: 18, fontWeight: '600'}}>
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
                style={{color: Colors.white, fontSize: 18, fontWeight: '600'}}>
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
                style={{color: Colors.white, fontSize: 18, fontWeight: '600'}}>
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
          setModalStart(!modalStart);
        }}>
        <View style={{bottom: 0,}}>
          <View style={{height:100, backgroundColor:'red',alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>OUTLET ASAL</Text>
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
        statusBarTranslucent={true}
        animationType="slide"
        transparent={false}
        visible={modalEnd}
        onRequestClose={() => {
          setModalEnd(!modalEnd);
        }}>
        <View style={{bottom: 0,}}>
          <View style={{height:100, backgroundColor:'red',alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>OUTLET TUJUAN</Text>
          </View>
          <SectionList
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
        <View style={{paddingTop: 20}}>
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
                      backgroundColor: 'red',
                      width: '30%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                    }}>
                    <Text style={{color: 'white'}}>{item.start_kota}</Text>
                    <Text style={{color: 'white'}}>{item.end_kota}</Text>
                  </View>
                  <View style={{width: '70%', padding: 5}}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <View style={{marginLeft: 10}}>
                        <Text>{item.jam_berangkat}</Text>
                        <Text>Sisa Kursi: {item.id_rute}</Text>
                        <Text>Rp. 85.000</Text>
                      </View>
                      <View>
                        <Text>{item.layanan}</Text>
                        <Text>{item.kd_jadwal}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  jadwal: {
    backgroundColor: 'red',
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
    paddingVertical:5,
    paddingLeft:10,
    fontWeight: 'bold',
    backgroundColor: 'red',
    color: 'white',
    margin: 5,
    letterSpacing: 1,
  },
  itemTextStyle: {
    fontSize: 14,
    paddingVertical:7,
    paddingLeft:20,
    color: 'black',
    letterSpacing: 1,
    borderRadius: 4,
  },
});

export default TicketSchedule;
