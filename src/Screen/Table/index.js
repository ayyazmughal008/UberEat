import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, Modal, ActivityIndicator, Alert } from 'react-native'
import { styles } from '../../Stylesheet'
import FastImage from 'react-native-fast-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, lightGrey, white } from '../../Colors'
import { getTimes, userCheckOut } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';



const Table = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const data = props.route.params.data
    const large_image = props.route.params.large_image
    const small_image = props.route.params.small_image
    const rest_id = props.route.params.rest_id
    const total_person = props.route.params.total_person
    const date = props.route.params.date
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')
    const [activeIndex, setIndex] = useState(null)

    useEffect(() => {
        getTimesApi()
        console.log('==>', total_person, date)
    }, [])

    const getTimesApi = async () => {
        setLoading(true)
        const result = await getTimes(rest_id)
        await setResponse(result)
        await setLoading(false)
    }
    const checkoutApi = async () => {
        setLoading(true)
        const result = await userCheckOut(
            login.data.id,
            rest_id,
            1,
            '11 Dec',
            response.data[activeIndex].show
        )
        await setLoading(false)
        // if (result.status == 200) {
        //     console.log(result)
        //     // props.navigation.navigate('OverView', {
        //     //     type: "route"
        //     // })
        // }
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
                        marginTop: heightPercentageToDP(3)
                    }]}>
                        {"Select Available Table"}
                    </Text>

                    {!response || !response.data.length ?
                        <View />
                        : <FlatList
                            data={response.data}
                            numColumns={2}
                            contentContainerStyle={{ flexGrow: 1 }}
                            //style={{ marginTop: heightPercentageToDP(3), }}
                            keyExtractor={(item, index) => 'key' + index}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => setIndex(index)}
                                    style={[styles.rectangle, {
                                        marginRight: widthPercentageToDP(2),
                                        marginTop: heightPercentageToDP(1),
                                        backgroundColor: activeIndex == index ? darkBlue : white
                                    }]}>
                                    <FastImage
                                        source={require('../../Images/Table.png')}
                                        resizeMode={FastImage.resizeMode.cover}
                                        style={{
                                            width: "68%",
                                            height: "50%"
                                        }}
                                        tintColor={activeIndex == index ? white : black}
                                    />
                                    <Text style={[styles.findTxt, {
                                        textAlign: "center",
                                        fontFamily: "Montserrat-SemiBold",
                                        fontSize: widthPercentageToDP(5),
                                        marginTop: heightPercentageToDP(2),
                                        color: activeIndex == index ? white : black
                                    }]}>
                                        {item.show}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />}

                    <TouchableOpacity
                        onPress={() => {
                            if (!activeIndex) {
                                Alert.alert('Select Time', "Please select he time for table reservation")
                            } else {
                                props.navigation.navigate('OverView', {
                                    type: "route",
                                    time: response.data[activeIndex].show,
                                    senTime: response.data[activeIndex]['send-me'],
                                    date: date,
                                    total_person: total_person,
                                    rest_id: rest_id,
                                    small_image: small_image,
                                    large_image: large_image
                                })
                            }
                        }
                        }
                        style={[styles.btn, {
                            marginBottom: heightPercentageToDP(2)
                        }]}>
                        <Text style={styles.btnTxt}>
                            {"Next"}
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

export default Table