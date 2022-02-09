import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  Keyboard,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {CheckBox, Icon, Input, Card, AirbnbRating} from 'react-native-elements';

import Header from '../../Components/Header';
import {
  back_img3,
  boat_img1,
  Colors,
  FontFamily,
  Sizes,
} from '../../Constants/Constants';
import Ad from '../../Data/Ad';
import Outgoing from '../../Data/Outgoing';
import Upcoming from '../../Data/Upcoming';
import {SliderBox} from 'react-native-image-slider-box';
import FastImage from 'react-native-fast-image';
import {renderNode} from 'react-native-elements/dist/helpers';
import {apifuntion} from '../../Provider/apiProvider';
import {config} from '../../Provider/configProvider';
import AsyncStorage from '@react-native-community/async-storage';
import {Calendar} from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';
import {Lang_chg} from '../../Provider/Language_provider';
import DateTimePicker from '@react-native-community/datetimepicker';
import {WebView} from 'react-native-webview';
import {msgProvider, msgTitle, msgText} from '../../Provider/messageProvider';

export default class ExtraRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adver_arr: this.props.route.params.adver_arr,
      adv: this.props.route.params.adv,
      data: this.props.route.params.data,
      isSelected: false,
      coupon_discount: '0.00',
      check: [],
      couponCode: '',
      totalPrice:
        Number(this.props.route.params.data.rent_amount) +
        Number(this.props.route.params.data.extra_rent_amt),
    };
  }

  componentDidMount() {
    console.log(this.state.data , "????????????????????????????/");
    console.log(this.state.adv , "????????????????????????????/");

  }

  //   onChangeCheck(item) {
  //     console.log('checked ', item);

  //     //   this.setState({ checked: !this.state.isSelected})

  //     const data = this.state.data;

  //     const index = data.findIndex(x => x.id === id);
  //     data[index].checked = !data[index].checked;
  //     this.setState(data);
  //   }

  onChangeCheck = (select, index, id) => {
      console.log(index, id, 'ITEEEEEEE', select.addon_product_price);
    const tempArray = [...this.state.adver_arr];
    if (!select.isChecked) {
      this.state.totalPrice =
        this.state.totalPrice + Number(select.addon_product_price);
    } else {
      this.state.totalPrice =
        this.state.totalPrice - Number(select.addon_product_price);
    }
    console.log('Total Price', this.state.totalPrice);
    tempArray[id].addon_products[index].isChecked = !select.isChecked;
    this.setState({
      adver_arr: tempArray,
    });
  };

  ExtraRequest() {
    console.log(this.state.couponCode, '^^^^^', this.state.data.coupon_code);
    if (this.state.couponCode) {
      if (this.state.couponCode != this.state.data.coupon_code) {
        alert('Please enter valid coupon code');
        return;
      } else {
        this.setState({
          coupon_discount: this.state.data.coupon_discount,
        });
      }
    }
    this.props.navigation.navigate('Checkout', {
      adver_arr: this.state.adver_arr,
      adv: this.state.adv,
      coupon_discount: this.state.data.coupon_discount,
      data: this.state.data,
      totalPrice:
        this.state.totalPrice + Number(this.state.data.coupon_discount),
    });
  }

  render() {
    console.log('this.state.adver_arr :>> ', this.state.adver_arr);
    return (
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <Header
          imgBack={true}
          notiBtn={false}
          backBtn
          searchBtn={false}
          headerHeight={120}
          name="Extra Request"
          backImgSource={require('../../Images/backgd2.jpg')}
        />

        <View
          style={{backgroundColor: '#fff', marginTop: -20, borderRadius: 20}}>
          {this.state.adver_arr.map((item, id) => {
              console.log(')))))', item.addon_name);
            return (
              <TouchableOpacity
                //   onPress={()=>console.log()}
                activeOpacity={0.8}>
                {/* <Text
                  style={{
                    padding: 20,
                    fontFamily: FontFamily.semi_bold,
                    fontSize: 18,
                  }}>
                  {item.addon_name.toString().replace(',', ' ')}
                </Text> */}

                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '10%'}}>
                      {/* <Text
                        style={{
                          textAlign: 'right',
                          fontFamily: FontFamily.default,
                        }}>
                        {index + 1}{' '}
                      </Text> */}
                    </View>
                    <View style={{width: '35%'}}>
                      <Text style={{textAlign: 'left'}}>
                        {item.addon_product_name[0]}{' '}
                      </Text>
                    </View>

                    <View style={{width: '35%', textAlign: 'right'}}>
                      <Text
                        style={{
                          textAlign: 'right',
                          marginLeft: '20%',
                          //   padding: 10,
                          //   marginTop: -5,
                          fontFamily: FontFamily.default,
                        }}>
                        {' $'}
                        {item.addon_product_price}
                      </Text>
                    </View>
                    <View style={{width: '10%', padding: 0, marginTop: -13}}>
                      {/* <CheckBox
                        // value={this.state.isSelected}
                        //   onValueChange={setSelection}
                        //checked={item2.checked}
                        checked={item2.isChecked}
                        key={index}
                        onPress={() => this.onChangeCheck(item2, index, id)}
                        style={s.checkbox}
                      /> */}
                    </View>
                  </View>

              </TouchableOpacity>
            );
          })}
          {/* <Text>
            {this.state.adver_arr[0].addon_products[0].addon_product_name}
          </Text> */}
        </View>
        {/* <Text>{'\n'}</Text> */}
        <View
          style={{
            height: 0.5,
            width: '89%',
            backgroundColor: Colors.black,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            height: 60,
            width: '89%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginLeft: 10,
              fontFamily: FontFamily.semi_bold,
              color: Colors.black,
              fontSize: 18,
            }}>
            Discount coupon
          </Text>
          <Text
            style={{
              marginLeft: 10,
              fontFamily: FontFamily.semi_bold,
              color: Colors.black,
              fontSize: 18,
            }}>
            {' '}
            #
          </Text>
          <Input
            inputContainerStyle={{
              marginTop: 20,
              height: 40,
              width: 120,
              right: 0,
            }}
            inputStyle={{
              fontSize: 14,
              width: 100,
              fontFamily: FontFamily.default,
              color: Colors.black,
            }}
            defaultValue={this.state.couponCode}
            onChangeText={val => this.setState({couponCode: val})}
          />
        </View>
        <View
          style={{
            height: 0.7,
            width: '89%',
            backgroundColor: Colors.black,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            alignContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
            bottom: 20,
            width: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={s.Btn2} onPress={() => this.ExtraRequest()}>
            <Text style={[s.Btn1Text, {color: Colors.orange}]}>SKIP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.Btn1} onPress={() => this.ExtraRequest()}>
            <Text style={s.Btn1Text}>Proceed</Text>
          </TouchableOpacity>
        </View>

        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>
      </View>
    );
  }
}

const s = StyleSheet.create({
  ImageBackground: {
    height: '100%',
    width: Sizes.width,
    backgroundColor: Colors.black,
  },
  ImageBackground_Img: {
    opacity: 0.5,
  },
  Logo: {
    height: 120,
    width: 120,
    borderRadius: 20,
    backgroundColor: Colors.orange,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  pickerIcon: {
    color: '#fff',
    position: 'absolute',
    bottom: 15,
    right: 10,
    fontSize: 20,
  },
  Btn1: {
    height: 48,
    width: '90%',
    backgroundColor: Colors.orange,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 3,
    overflow: 'hidden',
    shadowColor: '#fff',
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  Btn2: {
    height: 48,
    width: '90%',
    borderColor: Colors.orange,
    borderWidth: 0.7,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 3,
    overflow: 'hidden',
    shadowColor: '#fff',
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  Btn1Text: {
    fontSize: 18,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
  },
  lang: {
    flexDirection: 'row',
    width: '85%',
    // padding:10,
    marginLeft: '79%',
  },
  condition: {
    flexDirection: 'row',
    width: '85%',
    // padding:10,
    //  marginLeft:'65%'
  },
  inputView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  Logo1: {
    height: 120,
    width: 120,
    borderRadius: 20,
    backgroundColor: Colors.orange,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  Text1: {
    textAlign: 'center',
    //  justifyContent:"center",
    fontFamily: FontFamily.default,
    color: Colors.white,
    fontSize: 15,
    marginTop: 13,
  },
  Input1: {
    borderBottomColor: Colors.white,
    width: Sizes.width * 0.46,
    marginLeft: -5,
  },
  Input: {
    borderBottomColor: Colors.white,
    marginTop: -15,
  },
  checkbox: {
    color: Colors.orange,
    backgroundColor: Colors.orange,
    //padding:40
  },
  btn1: {
    height: 48,
    width: '95%',
    backgroundColor: Colors.orange,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#fff',
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  btn1Text: {
    fontSize: 20,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
  },
});
