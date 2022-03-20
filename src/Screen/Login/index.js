import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Modal, Image, Alert, ActivityIndicator, Platform, ScrollView, PermissionsAndroid } from 'react-native'
import { styles } from '../../Stylesheet'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { black, darkBlue, lightBlue, lightGrey, white, gold3 } from '../../Colors'
import { useDispatch, useSelector } from 'react-redux';
import { isFirstTime } from '../../Redux/action'
import AppIntroSlider from 'react-native-app-intro-slider';
import { slides } from './slides'
import Icon from 'react-native-vector-icons/AntDesign'
import FastImage from 'react-native-fast-image'
import * as Animatable from 'react-native-animatable';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { userLogin } from '../../Redux/action'
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import Strings from '../../Translation'

const Login = (props) => {
    const dispatch = useDispatch()
    const isFirst = useSelector((state) => state.user.isFirst);
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [currentIndex, setIndex] = useState(0)
    const [isAnimate, setAnimate] = useState(true)
    const [email, setEMail] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        console.log(currentIndex)
    }, [currentIndex])

    const _renderDoneButton = () => {
        return (
            <View style={[styles.smallCircle, { backgroundColor: lightBlue }]}>
                <Icon
                    name="check"
                    color={white}
                    size={25}
                />
            </View>
        );
    };
    const _renderNextButton = () => {
        return (
            <View
                style={[styles.smallCircle, { backgroundColor: lightBlue }]}>
                <Icon
                    name="arrowright"
                    color={white}
                    size={25}
                />
            </View>
        );
    };
    const _renderPrevButton = () => {
        return (
            <View style={[styles.smallCircle, { backgroundColor: black }]}>
                <Icon
                    name="arrowleft"
                    color={white}
                    size={25}
                />
            </View>
        );
    };
    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <FastImage
                    source={item.image}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.sliderImg}
                />
                <Text style={[styles.bigTxtBold, {
                    textAlign: "center",
                    fontSize: widthPercentageToDP(6),
                    padding: 5,
                    fontFamily: "Montserrat-Bold",
                }]}>
                    {item.title}
                </Text>
                <Text style={[styles.smallTxt, {
                    paddingLeft: widthPercentageToDP(3),
                    paddingRight: widthPercentageToDP(3)
                }]}>
                    {item.description}
                </Text>
            </View>

        );
    }
    const _onDone = () => {
        dispatch(isFirstTime(true))
    }

    useEffect(() => {
        setTimeout(() => {
            setAnimate(false)
        }, 5000);
    }, [])

    const _onSubmit = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!reg.test(email)) {
            Alert.alert('Email Validation', 'Please enter a valid email id')
            return;
        }
        if (!password || password.length < 8) {
            Alert.alert('Password Error', 'Please enter password, should be 8 characters long')
            return;
        }
        dispatch(userLogin(email, password))
    }
    useEffect(() => {
        if (Platform.OS === 'android') {
            askPermission()
        }
    }, [])
    const askPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Myhookah App',
                    'message': 'Myhookah App access to your location '
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('permission granted')
                //alert("You can use the location");
            } else {
                console.log("location permission denied")
                alert("Location permission denied");
            }
        } catch (err) {
            console.warn(err)
        }
    }

    if (isFirst) {
        return (
            <View style={styles.container}>
                <KeyboardAwareView animated={true}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        //ref={(view) => { this.scrollView = view; }}
                        style={{ flex: 0, alignSelf: 'stretch' }}
                        keyboardShouldPersistTaps={true}
                        automaticallyAdjustContentInsets={false}
                        //onScroll={this.onScroll.bind(this)}
                        scrollEventThrottle={50}
                        onLayout={(e) => { var { x, y, width, height } = e.nativeEvent.layout; console.log(height); }}>
                        <Animatable.View
                            duration={2000}
                            animation="fadeInDown"
                        >
                            <FastImage
                                source={require('../../Images/logo2.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(65),
                                    height: widthPercentageToDP(65),
                                    marginTop: heightPercentageToDP(7),
                                    alignSelf: "center"
                                }}
                                tintColor={darkBlue}
                            />
                            <Text style={{
                                fontSize: widthPercentageToDP(7),
                                color: darkBlue,
                                fontFamily: "Montserrat-Bold",
                                textAlign: "center",
                                marginTop: heightPercentageToDP(3)
                            }}>
                                {"BIENVENIDO"}
                            </Text>
                        </Animatable.View>

                        <Animatable.View
                            duration={2000}
                            animation="fadeInUp"
                            style={styles.bottomLoginView}>
                            <View style={styles.inputView}>
                                <TextInput
                                    placeholder={Strings.Email}
                                    placeholderTextColor={lightGrey}
                                    style={styles.inputTxt}
                                    onChangeText={(text) => setEMail(text)}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    placeholder={Strings.Password}
                                    placeholderTextColor={lightGrey}
                                    style={styles.inputTxt}
                                    secureTextEntry={true}
                                    onChangeText={(text) => setPassword(text)}
                                />
                            </View>
                            <Text
                                onPress={() => props.navigation.navigate('ForgetPassword')}
                                style={[styles.forgetPassTxt, { textAlign: "right" }]}>
                                {Strings.Forgot_Password}
                            </Text>

                            <TouchableOpacity
                                onPress={() => _onSubmit()}
                                style={styles.btn}
                            >
                                <Text style={[styles.btnTxt, {}]}>
                                    {Strings.LOGIN}
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.smallTxt}>
                                {Strings.no_account}
                                <Text
                                    onPress={() => props.navigation.navigate('Signup')}
                                    style={[styles.smallTxt, { color: lightBlue, marginTop: 0, fontFamily: "Montserrat-Medium" }]}>
                                    {Strings.Sign_Up}
                                </Text>
                            </Text>
                        </Animatable.View>
                    </ScrollView>

                </KeyboardAwareView>
                {AuthLoading &&
                    <ActivityIndicator
                        size="large"
                        color={darkBlue}
                        style={styles.loading}
                    />
                }

                {/* {isAnimate &&
                    <Modal visible={isAnimate} animationType="none" transparent={true}>
                        <FastImage
                            source={require('../../Images/splash.jpg')}
                            resizeMode={FastImage.resizeMode.cover}
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: widthPercentageToDP(100), flex: 0, alignItems: "center" }}>
                                <Animatable.Image
                                    source={require('../../Images/Goldenlogo.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{
                                        width: widthPercentageToDP(50),
                                        height: widthPercentageToDP(50)
                                    }}
                                    animation="slideOutDown"
                                    duration={3000}
                                />
                                <View
                                    style={{ height: heightPercentageToDP(27) }}
                                />
                                <Animatable.Text style={{
                                    fontSize: widthPercentageToDP(7),
                                    color: gold3,
                                    fontFamily: "Montserrat-Bold",
                                    textAlign: "center",
                                    marginTop: heightPercentageToDP(3)
                                }}
                                    animation="slideOutUp"
                                    duration={3000}
                                >
                                    {"MYHOOKAH"}
                                </Animatable.Text>
                            </View>
                        </FastImage>
                    </Modal>
                } */}
            </View>
        )
    } else {
        return (
            <View style={{ flex: 1 }}>
                <AppIntroSlider
                    renderItem={_renderItem}
                    data={slides}
                    onDone={_onDone}
                    //onSlideChange={res => setIndex(res)}
                    renderDoneButton={_renderDoneButton}
                    renderNextButton={_renderNextButton}
                    renderPrevButton={_renderPrevButton}
                    //goToSlide={currentIndex}
                    showDoneButton
                    showNextButton
                    showPrevButton
                    dotStyle={{ width: "30%" }}
                    dotClickEnabled={false}
                    dotStyle={{ backgroundColor: "#cccccc" }}
                    activeDotStyle={{ backgroundColor: lightBlue }}
                />
            </View>

        )
    }

}

export default Login;