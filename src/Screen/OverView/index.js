import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, Modal, ActivityIndicator, TextInput, Alert } from 'react-native'
import { styles } from '../../Stylesheet'
import FastImage from 'react-native-fast-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, lightGrey, white } from '../../Colors'
import { getUseraddUserItem, userCheckOut, applyCoupanCode } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';
import Strings from '../../Translation'


const OverView = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')
    const [code, setCode] = useState('')
    const type = props.route.params.type
    const total_person = props.route.params.total_person
    const date = props.route.params.date
    const time = props.route.params.time
    const senTime = props.route.params.senTime
    const rest_id = props.route.params.rest_id
    const large_image = props.route.params.large_image
    const small_image = props.route.params.small_image

    useEffect(() => {
        getAddUserItemApi();
    }, [])

    const getAddUserItemApi = async () => {
        setLoading(true)
        const result = await getUseraddUserItem(login.data.id, rest_id)
        await setResponse(result)
        await setLoading(false)
    }
    const coupanApi = async () => {
        setLoading(true)
        const result = await applyCoupanCode(login.data.id,code)
        await setLoading(false)
        if (result.status == 200) {
            getAddUserItemApi()
        }
    }
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
                            {total_person}
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
                            {date}
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
                            {time}
                        </Text>
                    </View>

                    <View style={{
                        width: "100%",
                        height: heightPercentageToDP(8),
                        flexDirection: "row",
                        alignItems: "center",
                        //backgroundColor: "red",
                        marginTop: heightPercentageToDP(2)
                    }}>
                        <TextInput
                            style={{
                                width: "65%",
                                height: "100%",
                                //backgroundColor: "yellow",
                                fontSize: widthPercentageToDP(4),
                                fontFamily: "Montserrat-Medium",
                                color: darkBlue,
                                borderWidth: widthPercentageToDP(0.1),
                                borderColor: darkBlue,
                                paddingLeft: 5
                            }}
                            onChangeText={text => setCode(text)}
                            placeholder={Strings.Enter_discount_code}
                            placeholderTextColor={darkBlue}
                            keyboardType="email-address"
                        />
                        <TouchableOpacity
                            onPress={() => {
                                if (!code) {
                                    Alert.alert("", "Please enter a valid code")
                                } else {
                                    coupanApi()
                                }
                            }}
                            style={{
                                position: "absolute",
                                right: "0%",
                                top: "3%",
                                zIndex: 3,
                                backgroundColor: darkBlue,
                                height: "90%",
                                width: "30%",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: widthPercentageToDP(3)
                            }}>
                            <Text style={[styles.price, {
                                color: white,
                                textAlign: "center"
                            }]}>
                                {Strings.Apply}
                            </Text>
                        </TouchableOpacity>

                    </View>


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
                        : !response.items_array.length ?
                            <View style={{
                                width: "100%",
                                height: heightPercentageToDP(25),
                                alignItems: "center"
                            }}>
                                <FastImage
                                    source={require('../../Images/disablehookah.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{
                                        width: "100%",
                                        height: "100%"
                                    }}
                                />
                                <Text style={[styles.mediumText, {
                                    color: lightGrey,
                                    marginTop: heightPercentageToDP(1)
                                }]}>
                                    {Strings.No_Menu_Item_Selected}
                                </Text>
                            </View>
                            : <FlatList
                                data={response.items_array}
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

                    {!response || !response.items_array.length ?
                        <View />
                        : <View style={[styles.row2, {
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
                    }

                    <TouchableOpacity
                        onPress={() => {
                            checkoutApi()
                        }}
                        style={[styles.btn, {
                            marginTop: heightPercentageToDP(6),
                            marginBottom: heightPercentageToDP(2)
                        }]}
                    >
                        <Text style={styles.btnTxt}>
                            {type === 'checking' ? Strings.COMING : Strings.Checkou}
                        </Text>
                    </TouchableOpacity>
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