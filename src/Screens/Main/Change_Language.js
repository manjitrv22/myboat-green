import React, { useState, Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    I18nManager,
    Alert
} from 'react-native';
import {
    Icon,
    Input,
    Card,
    Rating,
    AirbnbRating,
    colors
} from 'react-native-elements';
import Header, { s } from '../../Components/Header';
import { back_img4, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import { UserContext } from './UserContext';
import { Lang_chg } from '../../Provider/Language_provider';
import RNRestart from "react-native-restart";



export default class Change_Language extends Component {
    static contextType = UserContext
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: 'white',
            backgroundColor2: 'white',
            pressed: false,
        };
    }
    componentDidMount() {
        const user = this.context
        console.log('context in home', user);
        if (user.value == 1) {
            this.setState({ backgroundColor: Colors.white, backgroundColor2: Colors.orange });
        } else {
            this.setState({ backgroundColor: Colors.orange, backgroundColor2: Colors.white  });

        }

    }
    restartApp = async (value) => {
        console.log('value :>> ', value);
        if (value == 1) {
            Alert.alert(
                "Restart app?",
                "You have changed the app language. You need to restart the app for it to be effective.",
                [
                    {
                        text: "Restart now",
                        onPress: () => {
                            RNRestart.Restart();
                            Lang_chg.language_set(1)
                        },
                    },
                    {
                        text: "Cancel",
                        onPress: () => {
                            console.log('cancel');
                        },
                    },
                ],
                { cancelable: true }
            );
        } else {
            Alert.alert(
                "Restart app?",
                "You have changed the app language. You need to restart the app for it to be effective.",
                [
                    {
                        text: "Restart now",
                        onPress: () => {
                            RNRestart.Restart();
                            Lang_chg.language_set(0)
                        },
                    },
                    {
                        text: "Cancel",
                        onPress: () => {
                            console.log('cancel');
                        },
                    },
                ],
                { cancelable: true }
            );

        }

    };

    changeColor = () => {
        const user = this.context
// for simple chnge color code 
        // if (!this.state.pressed) {
        //     // setSelected(true)
        //     this.setState({ pressed: true, backgroundColor: Colors.orange, backgroundColor2: 'white' });
        // } else {
        //     this.setState({ pressed: false, backgroundColor: 'white', backgroundColor2: Colors.orange });
        // }
// for functionaity way code 
        // if (user.value==0) {
        //     // setSelected(true)
        //     this.setState({ pressed: true, backgroundColor: Colors.orange, backgroundColor2: 'white' });
        // } else  if (user.value==1){
        //     this.setState({ pressed: true, backgroundColor: Colors.orange, backgroundColor2: 'white'});
        // }
    }
    render() {
        const user = this.context
        console.log('context in home', user);
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <Header
                    backBtn={true}
                    imgBack={true}
                    name={user.value == 1 ? Lang_chg.text_Change_Language[1] : Lang_chg.text_Change_Language[0]}
                    headerHeight={300}
                />
                <View style={sb.SEC2}>
                    <View style={{ marginTop: 30, paddingHorizontal: 10 }}>
                        {/*  */}
                        <TouchableOpacity
                            onPress={() => {
                                this.restartApp(0);
                                this.changeColor(0)
                            }}
                            disabled={ user.value == 0 ? true :  false}
                        >
                            <Card
                                containerStyle={{
                                    backgroundColor: this.state.backgroundColor,
                                    borderRadius: 12,
                                    paddingHorizontal: 20
                                }}>
                                <Text
                                    //  color={selected ==1 ? btn1Style.textCOlor : btn2Style.textCOlor}
                                    style={{
                                        fontFamily: FontFamily.default,
                                        fontWeight: "500",
                                        color: Colors.black
                                    }}>English</Text>
                            </Card>
                        </TouchableOpacity>
                        {/*  */}
                        <TouchableOpacity
                            onPress={() => {
                                this.restartApp(1);
                                this.changeColor(1)
                            }}
                            disabled={ user.value == 1 ? true :  false}
                        >
                            <Card
                                //  color={selected ==2 ? btn2Style.backColor : btn1Style.backColor}

                                containerStyle={{
                                    backgroundColor: this.state.backgroundColor2,
                                    borderRadius: 12,
                                    paddingHorizontal: 20
                                }}>
                                <Text
                                    //  color={selected ==2 ? btn2Style.textCOlor : btn1Style.textCOlor}
                                    style={{
                                        fontFamily: FontFamily.default,
                                        fontWeight: "500",
                                        color: Colors.black
                                    }}>Arabic</Text>
                            </Card>
                        </TouchableOpacity>
                    </View>

                </View>
                {/* <View>
                <TouchableOpacity style={sb.btn1}>
                    <Text style={sb.btn1Text}>
                        Done
                    </Text>
                </TouchableOpacity>
                </View> */}
            </View>
        );
    }
}
const sb = StyleSheet.create({
    SEC2: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 25,
        borderTopEndRadius: 25,
        marginTop: -50,
        flex: 1
    },
    btn1: {
        height: 48,
        width: "85%",
        backgroundColor: Colors.orange,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        marginVertical: 10,
        elevation: 5,
        position: "absolute",
        bottom: 20

    },
    btn1Text: {
        fontSize: 20,
        fontFamily: FontFamily.semi_bold,
        color: Colors.white
    }
})
// export default Change_Language;