import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native'
import { styles } from '../../Stylesheet'
import FastImage from 'react-native-fast-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, lightGrey, white } from '../../Colors'


const Congratulation = (props) => {
    const type = props.route.params.type
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
                {type === 'checking' ? "We're Waiting" : "Congratulation"}
            </Text>
            <Text style={[styles.smallTxt, {
                paddingLeft: widthPercentageToDP(3),
                paddingRight: widthPercentageToDP(3),
                fontFamily: "Montserrat-SemiBold",
                fontSize: widthPercentageToDP(5.5)
            }]}>
                {type === 'checking' ? "Thank you for notifying us. Your table and food will be ready before you come" : "Thank you for the reservation, Enjoy you time"}
            </Text>
        </View>
    )
}

export default Congratulation