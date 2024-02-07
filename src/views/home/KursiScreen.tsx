import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const KursiScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.jadwal}>
        <Text
          style={{
            marginBottom: 10,
            color: Colors.white,
            fontSize: 18,
            fontWeight: '600',
          }}>
          Minggu, 17 September 2023
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: Colors.white, fontSize: 14}}>OUTLET ASAL</Text>
            <Text
              style={{color: Colors.white, fontSize: 18, fontWeight: '600'}}>
              DGO
            </Text>
            <Text style={{color: Colors.white, fontSize: 11}}>DAGO</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: Colors.white, fontSize: 14}}>
              OUTLET TUJUAN
            </Text>
            <Text
              style={{color: Colors.white, fontSize: 18, fontWeight: '600'}}>
              CKR
            </Text>
            <Text style={{color: Colors.white, fontSize: 11}}>CIKARANG</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: Colors.white, fontSize: 14}}>JADWAL</Text>
            <Text
              style={{color: Colors.white, fontSize: 18, fontWeight: '600'}}>
              07:00
            </Text>
            <Text style={{color: Colors.white, fontSize: 11}}>
              DGO-CKR-0700
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.car}>
        <View style={styles.kolom}>
          <View style={styles.sheat}>
            <Text style={styles.nomor}>14</Text>
            <Text style={styles.nama}>RINA</Text>
            <View style={styles.sandaran}></View>
          </View>
          <View style={styles.sheat_blank}></View>
          <View style={styles.sheat_blank}></View>
          <View style={styles.sheat}>
            <Text
              style={{fontSize: 14, color: Colors.black, fontWeight: 'bold'}}>
              SOPIR
            </Text>
            <View style={styles.sandaran}></View>
          </View>
        </View>

        <View style={styles.kolom}>
          <View style={styles.sheat_blank}></View>
          <View style={styles.sheat}>
            <Text style={styles.nomor}>1</Text>
            <View style={styles.sandaran}></View>
          </View>
          <View style={styles.sheat}>
            <Text style={styles.nomor}>2</Text>
            <View style={styles.sandaran}></View>
          </View>
          <View style={styles.sheat}>
            <Text style={styles.nomor}>3</Text>
            <View style={styles.sandaran}></View>
          </View>
        </View>

        <View style={styles.kolom}>
          <View style={styles.sheat}>
            <Text style={styles.nomor}>4</Text>
            <View style={styles.sandaran}></View>
          </View>
          <View style={styles.sheat_blank}></View>
          <View style={styles.sheat}>
            <Text style={styles.nomor}>5</Text>
            <View style={styles.sandaran}></View>
          </View>
          <View style={styles.sheat}>
            <Text style={styles.nomor}>6</Text>
            <View style={styles.sandaran}></View>
          </View>
        </View>
        <View style={styles.kolom}>
          <View style={styles.sheat}>
          <Text style={styles.nomor}>7</Text>
            <View style={styles.sandaran}></View>
          </View>
          <View style={styles.sheat_blank}></View>
          <View style={styles.sheat}>
          <Text style={styles.nomor}>8</Text>
            <View style={styles.sandaran}></View>
          </View>
          <View style={styles.sheat}>
          <Text style={styles.nomor}>9</Text>
            <View style={styles.sandaran}></View>
          </View>
        </View>
        <View style={styles.kolom}>
          <View style={styles.sheat}>
          <Text style={styles.nomor}>10</Text>
            <View style={styles.sandaran}></View>
          </View>
          <View style={styles.sheat}>
          <Text style={styles.nomor}>11</Text>
            <View style={styles.sandaran}></View>
          </View>
          <View style={styles.sheat}>
          <Text style={styles.nomor}>12</Text>
            <View style={styles.sandaran}></View>
          </View>
          <View style={styles.sheat}>
          <Text style={styles.nomor}>13</Text>
            <View style={styles.sandaran}></View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  jadwal: {
    backgroundColor: 'red',
    padding: 10,
  },
  car: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    //alignItems: 'center',
  },
  kolom: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sheat: {
    width: 60,
    height: 70,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'purple',
  },
  sandaran: {
    width: 60,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'purple',
  },
  sheat_blank: {
    width: 50,
    height: 60,
  },
  nomor: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: 'bold',
  },
  nama: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: 'bold',
  },
});
export default KursiScreen;
