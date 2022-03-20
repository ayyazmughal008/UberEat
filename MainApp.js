import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Modal, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { NavStack } from "./src/RootNavigator/StackNavigation";
import { NavStack2 } from "./src/RootNavigator/MainNavigator";
import { useDispatch, useSelector } from 'react-redux';
import { navigate, setTopLevelNavigator } from './src/RootNavigator/MainNavigator/NavigationService'
import { dispatchFunc, saveToken, checkPopUps } from './src/Redux/action'
import PopUpBox from './src/Component/PopUp'
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image'
import { gold3 } from './src/Colors'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import messaging from '@react-native-firebase/messaging';
import Strings from './src/Translation'

export default function App(props) {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.user.login);
    const language = useSelector((state) => state.user.language);
    const [isAnimate, setAnimate] = useState(true)

    // useEffect(() => {
    //     console.log('===>', login)
    // }, [])
    useEffect(() => {
        setTimeout(() => {
            setAnimate(false)
        }, 5000);
    }, [])

    useEffect(() => {
        updateData();
    }, [])

    useEffect(() => {
        if (language) {
            if (language === 'en') {
                Strings.setLanguage('en')
            } else if (language === 'es') {
                Strings.setLanguage('es')
            }
        }
    }, [])


    const updateData = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            getFcmToken();
            console.log('Authorization status:', authStatus);
        }
        messaging().onMessage(async remoteMessage => {
            console.log(remoteMessage.data.type)
        });
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage.data);
        });
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.data,
            );
        });
        // Check whether an initial notification is available
        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.data,
                );
            }
        });
    }
    const getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log("Your Firebase Token is:", fcmToken);
            dispatch(saveToken(fcmToken))
        } else {
            console.log("Failed", "No token received");
        }
    }
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