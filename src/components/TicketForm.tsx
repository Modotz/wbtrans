import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
//import {CheckBox} from 'react-native-elements';
import {Dropdown} from 'react-native-element-dropdown';
import IconFa5 from 'react-native-vector-icons/dist/FontAwesome5';
import {TextInput, Checkbox} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ImageBackground,
  Button
} from 'react-native';
import Card from '../components/Card';

export default function TicketForm({kursiSelected, callbackKursi}) {
  const [openPrice, setOpenPrice] = useState(false);
  const [valuePrice, setValuePrice] = useState(null);
  const [price, setPrice] = useState([
    {label: 'UMUM Rp.85.000', value: '85.000'},
    {label: 'Setia Rp.650.000', value: '650.000'},
    {label: 'Balita Rp.50.000', value: '5.000'},
    {label: 'Return Rp.150.000', value: '155.000'},
  ]);
  const [openAngkutan, setOpenAngkutan] = useState(false);
  const [valueAngkutan, setValueAngkutan] = useState(null);
  const [angkutan, setAngkutan] = useState([
    {label: 'Dari Outlet ke Outlet', value: 'Dari Outlet ke Outlet'},
  ]);

  const [isSelected, setSelection] = useState(false);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [count, setCount] = useState(0);
  // const [penumpang, setPenumpang] = useState([]);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const addHandler = ()=>{
    setCount(count + 1);
    const _inputs = [...inputs];
    _inputs.push({key: count, value: ''});
    setInputs(_inputs);
    
  }

  const check = ()=>{
    console.log('inputs:', inputs);
    console.log('count:', count);
    console.log('kursiSelected:', kursiSelected);
    console.log('count:', kursiSelected.length);
  }

  const update = ()=>{
    //cari data
    const _inputs = inputs.filter((index) => index == 1);
    inputs[1] = {...inputs[1], key: 1, value:"joko"};
    console.log('inputs:', _inputs);
  }

  const reset = ()=>{
    setCount(0);
    setInputs([]);
  }
  
  const deleteHandler = (key)=>{
    const _inputs = inputs.filter((input,index) => index != key);
    setInputs(_inputs);
  }

  const inputHandler = (key,text)=>{
    // const _inputs = [...inputs];
    // _inputs[key].value = text;
    // _inputs[key].key   = key;
    // setInputs(_inputs);

    const _inputs = [...kursiSelected];
    callbackKursi({key: key, value: text});
  }

 

  return (
    <View>
      <View
        style={{margin: 10, borderRadius: 10, backgroundColor: Colors.white}}>
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            borderBottomWidth: 0.5,
          }}>
          <Text style={{marginLeft: 16, fontSize: 14, fontWeight: 'bold'}}>
            DATA PEMESAN {count}
          </Text>
          
        </View>
        <View style={{padding: 10}}>
        <Button title="Add" onPress={addHandler} />
        <View style={{marginTop:2}}/>
        <Button title="Check" onPress={check} />
        <View style={{marginTop:2}}/>
        <Button title="Update" onPress={update} />
        <View style={{marginTop:2}}/>
        <Button title="Reset" onPress={reset} />
          <TextInput
            style={{backgroundColor: Colors.white}}
            label="No Telepon Pemesan"
            left={<TextInput.Icon icon="cellphone" />}
          />
          
          <TextInput
            style={{backgroundColor: Colors.white}}
            label="Nama Pemesan"
            left={<TextInput.Icon icon="account-box" />}
          />
          <TextInput
            style={{backgroundColor: Colors.white}}
            label="Keterangan"
            left={<TextInput.Icon icon="information" />}
          />

          <Text style={{marginLeft: 10}}>Jenis Discount</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={price}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              setValue(item.value);
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
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              setValue(item.value);
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
            style={{backgroundColor: Colors.white, marginBottom: 10}}></View>
        </View>
      </View>
      <View
        style={{margin: 10, borderRadius: 10, backgroundColor: Colors.white}}>
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            borderBottomWidth: 0.5,
          }}>
          <Text style={{marginLeft: 16, fontSize: 14, fontWeight: 'bold'}}>
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
                setSelection(!isSelected);
              }}
            />
            <Text style={{marginLeft: 10}}>
              Centang jika nama penumpang sama
            </Text>
          </View>
          {/* <TextInput
            style={{backgroundColor: Colors.white}}
            label="Nama Penumpang 1"
            left={<TextInput.Icon icon="account-box" />}
          />
          <TextInput
            style={{backgroundColor: Colors.white}}
            label="Nama Penumpang 2"
            left={<TextInput.Icon icon="account-box" />}
          /> */}

            {kursiSelected.map((input, key)=>(
              <TextInput key={key}
              style={{backgroundColor: Colors.white}}
              label={"Nama penumpang " + input.key}
              left={<TextInput.Icon icon="account-box" />}
              value={input.value}  
              onChangeText={(text)=>inputHandler(input.key,text)}
            />
              // <View style={styles.inputContainer}>
              //   <TextInput placeholder={"Enter Name"} value={input.value}  onChangeText={(text)=>inputHandler(text,key)}/>
              //   <TouchableOpacity onPress = {()=> deleteHandler(key)}>
              //     <Text style={{color: "red", fontSize: 13}}>Delete</Text>
              //   </TouchableOpacity> 
              // </View>
            ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    flex: 1, marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "lightgray"
  }
});
