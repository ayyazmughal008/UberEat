import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { lightGrey, offWhite, textBlack } from '../../Colors'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

const Recent = (props) => {
    return (
        <TouchableOpacity style={styles.container}>
            <FastImage
                source={props.dishImg}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.img}
            />
            <Text style={styles.title}>
                {props.title}
            </Text>
            <Text style={styles.normalTxt}>
                {props.date}
            </Text>
            <Text style={styles.normalTxt}>
                {props.adult}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(33),
        height: heightPercentageToDP(23),
        backgroundColor: offWhite,
        borderRadius: widthPercentageToDP(3),
        alignItems: "center",
        marginRight: widthPercentageToDP(1.5)
    },
    img: {
        width: "100%",
        height: heightPercentageToDP(13),
        borderTopLeftRadius: widthPercentageToDP(3),
        borderTopRightRadius: widthPercentageToDP(3)
    },
    title: {
        fontSize: widthPercentageToDP(4),
        fontWeight: "bold",
        color: textBlack,
        marginTop: heightPercentageToDP(0.5),
        textAlign: "center"
    },
    normalTxt: {
        fontSize: widthPercentageToDP(3.5),
        fontWeight: "300",
        color: textBlack,
        textAlign: "center"
    }
})

export default Recent
