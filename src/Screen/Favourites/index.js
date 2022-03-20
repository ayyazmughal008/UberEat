import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Modal } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, white, gold3 } from '../../Colors'
import { styles } from '../../Stylesheet'
import { Header } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { data } from './data'
import Items from '../../Component/FavouriteItems'
import { useDispatch, useSelector } from 'react-redux';
import { getUserFav } from '../../Redux/action'
import { Calendar } from 'react-native-calendars';
import moment from 'moment'
import Strings from '../../Translation'

const MyBooking = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [toggleValue, setToggleValue] = useState(1);
    const [currentIndex, setIndex] = useState(0)
    const [isPopUp, setPopUp] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')
    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [date2, setDate2] = useState('')
    const [counter, setCounter] = useState(1)
    const [formatedDate, setFormatedDate] = useState('')

    useEffect(() => {
        getFavApi()
    }, [])
    useEffect(() => {
        setFormatedDate(moment(date).format('DD MMM'))
    }, [date, formatedDate])

    const getFavApi = async () => {
        setLoading(true)
        const result = await getUserFav(login.data.id)
        await setResponse(result)
        await setLoading(false)
    }
    const addCount = () => {
        setCounter(counter + 1)
    }
    const minusCount = () => {
        if (counter == 1) {
            return
        } else {
            setCounter(counter - 1)
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
                    text: Strings.FAVOURITES, style: {
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
            {!response || !response.data.length ?
                <View />
                : <FlatList
                    data={response.data}
                    style={{ marginTop: heightPercentageToDP(5) }}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={({ item, index }) => (
                        <Items
                            clickHandler={() => {
                                setPopUp(true),
                                    setIndex(index)
                            }}
                            name={item.name}
                            image={'http://108.61.209.20/' + item.small_image}
                        />
                    )}
                />
            }
            {isLoading &&
                <ActivityIndicator
                    size="large"
                    color={darkBlue}
                    style={styles.loading}
                />
            }
            {isPopUp &&
                <Modal
                    transparent={true}
                    visible={isPopUp}
                    animationType="slide"
                    onRequestClose={() => console.log('close')}
                >
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        opacity: 1
                    }}>
                        <View style={[styles.innerModal, {
                            height: heightPercentageToDP(76)
                        }]}>
                            <Text style={[styles.findTxt, {
                                textAlign: "center",
                                fontSize: widthPercentageToDP(6)
                            }]}>
                                {Strings.Date_and_Persons}
                            </Text>
                            <View style={styles.line2} />
                            <Calendar
                                onDayPress={day => {
                                    setDate(day.dateString),
                                        setDate2({ [day.dateString]: { selected: true, selectedColor: gold3 } })
                                }}
                                // Handler which gets executed on day long press. Default = undefined
                                onDayLongPress={day => {
                                    console.log('selected day', day);
                                }}
                                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                                monthFormat={'yyyy MM'}
                                // Handler which gets executed when visible month changes in calendar. Default = undefined
                                onMonthChange={month => {
                                    console.log('month changed', month);
                                }}
                                theme={{
                                    backgroundColor: '#ffffff',
                                    calendarBackground: '#ffffff',
                                    textSectionTitleColor: '#b6c1cd',
                                    textSectionTitleDisabledColor: '#d9e1e8',
                                    selectedDayBackgroundColor: '#00adf5',
                                    selectedDayTextColor: '#000',
                                    todayTextColor: '#00adf5',
                                    dayTextColor: '#2d4150',
                                    textDisabledColor: '#d9e1e8',
                                    dotColor: '#00adf5',
                                    selectedDotColor: '#ffffff',
                                    arrowColor: 'orange',
                                    disabledArrowColor: '#d9e1e8',
                                    monthTextColor: 'blue',
                                    indicatorColor: 'blue',
                                    textDayFontFamily: 'monospace',
                                    textMonthFontFamily: 'monospace',
                                    textDayHeaderFontFamily: 'monospace',
                                    textDayFontWeight: '300',
                                    textMonthFontWeight: 'bold',
                                    textDayHeaderFontWeight: '300',
                                    textDayFontSize: 16,
                                    textMonthFontSize: 16,
                                    textDayHeaderFontSize: 16
                                }}
                                markedDates={date2}
                                hideExtraDays={true}
                                enableSwipeMonths={true}
                            />
                            <View style={styles.line2} />
                            <View style={styles.row3}>
                                <Text style={[styles.smallTxt, {
                                    fontFamily: "Montserrat-Medium",
                                    fontSize: widthPercentageToDP(4.5)
                                }]}>
                                    {Strings.Total_Person}
                                </Text>
                                <View style={styles.row4}>
                                    <TouchableOpacity
                                        onPress={() => minusCount()}
                                        style={styles.blueCircle}>
                                        <Text style={styles.btnTxt}>
                                            {"-"}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.smallTxt, {
                                        fontFamily: "Montserrat-Medium",
                                        marginTop: 0
                                    }]}>
                                        {counter}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => addCount()}
                                        style={styles.blueCircle}>
                                        <Text style={styles.btnTxt}>
                                            {"+"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setPopUp(false)
                                    setTimeout(() => {
                                        props.navigation.navigate('HotelDetail', {
                                            contacts: response.data[currentIndex].contact,
                                            menu: response.data[currentIndex].menu,
                                            name: response.data[currentIndex].name,
                                            country: response.data[currentIndex].country,
                                            city: response.data[currentIndex].city,
                                            rating: response.data[currentIndex].averageRating,
                                            id: response.data[currentIndex].id,
                                            large_image: response.data[currentIndex].large_image,
                                            small_image: response.data[currentIndex].small_image,
                                            total_person: counter,
                                            date: date,
                                        })
                                    }, 1000)
                                }}
                                style={[styles.btn, {
                                    position: "absolute",
                                    bottom: "2%"
                                }]}>
                                <Text style={styles.btnTxt}>
                                    {Strings.Select}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            }
        </View>
    )
}

export default MyBooking