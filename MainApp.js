import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Modal, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { NavStack } from "./src/RootNavigator/StackNavigation";
import { NavStack2 } from "./src/RootNavigator/MainNavigator";
import { useDispatch, useSelector } from 'react-redux';
import { navigate, setTopLevelNavigator } from './src/RootNavigator/MainNavigator/NavigationService'
import { dispatchFunc } from './src/Redux/action'
import PopUpBox from './src/Component/PopUp'
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image'
import { gold3 } from './src/Colors'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

export default function App(props) {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.user.login);
    const [isAnimate, setAnimate] = useState(true)

    // useEffect(() => {
    //     console.log('===>', login)
    // }, [])
    useEffect(() => {
        setTimeout(() => {
            setAnimate(false)
        }, 5000);
    }, [])
    return (
        <NavigationContainer>
            <PopUpBox
                okClick={() => dispatch(dispatchFunc())}
            />
            {!login ?
                <NavStack />
                : <NavStack2 />
            }
            {isAnimate &&
                <Modal visible={isAnimate} animationType="none" transparent={true}>
                    <FastImage
                        source={require('./src/Images/splash.jpg')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: widthPercentageToDP(100), flex: 0, alignItems: "center" }}>
                            <Animatable.Image
                                source={require('./src/Images/Goldenlogo.png')}
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
            }
        </NavigationContainer>
    );
}