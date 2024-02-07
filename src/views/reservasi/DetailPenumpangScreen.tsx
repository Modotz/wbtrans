import React, {useState, useEffect} from 'react';
import IconFa5 from 'react-native-vector-icons/dist/FontAwesome5';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

export default function DetailPenumpangScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginBottom: 0}}>
        <View
          style={{margin: 10, borderRadius: 10, backgroundColor: Colors.white}}>
          <View
            style={{
              flexDirection:'row',
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
            <Text style={{ fontSize: 14, fontWeight: 'bold'}}>
              PENUMPANG
            </Text>
          </View>
          <View style={{padding: 10}}>
            <View style={styles.containerObj}>
              <Text>No Booking</Text>
              <Text style={{fontWeight: '700'}}>BWT037483839ZN</Text>
            </View>
            <View style={styles.containerObj}>
              <Text>No Tiket</Text>
              <Text style={{fontWeight: '700'}}>TWBT037483839QAT</Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Nama Penumpang</Text>
              <Text style={{fontWeight: '700'}}>INDRA PRAKOSO</Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Telp Penumpang</Text>
              <Text style={{fontWeight: '700'}}>085776557584</Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Keterangan</Text>
              <Text style={{fontWeight: '700'}}></Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Drop Point</Text>
              <Text style={{fontWeight: '700'}}>085776557584</Text>
            </View>
          </View>
        </View>

        <View
          style={{margin: 10, borderRadius: 10, backgroundColor: Colors.white}}>
          <View
            style={{
              flexDirection:'row',
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
            <Text style={{ fontSize: 14, fontWeight: 'bold'}}>
              INFORMASI
            </Text>
          </View>
          <View style={{padding: 10}}>
            <View style={styles.containerObj}>
              <Text>CSO Pemesan</Text>
              <Text style={{fontWeight: '700'}}>SUKABUMI</Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Waktu Pesan</Text>
              <Text style={{fontWeight: '700'}}>26 Jan 2024 07:26</Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Waktu Bayar</Text>
              <Text style={{fontWeight: '700'}}>26 Jan 2024 08:00</Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Pembayaran</Text>
              <Text style={{fontWeight: '700'}}>TUNAI</Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Outlet Bayar</Text>
              <Text style={{fontWeight: '700'}}>DAGO</Text>
            </View>
            <View style={styles.containerObj}>
              <Text>CSO Cetak Tiket</Text>
              <Text style={{fontWeight: '700'}}>LINDA VIDIYANTI</Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Waktu Boarding</Text>
              <Text style={{fontWeight: '700'}}></Text>
            </View>
          </View>
        </View>

        <View
          style={{margin: 10, borderRadius: 10, backgroundColor: Colors.white}}>
          <View
            style={{
              flexDirection:'row',
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
            <Text style={{ fontSize: 14, fontWeight: 'bold'}}>
              TARIF
            </Text>
          </View>
          <View style={{padding: 10}}>
            <View style={styles.containerObj}>
              <Text>Harga Tiket</Text>
              <Text style={{fontWeight: '700'}}>Rp. 70.000</Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Jenis Discount</Text>
              <Text style={{fontWeight: '700'}}>Rp. 0</Text>
            </View>
            <View style={styles.containerObj}>
              <Text>Total</Text>
              <Text style={{fontWeight: '700'}}>Rp. 0</Text>
            </View>
          </View>
        </View>
        <View style={styles.boxRow}>
            <TouchableOpacity style={styles.buttonBayar}>
                <Text style={{color:'white'}}>CETAK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonMutasi}>
                <Text style={{color:'red'}}>Mutasi</Text>
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
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  boxRow: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBayar: {
    flex:1,
    height:40,
    margin:5,
    borderRadius:5,
    backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonMutasi: {
    flex:1,
    height:40,
    margin:5,
    borderRadius:5,
    borderWidth:1,
    backgroundColor:'white',
    borderColor:'red',
    alignItems:'center',
    justifyContent:'center'
  },
});
