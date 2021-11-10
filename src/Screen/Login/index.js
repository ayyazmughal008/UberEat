import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Modal, Image } from 'react-native'
import { styles } from '../../Stylesheet'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { black, darkBlue, lightBlue, lightGrey, white } from '../../Colors'
import { useDispatch, useSelector } from 'react-redux';
import { isFirstTime } from '../../Redux/action'
import AppIntroSlider from 'react-native-app-intro-slider';
import { slides } from './slides'
import Icon from 'react-native-vector-icons/AntDesign'
import FastImage from 'react-native-fast-image'
import * as Animatable from 'react-native-animatable';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

const Login = (props) => {
    const dispatch = useDispatch()
    const isFirst = useSelector((state) => state.user.isFirst);
    const [currentIndex, setIndex] = useState(0)
    const [isAnimate, setAnimate] = useState(true)


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
                    fontSize: widthPercentageToDP(6),
                    fontWeight: "bold"
                }]}>
                    {item.title}
                </Text>
                <Text style={styles.smallTxt}>
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



    if (isFirst) {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <FastImage
                        source={require('../../Images/logo.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: widthPercentageToDP(70),
                            height: widthPercentageToDP(70),
                            marginTop: heightPercentageToDP(7),
                            alignSelf: "center"
                        }}
                        tintColor={darkBlue}
                    />
                    <Text style={{
                        fontSize: widthPercentageToDP(7),
                        color: black,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: heightPercentageToDP(3)
                    }}>
                        {"BIENVENIDO"}
                    </Text>
                    <View style={styles.bottomLoginView}>
                        <View style={styles.inputView}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={lightGrey}
                                style={styles.inputTxt}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={lightGrey}
                                style={styles.inputTxt}
                            />
                        </View>
                        <Text style={[styles.forgetPassTxt, { textAlign: "right" }]}>
                            {"Forgot Password?"}
                        </Text>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('Dashboard')}
                            style={styles.btn}
                        >
                            <Text style={[styles.btnTxt, { fontWeight: "bold" }]}>
                                {"LOGIN"}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.smallTxt}>
                            {"Don't have an account? "}
                            <Text
                                onPress={() => props.navigation.navigate('Signup')}
                                style={[styles.smallTxt, { color: lightBlue, marginTop: 0 }]}>
                                {"Sign Up"}
                            </Text>
                        </Text>
                    </View>
                </KeyboardAwareScrollView>
                {isAnimate &&
                    <Modal visible={isAnimate} animationType="none" transparent={true}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: lightBlue }}>
                            <View style={{ width: widthPercentageToDP(100), flex: 0, alignItems: "center" }}>
                                <Animatable.Image
                                    source={require('../../Images/logo.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{
                                        width: widthPercentageToDP(50),
                                        height: widthPercentageToDP(50)
                                    }}
                                    animation="slideOutDown"
                                    duration={5000}
                                />
                                <View
                                    style={{ height: heightPercentageToDP(27) }}
                                />
                                <Animatable.Text style={{
                                    fontSize: widthPercentageToDP(7),
                                    color: white,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    marginTop: heightPercentageToDP(3)
                                }}
                                    animation="slideOutUp"
                                    duration={5000}
                                >
                                    {"MyHookah"}
                                </Animatable.Text>
                            </View>
                        </View>
                    </Modal>
                }
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
                {isAnimate &&
                    <Modal visible={isAnimate} animationType="none" transparent={true}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: lightBlue }}>
                            <View style={{ width: widthPercentageToDP(100), flex: 0, alignItems: "center" }}>
                                <Animatable.Image
                                    source={require('../../Images/logo.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{
                                        width: widthPercentageToDP(50),
                                        height: widthPercentageToDP(50)
                                    }}
                                    animation="slideOutDown"
                                    duration={5000}
                                />
                                <View
                                    style={{ height: heightPercentageToDP(27) }}
                                />
                                <Animatable.Text style={{
                                    fontSize: widthPercentageToDP(7),
                                    color: white,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    marginTop: heightPercentageToDP(3)
                                }}
                                    animation="slideOutUp"
                                    duration={5000}
                                >
                                    {"MyHookah"}
                                </Animatable.Text>
                            </View>
                        </View>
                    </Modal>
                }
            </View>

        )
    }

}

export default Login;