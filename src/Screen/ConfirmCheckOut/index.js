import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native'
import { styles } from '../../Stylesheet'
import FastImage from 'react-native-fast-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, lightGrey, white } from '../../Colors'
import { getUseraddUserItem, userCheckOut, confirmComing } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Strings from '../../Translation'

const OverView = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const [isLoading, setLoading] = useState(false)
    const type = props.route.params.type
    const response = props.route.params.response
    const showBtn = props.route.params.showBtn
    const large_image = props.route.params.large_image
    const small_image = props.route.params.small_image
    const booking_id = props.route.params.booking_id

    const confirmApi = async () => {
        setLoading(true)
        const result = await confirmComing(booking_id)
        await setLoading(false)
        if (result.status == 200) {
            console.log(result)
            props.navigation.navigate('Congratulation', {
                type: type
            })
        }
    }

    useEffect(() => {
        console.log(response.is_feedback)
    }, [])

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
                        {Strings.Overview}
                    </Text>
                    <View style={styles.row}>
                        <FastImage
                            source={require('../../Images/Person.png')}
                            resizeMode={FastImage.resizeMode.cover}
                            style={styles.vectorIcon}
                        />
                        <Text style={styles.mediumText}>
                            {Strings.Total_Person}
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
                            {Strings.Date}
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
                            {Strings.Booking_Time}
                        </Text>
                        <Text style={[styles.price, {
                            position: "absolute",
                            right: "0%"
                        }]}>
                            {response.booking_time}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Icon
                            name='approval'
                            color={darkBlue}
                            size={30}
                        />
                        <Text style={styles.mediumText}>
                            {Strings.Status}
                        </Text>
                        <Text style={[styles.price, {
                            position: "absolute",
                            right: "0%"
                        }]}>
                            {response.status}
                        </Text>
                    </View>
                    {response.status === 'cancel' &&
                        <Text style={[styles.mediumText, {
                            textAlign: "left",
                            // fontFamily: "Montserrat-SemiBold",
                            fontSize: widthPercentageToDP(4.5),
                            marginTop: heightPercentageToDP(2)
                        }]}>
                            {Strings.Reason}{response.reason}
                        </Text>
                    }
                    <Text style={[styles.findTxt, {
                        textAlign: "left",
                        fontFamily: "Montserrat-SemiBold",
                        fontSize: widthPercentageToDP(5),
                        marginTop: heightPercentageToDP(5)
                    }]}>
                        {Strings.Menu}
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
                            {Strings.Total_Price}
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
                                confirmApi()
                            }}
                            style={[styles.btn, {
                                marginBottom: heightPercentageToDP(2)
                            }]}
                        >
                            <Text style={styles.btnTxt}>
                                {type === 'checking' ? Strings.COMING : Strings.Checkou}
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
                {isLoading &&
                    <ActivityIndicator
                        size="large"
                        color={darkBlue}
                        style={styles.loading}
                    />
                }
            </KeyboardAwareScrollView>
            {response.status === 'approve' ?
                response.is_feedback === 'no' ?
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('Rating', {
                                data: response
                            })
                        }}
                        style={{
                            width: widthPercentageToDP(20),
                            height: widthPercentageToDP(20),
                            borderRadius: widthPercentageToDP(20) / 2,
                            backgroundColor: darkBlue,
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            bottom: "2%",
                            right: "3%",
                            zIndex: 3
                        }}>
                        <Icon
                            name='feedback'
                            color={white}
                            size={30}
                        />
                    </TouchableOpacity>
                    : <View />
                : <View />
            }
        </View>
    )
}

export default OverView;