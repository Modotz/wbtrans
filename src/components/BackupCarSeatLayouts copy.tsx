import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

/**
 * Stateless Functional Component SFC to render rows of CarSeatLayouts.
 */
function CarSeatLayouts({items}: {items: any}) {
  const [layout, setLayout] = useState();
  const [penumpang, setPenumpang] = useState([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    // console.log('Clear penumpang');
    // setPenumpang([]);
    //this['text-0'].setNativeProps({style: {fontSize: 14}});
  }, []);
 
  let jewelStyle = (idKursi)=> {
    const result = penumpang.find((element) => element == parseInt(idKursi));
    if(result){
      return {
        width: 60,
        height: 70,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#29ADB2',
        backgroundColor:'#7FC7D9'
      }
    }else{
      return {
        width: 60,
        height: 70,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#B4B4B3',
        backgroundColor:'#EEEEEE'
      }
    }
    
  }

  const setKursi =(idKursi) =>{
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    //const result = penumpang.find(({ name }) => name === idKursi);
    
    //this['text-0'].setNativeProps({style: {fontSize: 14}});
    
    //this['text-0'].setNativeProps({style: {fontWeight:'bold'}});
    //this['text-1'].setNativeProps({style: {fontSize: "20"}});

    const result = penumpang.find((element) => element == parseInt(idKursi));
    console.log('result:',result);
    if(result){
      console.log('ada');
      setSelected(false);
      setPenumpang(penumpang => penumpang.filter((i) => i !== parseInt(idKursi)));
    }else{
      console.log('gak ada');
      setSelected(true);
      setPenumpang(penumpang => [...penumpang, parseInt(idKursi)]);
    }
  }

  const clearKursi =() =>{
    setPenumpang([]);
  }

  const infoKursi =(idKursi) =>{
    console.log('Info Kursi id:', idKursi);
    console.log('penumpang :', penumpang);
  }

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
                {data.col1 == 0 ? <View style={styles.sheat_blank}></View>:
                  data.penumpang1 == null ? 
                  // style={jewelStyle(data.col1)}
                  // <TouchableOpacity  style={jewelStyle(data.col1)} onPress={() => setKursi(data.col1)}>  
                  //   <ImageBackground source={require('../images/kursi_kosong.gif')} style={{resizeMode: 'stretch'}}>
                  //   <Text style={styles.sheat_number}>{data.col1}</Text>
                  //   <Text key={`text-${i}`} ref={(thisItem) => this[`text-${i}`] = thisItem} >iii</Text>
                  //   <View style={styles.sandaranSelected}></View>
                  //   </ImageBackground>
                  // </TouchableOpacity>
                  <TouchableOpacity style={styles.kursi}>
                    <ImageBackground source={require('../images/kursi_kosong.gif')} resizeMode="stretch" style={{width:60, height:75}}>
                    {/* <Text style={styles.sheat_number}>{data.col1}</Text>
                    <Text style={styles.name}>iii</Text> */}
                    </ImageBackground>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity key={data.col1} style={styles.sheat('#EEEEEE', '#B4B4B3')} onPress={() => infoKursi(data.col1)}>  
                    <Text style={styles.sheat_number}>{data.col1}</Text>
                    <Text style={styles.name}>{data.penumpang1.nama_penumpang}</Text>
                    <View style={styles.sandaran('#B4B4B3')}></View>
                  </TouchableOpacity>
                }
                
                {data.col2 == 0 ? <View style={styles.sheat_blank}></View>:
                  data.penumpang2 == null ? 
                  <TouchableOpacity key={data.col2} style={styles.sheat('#EEEEEE', '#B4B4B3')} onPress={() => setKursi(data.col2)}>  
                    <Text style={styles.sheat_number}>{data.col2}</Text>
                    <Text style={styles.name}></Text>
                    <View style={styles.sandaran('#B4B4B3')}></View>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity key={data.col2} style={styles.sheat('#BFCFE7', '#525CEB')} onPress={() => infoKursi(data.col2)}>  
                    <Text style={styles.sheat_number}>{data.col2}</Text>
                    <Text style={styles.name}>{data.penumpang2.nama_penumpang}</Text>
                    <View style={styles.sandaran('#525CEB')}></View>
                  </TouchableOpacity>
                }

                {data.col3 == 0 ? <View style={styles.sheat_blank}></View>:
                  data.penumpang3 == null ? 
                  <TouchableOpacity key={data.col3} style={styles.sheat('#EEEEEE', '#B4B4B3')} onPress={() => setKursi(data.col3)}>  
                    <Text style={styles.sheat_number}>{data.col3}</Text>
                    <Text style={styles.name}></Text>
                    <View style={styles.sandaran('#B4B4B3')}></View>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity key={data.col3} style={styles.sheat('#EEEEEE', '#B4B4B3')} onPress={() => infoKursi(data.col3)}>  
                    <Text style={styles.sheat_number}>{data.col3}</Text>
                    <Text style={styles.name}>{data.penumpang3.nama_penumpang}</Text>
                    <View style={styles.sandaran('#525CEB')}></View>
                  </TouchableOpacity>
                }

                {data.col4 == 100 ? <View style={styles.sheat('#EEEEEE', '#B4B4B3')}>
                  <Text style={styles.sheat_number}></Text>
                  <Text style={styles.name}>SOPIR</Text>
                  <View style={styles.sandaran('#B4B4B3')}></View>
                </View>:
                  data.penumpang4 == null ? 
                  <TouchableOpacity key={data.col4} style={styles.sheat('#EEEEEE', '#B4B4B3')} onPress={() => setKursi(data.col4)}>  
                    <Text style={styles.sheat_number}>{data.col4}</Text>
                    <Text style={styles.name}></Text>
                    <View style={styles.sandaran('#B4B4B3')}></View>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity key={data.col4} style={styles.sheat('#EEEEEE', '#B4B4B3')} onPress={() => infoKursi(data.col4)}>  
                    <Text style={styles.sheat_number}>{data.col4}</Text>
                    <Text style={styles.name}>{data.penumpang4.nama_penumpang}</Text>
                    <View style={styles.sandaran('#B4B4B3')}></View>
                  </TouchableOpacity>
                }
              </View>
            );
          })}
        </>
      );
    }
  };

  

  return (
    <View style={styles.car}>
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
  sheat: (bgcolor,bdcolor)=>({
    width: 60,
    height: 70,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: bdcolor,
    backgroundColor:bgcolor
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
    backgroundColor:'#7FC7D9'
  },
  sandaran:(bdcolor)=>({
    width: 60,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: bdcolor
  }),
  sandaranSelected: {
    width: 60,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#29ADB2',
  },
  kursi:{
    width: 60,
    height: 75,
    // borderColor: '#29ADB2',
    // backgroundColor:'#29ADB2'
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
    fontSize: 14,
    color: Colors.black,
    fontWeight: 'bold',
  },
});

export default CarSeatLayouts;
