import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { black, darkBlue, lightGrey, offWhite, textBlack, white } from '../../Colors'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

const Item = (props) => {
    return (
        <View style={styles.container}>
            <FastImage
                source={{ uri: props.dishImg }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.img}
            />
            <Text style={styles.title}>
                {props.title}
            </Text>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={props.plusClick}
                    style={[styles.circle, {
                        marginLeft: widthPercentageToDP(2)
                    }]}>
                    <Text style={[styles.operator, {
                        fontSize: widthPercentageToDP(4.7)
                    }]}>
                        {"+"}
                    </Text>
                </TouchableOpacity>
                <Text style={[styles.operator, { marginLeft: 5, marginRight: 5, color: black }]}>
                    {props.quantity}
                </Text>
                <TouchableOpacity
                    onPress={props.minusClick}
                    style={styles.circle}>
                    <Text style={[styles.operator, {
                        fontSize: widthPercentageToDP(4.7)
                    }]}>
                        {"-"}
                    </Text>
                </TouchableOpacity>
                <Text style={[styles.operator, { marginLeft: 7, color: black }]}>
                    {props.price}{".0 $"}
                </Text>
            </View>
            <TouchableOpacity
                onPress={props.clickHandler}
                style={styles.btn}>
                <Text style={styles.operator}>
                    {"Add"}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(43),
        height: heightPercentageToDP(31),
        backgroundColor: offWhite,
        borderRadius: widthPercentageToDP(3),
        //alignItems: "center",
        padding: 2,
        marginRight: widthPercentageToDP(1),
        marginLeft: widthPercentageToDP(1),
        marginTop: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(1),
        //alignSelf: "center",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 4,
    },
    img: {
        width: "100%",
        height: heightPercentageToDP(12),
        borderTopLeftRadius: widthPercentageToDP(3),
        borderTopRightRadius: widthPercentageToDP(3)
    },
    title: {
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-Medium",
        color: textBlack,
        marginTop: heightPercentageToDP(1.5),
        textAlign: "left",
        marginLeft: widthPercentageToDP(3)
    },
    row: {
        width: "100%",
        flex: 0,
        alignItems: "center",
        flexDirection: "row",
        marginTop: heightPercentageToDP(2),
    },
    circle: {
        width: widthPercentageToDP(8),
        height: widthPercentageToDP(8),
        borderRadius: widthPercentageToDP(8) / 2,
        backgroundColor: darkBlue,
        justifyContent: "center",
        alignItems: "center"
    },
    operator: {
        fontSize: widthPercentageToDP(4.3),
        fontFamily: "Montserrat-Medium",
        color: white,
        textAlign: "center"
    },
    btn: {
        width: widthPercentageToDP(35),
        height: heightPercentageToDP(5),
        borderRadius: widthPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkBlue,
        alignSelf: "center",
        marginTop: heightPercentageToDP(2)
    }
})

export default Item
