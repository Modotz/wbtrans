// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
// https://colorhunt.co/palette/f4e0b9a8a1967d7463fe0000

import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  SectionList,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
//import Card from '../../components/Card';
import {green100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import colors from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../constants/Repositories';

import {Card, Text} from 'react-native-paper';

const HomeScreen = ({navigation}: {navigation: any}) => {
  const [images, setImages] = useState([
    require('../../images/slider1.png'),
    require('../../images/slider3.png'),
    require('../../images/slider4.png'),
    'https://source.unsplash.com/1024x768/?tree',
  ]);

  const [username, setUsername] = useState('');
  const [kdOutlet, setKdOutlet] = useState('');
  const [outlet, setOutlet] = useState('');
  const [kota, setKota] = useState('');

  const [rute, setRute] = useState();
  const [rutes, setRutes] = useState([
    {
      title: 'SUBANG - BUAH BATU',
      data: [
        {
          rute: 'SUMEDANG',
        },
        {
          rute: 'CILEUNYI',
        },
      ],
    },
  ]);

  useEffect(() => {
    AsyncStorage.getItem('username').then(value => setUsername(value));
    AsyncStorage.getItem('kd_outlet').then(value => setKdOutlet(value));
    AsyncStorage.getItem('outlet').then(value => setOutlet(value));
    AsyncStorage.getItem('kota').then(value => setKota(value));

    get_rute();
  }, []);

  const get_rute = () => {
    fetch(API_URL + 'reservasi/ruteallsectionlist', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(async json => {
        console.log(json);
        setRute(json);
        setRutes(json);
      })
      .catch(error => console.error(error))
      .finally(() => {});
  };

  const RuteView = () => {
    //   return (
    //     <Card>
    //   <Card.Content>
    //     <Text variant="titleSmall">INFO PEMESANAN</Text>
    //     <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //       <Icons name="whatsapp" color={'green'} size={14} />
    //       <Text style={{alignSelf: 'center', marginLeft: 5}}>
    //         Haurgeulis 0811 364 168
    //       </Text>
    //     </View>
    //     <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //       <Icons name="cellphone-information" color={'red'} size={14} />
    //       <Text style={{alignSelf: 'center', marginLeft: 5}}>
    //         Call Center 081 886 1666
    //       </Text>
    //     </View>
    //   </Card.Content>
    // </Card>);

    return rutes.map(item => {
      return (
        <Card style={{marginTop: 10}}>
          <Card.Content>
            <Text variant="titleSmall">{item.title}</Text>

            {item.data.map(child => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icons name="car" color={'red'} size={14} />
                  <Text variant='labelSmall' style={{alignSelf: 'center', marginLeft: 5}}>
                    {child.rute}
                  </Text>
                </View>
              );
            })}
          </Card.Content>
        </Card>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={{margin: 10}}>Hai {username}</Text>
        <SliderBox
          images={images}
          autoplay={true}
          sliderBoxHeight={200}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'stretch'}
          paginationBoxStyle={{
            position: 'absolute',
            bottom: 0,
            padding: 0,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: 'rgba(128, 128, 128, 0.92)',
          }}
          ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
          imageLoadingColor="#2196F3"
        />

        <View style={{margin: 10}}>
          {/* <Text style={{}}>CSO {kota}</Text>
          <View style={styles.container_product}>
            <TouchableOpacity style={{alignItems:'center'}} onPress={() => navigation.navigate('Tiket')}>
              <View style={styles.card_product}>
                <Icons name="card-bulleted-outline" color={'white'} size={24} />
              </View>
              <Text style={styles.lable_product}>Tiket</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems:'center'}} onPress={() => navigation.navigate('Paket')}>
              <View style={styles.card_product}>
                <Icons name="gift" color={'white'} size={24} />
              </View>
              <Text style={styles.lable_product}>Paket</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems:'center'}}
              onPress={() => navigation.navigate('CetakTiket2')}>
              <View style={styles.card_product}>
                <Icons
                  name="clipboard-text-outline"
                  color={'white'}
                  size={24}
                />
              </View>
              <Text style={styles.lable_product}>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems:'center'}}
              onPress={() => navigation.navigate('CetakTiket3')}>
              <View style={styles.card_product}>
                <Icons name="printer" color={'white'} size={24} />
              </View>
              <Text style={styles.lable_product}>Printer</Text>
            </TouchableOpacity>
          </View> */}

          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('NewTiket')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Icons name="card-bulleted-outline" color={'white'} size={28} />
              <Text style={{alignSelf: 'flex-start', color: 'white'}}>
                Reservasi Penumpang
              </Text>
              <Icons name="chevron-right" color={'white'} size={28} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('NewTiket')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Icons name="gift" color={'white'} size={28} />
              <Text style={{alignSelf: 'center', color: 'white'}}>
                Reservasi Paket
              </Text>
              <Icons name="chevron-right" color={'white'} size={28} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('NewTiket')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Icons name="printer" color={'white'} size={28} />
              <Text style={{alignSelf: 'center', color: 'white'}}>
                Setting Printer
              </Text>
              <Icons name="chevron-right" color={'white'} size={28} />
            </View>
          </TouchableOpacity> */}
        </View>

        <View style={{margin: 10}}>
          <Text variant="titleSmall">INFO</Text>
          <Card>
            <Card.Content>
              <Text variant="titleSmall">INFO PEMESANAN</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icons name="whatsapp" color={'green'} size={14} />
                <Text style={{alignSelf: 'center', marginLeft: 5}}>
                  Haurgeulis 0811 364 168
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icons name="cellphone-information" color={'red'} size={14} />
                <Text style={{alignSelf: 'center', marginLeft: 5}}>
                  Call Center 081 886 1666
                </Text>
              </View>
            </Card.Content>
          </Card>

          <Text variant="titleSmall" style={{marginTop:10}}>RUTE WB-TRANS</Text>
          <RuteView></RuteView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  button: {
    // backgroundColor: '#DDDDDD',
    backgroundColor: 'red',
    padding: 10,
    marginTop: 16,
    borderRadius: 5,
  },
  container_product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  card_product: {
    width: 50,
    height: 50,
    backgroundColor: '#FE0000',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card_image: {
    width: 70,
    height: 70,
    backgroundColor: '#7D7463',
    padding: 5,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lable_product: {
    fontSize: 12,
    fontWeight: '600',
  },
});
export default HomeScreen;
