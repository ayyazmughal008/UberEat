import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native'
import { styles } from '../../Stylesheet'
import FastImage from 'react-native-fast-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, lightGrey, white } from '../../Colors'

const OverView = (props) => {
    const type = props.route.params.type

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <FastImage
                    source={require('../../Images/dish1.jpg')}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.banner}
                >
                    <View style={{ width: "100%", height: "100%", backgroundColor: 'rgba(0,0,0,0.9)', opacity: 0.7 }} />
                    <FastImage
                        source={require('../../Images/grill.jpg')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.sticker}
                    />
                </FastImage>

                <View style={styles.dashboardMainView}>
                    <Text style={[styles.findTxt, {
                        textAlign: "left",
                        fontFamily: "Montserrat-SemiBold",
                        fontSize: widthPercentageToDP(5),
                        marginTop: heightPercentageToDP(5)
                    }]}>
                        {"Overview"}
                    </Text>

                    <View style={styles.row}>
                        <FastImage
                            source={require('../../Images/Person.png')}
                            resizeMode={FastImage.resizeMode.cover}
                            style={styles.vectorIcon}
                        />
                        <Text style={styles.mediumText}>
                            {"Total Person"}
                        </Text>
                        <Text style={[styles.price, {
                            position: "absolute",
                            right: "0%"
                        }]}>
                            {"2"}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <FastImage
                            source={require('../../Images/Calender.png')}
                            resizeMode={FastImage.resizeMode.cover}
                            style={styles.vectorIcon}
                        />
                        <Text style={styles.mediumText}>
                            {"Date"}
                        </Text>
                        <Text style={[styles.price, {
                            position: "absolute",
                            right: "0%"
                        }]}>
                            {"19/8/21"}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <FastImage
                            source={require('../../Images/Time.png')}
                            resizeMode={FastImage.resizeMode.cover}
                            style={styles.vectorIcon}
                        />
                        <Text style={styles.mediumText}>
                            {"Booking Time"}
                        </Text>
                        <Text style={[styles.price, {
                            position: "absolute",
                            right: "0%"
                        }]}>
                            {"7:30 PM"}
                        </Text>
                    </View>
                    <Text style={[styles.findTxt, {
                        textAlign: "left",
                        fontFamily: "Montserrat-SemiBold",
                        fontSize: widthPercentageToDP(5),
                        marginTop: heightPercentageToDP(5)
                    }]}>
                        {"Menu"}
                    </Text>
                    <View style={[styles.row2, { width: "100%" }]}>
                        <Text style={styles.priceTxt}>
                            {"13' Large Pizza"}
                        </Text>
                        <Text style={styles.price}>
                            {"14 $"}
                        </Text>
                    </View>
                    <View style={[styles.row2, { width: "100%" }]}>
                        <Text style={styles.priceTxt}>
                            {"Spicy Streaks"}
                        </Text>
                        <Text style={styles.price}>
                            {"13 $"}
                        </Text>
                    </View>

                    <View style={[styles.row2, {
                        width: "100%",
                        marginTop: heightPercentageToDP(7)

                    }]}>
                        <Text style={[styles.priceTxt, {
                            fontSize: widthPercentageToDP(5)
                        }]}>
                            {"Total Price"}
                        </Text>
                        <Text style={[styles.price, {
                            fontSize: widthPercentageToDP(5),
                            color: darkBlue
                        }]}>
                            {"27 $"}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('Congratulation', {
                                type: type
                            })
                        }}
                        style={[styles.btn, {
                            marginBottom: heightPercentageToDP(2)
                        }]}
                    >
                        <Text style={styles.btnTxt}>
                            {type === 'checking' ? "I'M COMING" : "Checkout"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default OverView;