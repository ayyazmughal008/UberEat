import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { black, darkBlue, lightGrey, offWhite, textBlack } from '../../Colors'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

const Recent = (props) => {
    return (
        <TouchableOpacity
            onPress={props.clickHandler}
            style={styles.container}>
            {/* <FastImage
                source={props.dishImg}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.img}
            /> */}
            <View style={styles.row}>
                <FastImage
                    source={require('../../Images/table2.png')}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.vector}
                />
                <Text style={styles.title}>
                    {!props.title ? "" : props.title}
                </Text>
            </View>
            <View style={styles.row}>
                <FastImage
                    source={require('../../Images/Calender.png')}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.vector}
                />
                <Text style={styles.title}>
                    {props.date}
                </Text>
            </View>
            <View style={styles.row}>
                <FastImage
                    source={require('../../Images/Person.png')}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.vector}
                />
                <Text style={styles.title}>
                    {"Person: "}{props.person}
                </Text>
            </View>
            {/* <Text style={styles.title}>
                {props.title}
            </Text>
            <Text style={styles.normalTxt}>
                {props.date}
            </Text>
            <Text style={styles.normalTxt}>
                {props.adult}
            </Text>
            <Text style={styles.normalTxt}>
                {props.time}
            </Text>
            <Text style={styles.normalTxt}>
                {"Person: "}{props.person}
            </Text> */}
            {/* <View style={{marginTop: heightPercentageToDP(1)}} /> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(42),
        height: heightPercentageToDP(20),
        backgroundColor: offWhite,
        borderRadius: widthPercentageToDP(3),
        //alignItems: "center",
        marginRight: widthPercentageToDP(1),
        marginLeft: widthPercentageToDP(2),
        marginBottom: heightPercentageToDP(2),
        padding: 2,
        justifyContent: "center",
        //alignSelf: "center",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 4
    },
    img: {
        width: "100%",
        height: heightPercentageToDP(13),
        borderTopLeftRadius: widthPercentageToDP(3),
        borderTopRightRadius: widthPercentageToDP(3)
    },
    title: {
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-SemiBold",
        color: black,
        //marginTop: heightPercentageToDP(1),
        textAlign: "left",
        marginLeft: widthPercentageToDP(4)
    },
    normalTxt: {
        fontSize: widthPercentageToDP(3.5),
        fontFamily: "Montserrat-Light",
        color: darkBlue,
        textAlign: "left",
        marginLeft: widthPercentageToDP(4),
    },
    row: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        //justifyContent:"center",
        //justifyContent: "space-around",
        marginTop: heightPercentageToDP(1.5)
    },
    vector: {
        width: widthPercentageToDP(8),
        height: widthPercentageToDP(8),
        marginLeft: widthPercentageToDP(1)
    }
})

export default Recent
