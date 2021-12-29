import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { darkBlue, lightGrey, offWhite, textBlack } from '../../Colors'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Recent = (props) => {
    return (
        <TouchableOpacity
            onPress={props.clickHandler}
            style={styles.container}>
            <FastImage
                source={{ uri: props.dishImg }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.img}>
                <AntDesign
                    name='download'
                    color={darkBlue}
                    size={30}
                    style={{
                        position: "absolute",
                        bottom: "3%",
                        right: "5%",
                        zIndex: 3
                    }}
                    onPress={props.downloadClick}
                />
            </FastImage>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <View style={styles.row}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FastImage
                        source={{ uri: props.profile }}
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
        width: widthPercentageToDP(88),
        height: heightPercentageToDP(48),
        backgroundColor: offWhite,
        borderRadius: widthPercentageToDP(3),
        //alignItems: "center",
        marginTop: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(1),
        alignSelf: "center",
        padding: 2,
        //alignSelf: "center",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: Platform.OS == 'ios' ? 3 : 5,
        shadowOpacity: 1.0,
        elevation: Platform.OS == 'ios' ? 2 : 4,
    },
    img: {
        width: "100%",
        height: heightPercentageToDP(32),
        borderTopLeftRadius: widthPercentageToDP(3),
        borderTopRightRadius: widthPercentageToDP(3),
    },
    title: {
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-Bold",
        color: textBlack,
        marginTop: heightPercentageToDP(1),
        textAlign: "left",
        marginTop: heightPercentageToDP(2.5),
        paddingLeft: widthPercentageToDP(5)
    },
    normalTxt: {
        fontSize: widthPercentageToDP(3.5),
        fontFamily: "Montserrat-Light",
        color: textBlack,
        textAlign: "center",
        marginLeft: widthPercentageToDP(17)
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
        //justifyContent: "space-around",
        marginTop: heightPercentageToDP(2)
    },
    roundImg: {
        width: widthPercentageToDP(10),
        height: widthPercentageToDP(10),
        borderRadius: widthPercentageToDP(10) / 2,
        marginLeft: widthPercentageToDP(4)
    }
})

export default Recent
