import React, { useEffect, useState } from 'react'
import { Input } from 'react-native-elements';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { styles } from '../../Stylesheet'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { black, darkBlue, lightBlue, lightGrey, textBlack, white } from '../../Colors'
import { useDispatch, useSelector } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { userRegister, dispatchFunc, dispatchFuncOn, dispatchErrorMessage } from '../../Redux/action'


const Signup = (props) => {
    const dispatch = useDispatch()
    const popUp = useSelector((state) => state.user.popUp);
    const errorMessage = useSelector((state) => state.user.errorMessage);
    const [name, setName] = useState('')
    const [email, setEMail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConPassword] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [isChecked, setChecked] = useState(false)

    const _onSubmit = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!name) {
            Alert.alert('Name Error', 'Please enter a valid name')
            return;
        }
        if (!reg.test(email)) {
            Alert.alert('Email Validation', 'Please enter a valid email id')
            return;
        }
        if (!phone) {
            Alert.alert('Name Error', 'Please enter a valid Phone no')
            return;
        }
        if (!password || password.length < 8) {
            Alert.alert('Password Error', 'Please enter password, should be 8 characters long')
            return;
        }
        if (!ConfirmPassword || ConfirmPassword.length < 8) {
            Alert.alert('Password Error', 'Please enter confirm password, should be 8 characters long')
            return;
        }
        if (password !== ConfirmPassword) {
            Alert.alert('Password Mismatch', 'Password and Confirm password should be same ')
            return;
        }
        if (!isChecked) {
            Alert.alert('', "Please check the Terms & Condition box")
            return
        }
        registerApi()

    }
    const registerApi = async () => {
        setLoading(true)
        const result = await userRegister(name, email, password, phone)
        await setLoading(false)
        if (result.status == 200) {
            dispatch(dispatchFuncOn())
            dispatch(dispatchErrorMessage(result.message))
            props.navigation.navigate('Login')
        } else if (result.status == 401) {
            console.log('hiii')
            dispatch(dispatchFuncOn())
            dispatch(dispatchErrorMessage(result.message))
        }
    }



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
                        onChangeText={(text) => setName(text)}
                        containerStyle={{ marginTop: heightPercentageToDP(2), borderBottomColor: black, }}
                    //style = {styles.inputTxt}
                    />
                    <Input
                        placeholder='Email'
                        placeholderTextColor={lightGrey}
                        inputStyle={[styles.inputTxt, { paddingLeft: 0 }]}
                        onChangeText={(text) => setEMail(text)}
                        containerStyle={{ marginTop: heightPercentageToDP(0), borderBottomColor: black }}
                    //style = {styles.inputTxt}
                    />
                    <Input
                        placeholder='Phone Number'
                        placeholderTextColor={lightGrey}
                        inputStyle={[styles.inputTxt, { paddingLeft: 0 }]}
                        onChangeText={(text) => setPhone(text)}
                        containerStyle={{ marginTop: heightPercentageToDP(0), borderBottomColor: black }}
                    //style = {styles.inputTxt}
                    />
                    <Input
                        placeholder='Password'
                        placeholderTextColor={lightGrey}
                        inputStyle={[styles.inputTxt, { paddingLeft: 0 }]}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        containerStyle={{ marginTop: heightPercentageToDP(0), borderBottomColor: black }}
                    //style = {styles.inputTxt}
                    />
                    <Input
                        placeholder='Confirm Password'
                        placeholderTextColor={lightGrey}
                        inputStyle={[styles.inputTxt, { paddingLeft: 0 }]}
                        onChangeText={(text) => setConPassword(text)}
                        secureTextEntry={true}
                        containerStyle={{ marginTop: heightPercentageToDP(0), borderBottomColor: black }}
                    //style = {styles.inputTxt}
                    />
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
                        <Fontisto
                            name={isChecked ? 'checkbox-active' : "checkbox-passive"}
                            color={black}
                            size={20}
                            style={{
                                marginLeft: widthPercentageToDP(2.5)
                            }}
                            onPress={() => setChecked(!isChecked)}
                        />
                        <Text style={[styles.smallTxt, { paddingLeft: widthPercentageToDP(3), marginTop: 0 }]}>
                            {"I agree to the term & conditions"}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => _onSubmit()}
                        style={[styles.btn, {
                            borderRadius: widthPercentageToDP(10),
                            width: widthPercentageToDP("87%"),
                        }]}
                    >
                        <Text style={[styles.btnTxt, { fontWeight: "bold" }]}>
                            {"SIGN UP"}
                        </Text>
                    </TouchableOpacity>
                    <Text style={[styles.smallTxt, {
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
                {isLoading &&
                    <ActivityIndicator
                        size="large"
                        color={darkBlue}
                        style={styles.loading}
                    />
                }
            </KeyboardAwareScrollView>

        </View>
    )

}

export default Signup;