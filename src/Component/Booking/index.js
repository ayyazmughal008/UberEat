import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { black } from '../../Colors'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import FastImage from 'react-native-fast-image'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Booking = (props) => {
    return (
        <TouchableOpacity 
        onPress = {props.clickHandler}
        style={styles.container}>
            <FastImage
                source={props.image}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.img}
            />
            <Text style={styles.blockTxt}>
                {props.name}
            </Text>
            <MaterialIcons
                name="keyboard-arrow-right"
                color={black}
                size={30}
                style={{
                    position: "absolute",
                    right: "0%",
                    top: "37%"
                }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(15),
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: black,
        alignSelf:"center"
    },
    img: {
        width: widthPercentageToDP(17),
        height: widthPercentageToDP(17),
        borderRadius: widthPercentageToDP(3)
    },
    blockTxt: {
        fontSize: widthPercentageToDP(4),
        color: black,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
        marginLeft: widthPercentageToDP(5)
    }
})

export default Booking