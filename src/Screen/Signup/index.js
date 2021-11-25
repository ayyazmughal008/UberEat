import React, { useEffect, useState } from 'react'
import { Input } from 'react-native-elements';
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../../Stylesheet'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { black, lightBlue, lightGrey, textBlack, white } from '../../Colors'
import { useDispatch, useSelector } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';


const Signup = (props) => {

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[styles.topViewHeader, {
                    height: heightPercentageToDP(20),
                }]}>
                    <FastImage
                        source={require('../../Images/logo.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: widthPercentageToDP(30),
                            height: "65%",
                            alignSelf: "center"
                        }}
                    />
                </View>
                <View style={{ flex: 0, width: widthPercentageToDP(90), alignSelf: "center", }}>
                    <Text style={styles.bigTxtBold}>
                        {"Sign Up"}
                    </Text>
                    <Text style={styles.TxtLight}>
                        {"Let's get started"}
                    </Text>
                    <Input
                        placeholder='Name'
                        placeholderTextColor={lightGrey}
                        inputStyle={[styles.inputTxt, { paddingLeft: 0 }]}
                        containerStyle={{ marginTop: heightPercentageToDP(2), borderBottomColor: black, }}
                    //style = {styles.inputTxt}
                    />
                    <Input
                        placeholder='Email'
                        placeholderTextColor={lightGrey}
                        inputStyle={[styles.inputTxt, { paddingLeft: 0 }]}
                        containerStyle={{ marginTop: heightPercentageToDP(0), borderBottomColor: black }}
                    //style = {styles.inputTxt}
                    />
                    <Input
                        placeholder='Phone Number'
                        placeholderTextColor={lightGrey}
                        inputStyle={[styles.inputTxt, { paddingLeft: 0 }]}
                        containerStyle={{ marginTop: heightPercentageToDP(0), borderBottomColor: black }}
                    //style = {styles.inputTxt}
                    />
                    <Input
                        placeholder='Password'
                        placeholderTextColor={lightGrey}
                        inputStyle={[styles.inputTxt, { paddingLeft: 0 }]}
                        containerStyle={{ marginTop: heightPercentageToDP(0), borderBottomColor: black }}
                    //style = {styles.inputTxt}
                    />
                    <Input
                        placeholder='Confirm Password'
                        placeholderTextColor={lightGrey}
                        inputStyle={[styles.inputTxt, { paddingLeft: 0 }]}
                        containerStyle={{ marginTop: heightPercentageToDP(0), borderBottomColor: black }}
                    //style = {styles.inputTxt}
                    />
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
                        <Fontisto
                            name="checkbox-passive"
                            color={black}
                            size={20}
                            style={{
                                marginLeft: widthPercentageToDP(2.5)
                            }}
                        />
                        <Text style={[styles.smallTxt, { paddingLeft: widthPercentageToDP(3), marginTop: 0 }]}>
                            {"I agree to the term & conditions"}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.btn, {
                            borderRadius: widthPercentageToDP(10),
                            width: widthPercentageToDP("87%"),
                        }]}
                    >
                        <Text style={[styles.btnTxt, { fontWeight: "bold" }]}>
                            {"SIGN UP"}
                        </Text>
                    </TouchableOpacity>
                    <Text style={[styles.smallTxt,{
                        marginBottom: heightPercentageToDP(5)
                    }]}>
                        {"Already have an account? "}
                        <Text
                            onPress={() => props.navigation.navigate('Login')}
                            style={[styles.smallTxt, { color: lightBlue, marginTop: 0, fontFamily: "Montserrat-Medium" }]}>
                            {"Sign In"}
                        </Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>

        </View>
    )

}

export default Signup;