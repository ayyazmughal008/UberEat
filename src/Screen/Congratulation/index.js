import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, Modal, BackHandler } from 'react-native'
import { styles } from '../../Stylesheet'
import FastImage from 'react-native-fast-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, lightGrey, white } from '../../Colors'
import { CommonActions } from '@react-navigation/native';
import Strings from '../../Translation'

const Congratulation = (props) => {
    const type = props.route.params.type
    // useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    //     return () => {
    //         BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    //     };
    // }, []);
    const handleBackButtonClick = () => {
        props.navigation.dispatch(CommonActions.reset({
            index: 1,
            routes: [
                { name: 'Dashboard' },
            ],
        }));
        return true;
    }






    return (
        <View style={[styles.container, {
            justifyContent: "center",
            alignItems: "center"
        }]}>
            <FastImage
                source={require('../../Images/Success.png')}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.sliderImg}
            />
            <Text style={[styles.bigTxtBold, {
                fontSize: widthPercentageToDP(6),
                fontFamily: "Montserrat-Bold",
            }]}>
                {type === 'checking' ? Strings.waiting : Strings.Congratulation}
            </Text>
            <Text style={[styles.smallTxt, {
                paddingLeft: widthPercentageToDP(3),
                paddingRight: widthPercentageToDP(3),
                fontFamily: "Montserrat-SemiBold",
                fontSize: widthPercentageToDP(5.5)
            }]}>
                {type === 'checking' ?
                    Strings.thank_you
                    : Strings.enjoy
                }
            </Text>
            <TouchableOpacity
                onPress={() => {
                    handleBackButtonClick()
                }}
                style={[styles.btn, {
                    position: "absolute",
                    bottom: "3%"
                }]}
            >
                <Text style={styles.btnTxt}>
                    {Strings.Continue}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Congratulation