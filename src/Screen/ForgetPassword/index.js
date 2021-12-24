import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, lightGrey, textBlack, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import { Header, Input } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux';
import { sendUserEmail } from '../../Redux/action'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 6;
import useState from 'react-usestateref'

const Settings = (params) => {
    const dispatch = useDispatch()
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const otpData = useSelector((state) => state.user.otpData);
    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [response, setResponse, counterRef] = useState('')

    const _onSubmit = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!reg.test(email)) {
            Alert.alert('Email Validation', 'Please enter a valid email id')
            return;
        }
        getData()
    }

    const getData = async () => {
        setLoading(true)
        const result = await sendUserEmail(email)
        await setLoading(false)
        if (result.status == 200) {
            await setResponse(result)
        }
    }

    const _validate = () => {
        if (response.code == value) {
            params.navigation.navigate('UpdatePassword', {
                data: response
            })
        } else {
            Alert.alert('Invalid Code', 'Code do not match')
        }
    }


    return (
        <View style={styles.container}>
            <Header
                leftComponent={
                    <TouchableOpacity
                        onPress={() => { params.navigation.goBack() }}>
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            color={black}
                            size={35}
                        />
                    </TouchableOpacity>
                }
                centerComponent={{
                    text: "FORGOT PASSWORD", style: {
                        color: black,
                        fontSize: widthPercentageToDP(4),
                        fontFamily: "Montserrat-Bold",
                        marginTop: heightPercentageToDP(1)
                    }
                }}
                containerStyle={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 0,
                    //height: heightPercentageToDP(17)
                }}
                statusBarProps={{
                    backgroundColor: white
                }}
                barStyle="dark-content"
            />
            {!counterRef.current ?
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 0, width: widthPercentageToDP(90), alignSelf: "center", marginTop: heightPercentageToDP(10) }}>
                        <Input
                            placeholder='Enter Email'
                            placeholderTextColor={textBlack}
                            inputStyle={[styles.inputTxt, { paddingLeft: 0 }]}
                            leftIcon={
                                <FastImage
                                    source={require('../../Images/mail.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={styles.vectorIcon}
                                />
                            }
                            //secureTextEntry={true}
                            keyboardType="email-address"
                            onChangeText={text => setEmail(text)}
                            containerStyle={{ marginTop: heightPercentageToDP(2), borderBottomColor: black }}
                        //style = {styles.inputTxt}
                        />
                        <Text style={{
                            fontFamily: 'Montserrat-Medium',
                            fontSize: widthPercentageToDP(4),
                            color: black,
                            marginTop: heightPercentageToDP(1),
                            marginBottom: heightPercentageToDP(1),
                            textAlign: "center"
                        }}>
                            {"we'll send you a OTP on your registered email address"}
                        </Text>
                        <TouchableOpacity
                            onPress={() => _onSubmit()}
                            style={[styles.btn, {
                                marginTop: heightPercentageToDP(4)
                            }]}
                        >
                            <Text style={[styles.btnTxt, {}]}>
                                {"Done"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* {isLoading &&
                        <ActivityIndicator
                            size="large"
                            color={darkBlue}
                            style={styles.loading}
                        />
                    } */}
                </KeyboardAwareScrollView>
                : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: widthPercentageToDP(5),
                        color: black,
                        //marginTop: heightPercentageToDP(1),
                        marginBottom: heightPercentageToDP(5),
                        textAlign: "center"
                    }}>
                        {"Enter OTP"}
                    </Text>
                    <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                    <TouchableOpacity
                        onPress={() => _validate()}
                        style={[styles.btn, {
                            marginTop: heightPercentageToDP(4)
                        }]}
                    >
                        <Text style={[styles.btnTxt, {}]}>
                            {"Done"}
                        </Text>
                    </TouchableOpacity>
                </View>
            }
            {isLoading &&
                <ActivityIndicator
                    size="large"
                    color={darkBlue}
                    style={styles.loading}
                />
            }
        </View>
    )
}

export default Settings

