import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import { Header } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toggle from '../../Component/Toggle'
import { data } from './data'
import Booking from '../../Component/Booking'
import { getBookings, checkComingBtn } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';
import Strings from '../../Translation'

const MyBooking = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')
    const [toggleValue, setToggleValue] = useState(1);

    useEffect(() => {
        bookingApi()
    }, [])

    const bookingApi = async () => {
        setLoading(true)
        const result = await getBookings(login.data.id)
        await setResponse(result)
        await setLoading(false)
    }

    const comingBtnApi = async (b_id, large_image, small_image,item) => {
        setLoading(true)
        const result = await checkComingBtn(b_id)
        await setLoading(false)
        if (result.status == 200) {
            props.navigation.navigate('ConfirmBooking', {
                type: 'checking',
                response: item,
                showBtn: result.data === 'yes' ? true : false,
                large_image: large_image,
                small_image: small_image,
                booking_id: b_id
            })
        }
    }



    return (
        <View style={styles.container}>
            <Header
                leftComponent={
                    <TouchableOpacity
                        onPress={() => { props.navigation.goBack() }}>
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            color={black}
                            size={35}
                        />
                    </TouchableOpacity>
                }
                centerComponent={{
                    text: Strings.MY_BOOKINGS, style: {
                        color: black,
                        fontSize: widthPercentageToDP(4),
                        fontFamily: "Montserrat-Bold",
                    }
                }}
                containerStyle={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 0,
                    //height: heightPercentageToDP(17)
                }}
                statusBarProps={{
                    backgroundColor: white
                }}
                barStyle="dark-content"
            />
            <View style={{ alignSelf: "center", marginTop: heightPercentageToDP(4), width: widthPercentageToDP(95) }}>
                <Toggle
                    selectionMode={1}
                    roundCorner={true}
                    option1={Strings.Upcoming}
                    option2={Strings.Previous}
                    onSelectSwitch={(newState) => setToggleValue(newState)}
                    selectionColor={darkBlue}
                />
            </View>
            {!response ?
                <View />
                : <FlatList
                    data={toggleValue == 1 ?
                        response['upcoming-bookings']
                        : response['previous-bookings']}
                    style={{ marginTop: heightPercentageToDP(5) }}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={({ item }) => (
                        <Booking
                            clickHandler={() => {
                                if (toggleValue == 1) {
                                    comingBtnApi(
                                        item.id,
                                        item.large_image,
                                        item.small_image,
                                        item
                                    )
                                } else {
                                    props.navigation.navigate('ConfirmBooking', {
                                        type: 'checking',
                                        response: item,
                                        showBtn: false,
                                        large_image: item.large_image,
                                        small_image: item.small_image,
                                        booking_id: item.id
                                    })
                                }

                            }}
                            name={item.name}
                            image={'http://108.61.209.20/' + item.small_image}
                        />
                    )}
                />}
            {isLoading &&
                <ActivityIndicator
                    size="large"
                    color={darkBlue}
                    style={styles.loading}
                />
            }
        </View>
    )
}

export default MyBooking