import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import Legent from '../components/Legent';
import {Colors} from 'react-native/Libraries/NewAppScreen';

/**
 * Stateless Functional Component SFC to render rows of CarSeatLayouts.
 */
function CarSeatLayouts({navigation,items}:{navigation: any,items: any}) {
  const [layout, setLayout] = useState();
  const [penumpang, setPenumpang] = useState([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    clearKursi();
    console.log('Clear penumpang');
    // setPenumpang([]);
  }, []);

  let jewelStyle = (idKursi : {idKursi :any}) => {
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
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    //const result = penumpang.find(({ name }) => name === idKursi);

    const result = penumpang.find(element => element == parseInt(idKursi));
    console.log('result:', result);
    if (result) {
      console.log('ada');
      setSelected(false);
      setPenumpang(penumpang => penumpang.filter(i => i !== parseInt(idKursi)));
    } else {
      console.log('gak ada');
      setSelected(true);
      setPenumpang(penumpang => [...penumpang, parseInt(idKursi)]);
    }
  };

  const clearKursi = () => {
    setPenumpang([]);
  };

  const infoKursi = idKursi => {
    console.log('Info Kursi id:', idKursi);
    console.log('penumpang :', penumpang);
    navigation.navigate('DetailPenumpang')
  };

  let Sususnankursi = () => {
    if (items == null) {
      return (
        <View style={styles.kolom}>
          <View style={styles.sheat}>
            <Text style={styles.sheat_number}>14</Text>
            <Text style={styles.name}>kosong</Text>
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
      );
    } else {
      return (
        <>
          {items.map(function (data, i) {
            return (
              <View style={styles.kolom} key={i}>
                {data.col1 == 0 ? (
                  <View style={styles.sheat_blank}></View>
                ) : data.penumpang1 == null ? (
                  // style={jewelStyle(data.col1)}
                  // <TouchableOpacity  style={jewelStyle(data.col1)} onPress={() => setKursi(data.col1)}>
                  //   <ImageBackground source={require('../images/kursi_kosong.gif')} style={{resizeMode: 'stretch'}}>
                  //   <Text style={styles.sheat_number}>{data.col1}</Text>
                  //   <Text key={`text-${i}`} ref={(thisItem) => this[`text-${i}`] = thisItem} >iii</Text>
                  //   <View style={styles.sandaranSelected}></View>
                  //   </ImageBackground>
                  // </TouchableOpacity>
                  <TouchableOpacity
                    style={jewelStyle(data.col1)}
                    onPress={() => setKursi(data.col1)}>
                    <ImageBackground
                      source={require('../images/kursi_kosong.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <Text style={styles.nomorKursiKosong}>{data.col1}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={jewelStyle(data.col1)}
                    onPress={() => infoKursi(data.col1)}>
                    <View style={styles.ruteKursi}>
                      <Text>{data.rute}</Text>
                    </View>
                    
                    <ImageBackground
                      source={require('../images/kursi_pesan.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize:10, fontWeight:'bold'}}>{data.col1}</Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang1.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../images/ic_jp_tunai.png')}></Image>
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
                      source={require('../images/kursi_kosong.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <Text style={styles.nomorKursiKosong}>{data.col2}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                ) : (
                  // <TouchableOpacity
                  //   key={data.col2}
                  //   style={styles.sheat('#BFCFE7', '#525CEB')}
                  //   onPress={() => infoKursi(data.col2)}>
                  //   <Text style={styles.sheat_number}>{data.col2}</Text>
                  //   <Text style={styles.name}>
                  //     {data.penumpang2.nama_penumpang}
                  //   </Text>
                  //   <View style={styles.sandaran('#525CEB')}></View>
                  // </TouchableOpacity>
                  <TouchableOpacity
                    style={jewelStyle(data.col2)}
                    onPress={() => infoKursi(data.col2)}>
                    <View style={styles.ruteKursi}>
                      <Text>{data.rute}</Text>
                    </View>
                    <ImageBackground
                      source={require('../images/kursi_pesan.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize:10, fontWeight:'bold'}}>{data.col2}</Text>
                      </View>
                      <Text style={styles.name}>
                        {data.penumpang2.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../images/ic_jp_tunai.png')}></Image>
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
                      source={require('../images/kursi_kosong.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <Text style={styles.nomorKursiKosong}>{data.col3}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={jewelStyle(data.col3)}
                    onPress={() => infoKursi(data.col3)}>
                    <View
                      style={styles.ruteKursi}>
                      <Text>{data.rute}</Text>
                    </View>
                    <ImageBackground
                      source={require('../images/kursi_konfirm.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize:10, fontWeight:'bold'}}>{data.col3}</Text>
                      </View>
                      <Text
                        style={styles.name}>
                        {data.penumpang3.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View
                      style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../images/ic_jp_tunai.png')}></Image>
                    </View>
                  </TouchableOpacity>
                )}

                {data.col4 == 100 ? (
                  <View style={{width: 67,
                    height: 80,
                    alignItems: 'center',
                    justifyContent: 'center',}}>
                    <ImageBackground
                      source={require('../images/icon_sopir.png')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                    </ImageBackground>
                    <Text >SOPIR</Text>
                  </View>
                ) : data.penumpang4 == null ? (
                  <TouchableOpacity
                    style={jewelStyle(data.col4)}
                    onPress={() => setKursi(data.col4)}>
                    <ImageBackground
                      source={require('../images/kursi_kosong.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <Text style={styles.nomorKursiKosong}>{data.col4}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={jewelStyle(data.col4)}
                    onPress={() => infoKursi(data.col4)}>
                    <View
                      style={styles.ruteKursi}>
                      <Text>{data.rute}</Text>
                    </View>
                    <ImageBackground
                      source={require('../images/kursi_konfirm.gif')}
                      resizeMode="stretch"
                      style={styles.imageBackground}>
                      <View style={styles.numberBooked}>
                        <Text style={{fontSize:10, fontWeight:'bold'}}>{data.col4}</Text>
                      </View>
                      <Text
                        style={styles.name}>
                        {data.penumpang4.nama_penumpang}
                      </Text>
                    </ImageBackground>
                    <View
                      style={styles.modeBayar}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../images/ic_jp_tiket.png')}></Image>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../images/ic_jp_tunai.png')}></Image>
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

  return (
    <View style={styles.car}>
      <Legent/>
      <Sususnankursi />
    </View>
  );
}

// import styles from './styles'
// Clolor
// kosong = '#EEEEEE', '#B4B4B3'
// selected = '#7FC7D9', '#29ADB2'
// booking =
// bayar =

const styles = StyleSheet.create({
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
  sheat: (bgcolor, bdcolor) => ({
    width: 60,
    height: 70,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: bdcolor,
    backgroundColor: bgcolor,
  }),
  sheatSelected: {
    width: 60,
    height: 70,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#29ADB2',
    backgroundColor: '#7FC7D9',
  },
  sandaran: bdcolor => ({
    width: 60,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: bdcolor,
  }),
  sandaranSelected: {
    width: 60,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#29ADB2',
  },
  kursi: {
    width: 60,
    height: 80,
  },
  imageBackground: {
    width: 60,
    height: 75,
    flexDirection: 'column',
    alignItems: 'center',
  },
  ruteKursi: {
    width: 70,
    height: 20,
    backgroundColor: 'yellowgreen',
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
    fontSize: 14,
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
  numberBooked:{
    width:17,
    height:17,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'green',
    position:'absolute',
    top:1,
    right:1 , 
    alignItems:'center', 
    justifyContent:'center',
    backgroundColor:'yellow'
  }
});

export default CarSeatLayouts;
