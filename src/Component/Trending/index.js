import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { lightGrey, offWhite, textBlack } from '../../Colors'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

const Recent = (props) => {
    return (
        <TouchableOpacity
            onPress={props.clickHandler}
            style={styles.container}>
            <FastImage
                source={props.dishImg}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.img}
            />
            <Text style={styles.title}>
                {props.title}
            </Text>
            <View style={styles.row}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FastImage
                        source={props.profile}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.roundImg}
                    />
                    <Text style={styles.semiBoldTxt}>
                        {props.name}
                    </Text>
                </View>

                <Text style={styles.normalTxt}>
                    {props.date}
                </Text>
            </View>
            {/* 
             */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(45),
        backgroundColor: offWhite,
        borderRadius: widthPercentageToDP(3),
        //alignItems: "center",
        marginTop: heightPercentageToDP(2),
        padding: 2,
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
        height: heightPercentageToDP(32),
        borderTopLeftRadius: widthPercentageToDP(3),
        borderTopRightRadius: widthPercentageToDP(3)
    },
    title: {
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-Bold",
        color: textBlack,
        marginTop: heightPercentageToDP(1),
        textAlign: "left",
        paddingLeft: widthPercentageToDP(5)
    },
    normalTxt: {
        fontSize: widthPercentageToDP(3.5),
        fontFamily: "Montserrat-Light",
        color: textBlack,
        textAlign: "center"
    },
    semiBoldTxt: {
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-SemiBold",
        color: textBlack,
        textAlign: "left",
        paddingLeft: widthPercentageToDP(5)
    },
    row: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: heightPercentageToDP(1)
    },
    roundImg: {
        width: widthPercentageToDP(8),
        height: widthPercentageToDP(8),
        borderRadius: widthPercentageToDP(8) / 2
    }
})

export default Recent
