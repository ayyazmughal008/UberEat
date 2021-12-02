import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue } from '../../Colors'

const Notification = (props) => {
    return (
        <View style={styles.container}>
            <View style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                height: heightPercentageToDP(5),
                justifyContent: "space-between",
                //backgroundColor:"red"
            }}>
                <Text style={styles.date}>
                    {props.date}
                </Text>
                {props.index == 0 &&
                    <TouchableOpacity onPress={props.clear}>
                        <Text style={styles.date}>
                            {"CLEAR"}
                        </Text>
                    </TouchableOpacity>
                }
            </View>

            {!props.data || !props.data.length ?
                <View />
                : props.data.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={props.clickHandler}
                            key={"unique" + index}
                            style={styles.header}>
                            <FastImage
                                source={item.image}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.contactImg}
                            />

                            <Text style={[styles.name, {
                                fontFamily: "Obvia-Regular",
                                padding: widthPercentageToDP(4),
                                marginRight: widthPercentageToDP(5)
                            }]}>
                                {item.detail}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        flex: 0,
        alignSelf: "center",
        borderRadius: widthPercentageToDP(2),
        marginTop: heightPercentageToDP(2),
    },
    header: {
        width: "100%",
        height: heightPercentageToDP(10),
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "space-between"
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    contactImg: {
        borderRadius: widthPercentageToDP(13) / 2,
        width: widthPercentageToDP(13),
        height: widthPercentageToDP(13)
    },
    name: {
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-Medium",
        color: black,
    },
    date: {
        fontSize: widthPercentageToDP(4.5),
        fontFamily: "Montserrat-Bold",
        color: black,
    },
    vectorIcon: {
        width: widthPercentageToDP(8),
        height: widthPercentageToDP(8)
    },
    number: {
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-Medium",
        color: black,
    }
})

export default Notification;