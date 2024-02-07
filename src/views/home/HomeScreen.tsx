// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
// https://colorhunt.co/palette/f4e0b9a8a1967d7463fe0000

import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Card from '../../components/Card';
import {green100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import colors from '../../constants/Colors';

const HomeScreen = ({navigation}: {navigation: any}) => {
  const [images, setImages] = useState([
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SliderBox images={images} />
        <View style={styles.container_product}>
          <TouchableOpacity onPress={() => navigation.navigate('NewTiket')}>
            <View style={styles.card_product}>
              <Icons name="card-bulleted-outline" color={'white'} size={48} />
              {/* <View style={styles.card_image}>
                <Icons name="card-bulleted-outline" color={'white'} size={48} />
              </View> */}
              <Text style={styles.lable_product}>Tiket</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Paket')}>
            <View style={styles.card_product}>
              <Icons name="gift" color={'white'} size={48} />
              <Text style={styles.lable_product}>Paket</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Paket')}>
            <View style={styles.card_product}>
              <Icons name="calendar-month" color={'white'} size={48} />
              <Text style={styles.lable_product}>Jadwal</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container_product}>
          <TouchableOpacity onPress={() => navigation.navigate('CetakTiket')}>
            <View style={styles.card_product}>
              <Icons name="card-bulleted-outline" color={'white'} size={48} />
              {/* <View style={styles.card_image}>
                <Icons name="card-bulleted-outline" color={'white'} size={48} />
              </View> */}
              <Text style={styles.lable_product}>Cetak Tiket 1</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('CetakTiket2')}>
            <View style={styles.card_product}>
              <Icons name="gift" color={'white'} size={48} />
              <Text style={styles.lable_product}>Cetak Tiket 2</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('CetakTiket3')}>
            <View style={styles.card_product}>
              <Icons name="calendar-month" color={'white'} size={48} />
              <Text style={styles.lable_product}>Cetak Tiket 3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    justifyContent: 'center',
  },

  container_product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  card_product: {
    width: 120,
    height: 120,
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
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 3,
  },
});
export default HomeScreen;
