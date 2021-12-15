import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native'
import { styles } from '../../Stylesheet'
import FastImage from 'react-native-fast-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, lightGrey, white } from '../../Colors'
import { getUseraddUserItem, userCheckOut } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';


const OverView = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const [isLoading, setLoading] = useState(false)
    const type = props.route.params.type
    const response = props.route.params.response
    const showBtn = props.route.params.showBtn
    const large_image = props.route.params.large_image
    const small_image = props.route.params.small_image

    const checkoutApi = async () => {
        setLoading(true)
        console.log(
            login.data.id,
            rest_id,
            total_person,
            date,
            senTime
        )
        const result = await userCheckOut(
            login.data.id,
            rest_id,
            total_person,
            date,
            senTime
        )
        await setLoading(false)
        if (result.status == 200) {
            console.log(result)
            props.navigation.navigate('Congratulation', {
                type: type
            })
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <FastImage
                    source={{ uri: 'http://108.61.209.20/' + large_image }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.banner}
                >
                    <View style={{ width: "100%", height: "100%", backgroundColor: 'rgba(0,0,0,0.9)', opacity: 0.7 }} />
                    <FastImage
                        source={{ uri: 'http://108.61.209.20/' + small_image }}
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
                            {response.total_person}
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
                            {response.booking_date}
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
                            {response.booking_time}
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
                    {!response ?
                        <View />
                        : !response.items.length ?
                            <View />
                            : <FlatList
                                data={response.items}
                                contentContainerStyle={{ flexGrow: 1, }}
                                keyExtractor={(item, index) => 'key' + index}
                                renderItem={({ item, index }) => (
                                    <View style={[styles.row2, {
                                        width: "100%",
                                    }]}>
                                        <Text style={styles.priceTxt}>
                                            {item.item}
                                        </Text>
                                        <Text style={styles.price}>
                                            {item.price}
                                        </Text>
                                    </View>
                                )}
                            />}

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
                            {response.total_price}
                        </Text>
                    </View>

                    {!showBtn ?
                        <View
                            style={{
                                marginTop: heightPercentageToDP(2)
                            }}
                        />
                        : <TouchableOpacity
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
                        </TouchableOpacity>}
                </View>
                {isLoading &&
                    <ActivityIndicator
                        size="large"
                        color={darkBlue}
                        style={styles.loading}
                    />
                }
            </KeyboardAwareScrollView>
        </View>
    )
}

export default OverView;