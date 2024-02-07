import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';

import TicketSchedule from '../../components/TicketSchedule';
import CarSeatLayouts from '../../components/CarSeatLayouts';
import TicketForm from '../../components/TicketForm';

const TiketScreen = ({navigation}: {navigation: any}) => {
  const [modalJadwal, setModalJadwal] = useState(false);
  const [startSelectedItems, setStartSelectedItems] = useState([
    {
      kota: [
        {
          kota: 'BANDUNG',
        },
        {
          kota: 'BEKASI',
        },
        {
          kota: 'INDRAMAYU',
        },
        {
          kota: 'JAKARTA',
        },
        {
          kota: 'KARAWANG',
        },
        {
          kota: 'PURWAKARTA',
        },
        {
          kota: 'SUBANG',
        },
        {
          kota: 'SUKABUMI',
        },
        {
          kota: 'SUMEDANG',
        },
      ],
      childrens: [
        {
          id: 'BUBAT',
          kota: 'BANDUNG',
          name: 'BUAH BATU',
        },
        {
          id: 'CLY',
          kota: 'BANDUNG',
          name: 'CILEUNYI',
        },
        {
          id: 'DGO',
          kota: 'BANDUNG',
          name: 'DAGO',
        },
        {
          id: 'PST',
          kota: 'BANDUNG',
          name: 'PASTEUR',
        },
        {
          id: 'KM.125',
          kota: 'BANDUNG',
          name: 'REST AREA KM.125',
        },
        {
          id: 'CKR',
          kota: 'BEKASI',
          name: 'CIKARANG',
        },
        {
          id: 'LIPPO',
          kota: 'BEKASI',
          name: 'LIPPO',
        },
        {
          id: 'PSK',
          kota: 'BEKASI',
          name: 'PASIR KONCI',
        },
        {
          id: 'HGS',
          kota: 'INDRAMAYU',
          name: 'HAURGEULIS',
        },
        {
          id: 'BLR',
          kota: 'JAKARTA',
          name: 'BLORA',
        },
        {
          id: 'KPR',
          kota: 'JAKARTA',
          name: 'KP RAMBUTAN',
        },
        {
          id: 'KNG',
          kota: 'JAKARTA',
          name: 'KUNINGAN',
        },
        {
          id: 'PGC',
          kota: 'JAKARTA',
          name: 'PGC',
        },
        {
          id: 'GLM',
          kota: 'KARAWANG',
          name: 'GALUH MAS',
        },
        {
          id: 'BADAMI',
          kota: 'KARAWANG',
          name: 'RUKO PERUMNAS',
        },
        {
          id: 'SDG',
          kota: 'PURWAKARTA',
          name: 'SADANG',
        },
        {
          id: 'XJT',
          kota: 'SUBANG',
          name: 'KALIJATI',
        },
        {
          id: 'SBG',
          kota: 'SUBANG',
          name: 'SUBANG',
        },
        {
          id: 'CBD',
          kota: 'SUKABUMI',
          name: 'CIBADAK',
        },
        {
          id: 'SKB',
          kota: 'SUKABUMI',
          name: 'SUKABUMI',
        },
        {
          id: 'SMD',
          kota: 'SUMEDANG',
          name: 'SUMEDANG',
        },
      ],
    },
  ]);
  const [endSelectedItems, setEndSelectedItems] = useState([
    {
      kota: [
        {
          kota: 'BANDUNG',
        },
        {
          kota: 'BEKASI',
        },
        {
          kota: 'INDRAMAYU',
        },
        {
          kota: 'JAKARTA',
        },
        {
          kota: 'KARAWANG',
        },
        {
          kota: 'PURWAKARTA',
        },
        {
          kota: 'SUBANG',
        },
        {
          kota: 'SUKABUMI',
        },
        {
          kota: 'SUMEDANG',
        },
      ],
      childrens: [
        {
          id: 'BUBAT',
          kota: 'BANDUNG',
          name: 'BUAH BATU',
        },
        {
          id: 'CLY',
          kota: 'BANDUNG',
          name: 'CILEUNYI',
        },
        {
          id: 'DGO',
          kota: 'BANDUNG',
          name: 'DAGO',
        },
        {
          id: 'PST',
          kota: 'BANDUNG',
          name: 'PASTEUR',
        },
        {
          id: 'KM.125',
          kota: 'BANDUNG',
          name: 'REST AREA KM.125',
        },
        {
          id: 'CKR',
          kota: 'BEKASI',
          name: 'CIKARANG',
        },
        {
          id: 'LIPPO',
          kota: 'BEKASI',
          name: 'LIPPO',
        },
        {
          id: 'PSK',
          kota: 'BEKASI',
          name: 'PASIR KONCI',
        },
        {
          id: 'HGS',
          kota: 'INDRAMAYU',
          name: 'HAURGEULIS',
        },
        {
          id: 'BLR',
          kota: 'JAKARTA',
          name: 'BLORA',
        },
        {
          id: 'KPR',
          kota: 'JAKARTA',
          name: 'KP RAMBUTAN',
        },
        {
          id: 'KNG',
          kota: 'JAKARTA',
          name: 'KUNINGAN',
        },
        {
          id: 'PGC',
          kota: 'JAKARTA',
          name: 'PGC',
        },
        {
          id: 'GLM',
          kota: 'KARAWANG',
          name: 'GALUH MAS',
        },
        {
          id: 'BADAMI',
          kota: 'KARAWANG',
          name: 'RUKO PERUMNAS',
        },
        {
          id: 'SDG',
          kota: 'PURWAKARTA',
          name: 'SADANG',
        },
        {
          id: 'XJT',
          kota: 'SUBANG',
          name: 'KALIJATI',
        },
        {
          id: 'SBG',
          kota: 'SUBANG',
          name: 'SUBANG',
        },
        {
          id: 'CBD',
          kota: 'SUKABUMI',
          name: 'CIBADAK',
        },
        {
          id: 'SKB',
          kota: 'SUKABUMI',
          name: 'SUKABUMI',
        },
        {
          id: 'SMD',
          kota: 'SUMEDANG',
          name: 'SUMEDANG',
        },
      ],
    },
  ]);
  const [itemJadwal, setItemJadwal] = useState();
  const [dtLayouts, setDtLayouts] = useState();
  const [startOutlet, setStartOutlet] = useState([]);
  const [endOutlet, setEndOutlet] = useState([]);
  const [jadwal, setJadwal] = useState([]);
  const [detailJadwal, setDetailJadwal] = useState([]);
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState([
    {
      id: 1,
      name: 'JavaScript',
    },
    {
      id: 2,
      name: 'Java',
    },
    {
      id: 3,
      name: 'Ruby',
    },
    {
      id: 4,
      name: 'React Native',
    },
    {
      id: 5,
      name: 'PHP',
    },
    {
      id: 6,
      name: 'Python',
    },
    {
      id: 7,
      name: 'Go',
    },
    {
      id: 8,
      name: 'Swift',
    },
  ]);

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

  useEffect(() => {
    //console.log('itemJadwal',itemJadwal);
  }, []);

  const detailsJadwal = useCallback((items) => {
    //console.log('parent id Jadwal:',items.jadwal.id);
    setDtLayouts(items.dt_layout);
    //console.log('dt Layouts:',dtLayouts);
 },[dtLayouts]);


  return (
    <SafeAreaView style={styles.container}>
      <TicketSchedule detailsJadwal={detailsJadwal}/>
      <ScrollView style={{marginBottom: 60}}>
        { dtLayouts ? <View>
          <CarSeatLayouts navigation={navigation} items={dtLayouts} />
          <TicketForm />
        </View> : <View></View>}
        
        {/* <CarSeatLayouts items={itemJadwal} />
        <TicketForm /> */}
      </ScrollView>

      <View style={styles.bottomView}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{backgroundColor: 'red', padding: 10, marginLeft: 10}}
            onPress={() => navigation.navigate('Penumpang')}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              GO SHOW
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: 'red', padding: 10, marginLeft: 10}}
            onPress={() => navigation.navigate('Paket')}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
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
          onPress={() => navigation.navigate('Paket')}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
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
});
export default TiketScreen;
