import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, FlatList, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import { styles } from '../../Stylesheet'
import Headers from '../../Component/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { black, darkBlue, lightBlue, lightGrey, offWhite, textBlack, white } from '../../Colors'
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image'
import { Input, Header } from 'react-native-elements';
import { data } from './data'
import Rececnt from '../../Component/Recent'
import Trending from '../../Component/Trending'
import CustomSwitch from '../../Component/CustomSwitch'
import * as Animatable from 'react-native-animatable';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'react-native-paper';
import { findPlaceFromLatLng } from './google.service'
import geolocation from 'react-native-geolocation-service'
import { getCountryName, getAllRestaurant } from '../../Redux/action'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'

const Dashboard = (props) => {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const countryData = useSelector((state) => state.user.countryData);
    const [toggleValue, setToggleValue] = useState(1);
    const [isHide, setHide] = useState(false)
    const [isPopUp, setPopUp] = useState(false)
    const [date, setDate] = useState(new Date())
    const [formatedDate, setFormatedDate] = useState('')
    const [countryModal, setCountryModal] = useState(false)
    const [cityModal, setCityModal] = useState(false)
    const [checked, setChecked] = React.useState('');
    const [counter, setCounter] = useState(1)
    const [country, SetCountry] = useState("")
    const [city, setCity] = useState("")
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
    })
    const [cityList, setCityList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')

    useEffect(() => {
        getCurrentLocation()
        dispatch(getCountryName())
    }, [])

    useEffect(() => {
        if (region.latitude && region.longitude) {
            onRegionChangeComplete(region)
        }
    }, [region])
    useEffect(() => {
        setFormatedDate(moment(date).format('DD MMM'))
        console.log(formatedDate)
    }, [date, formatedDate])
    useEffect(() => {
        console.log(JSON.stringify(response))
    }, [response])
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
    const onRegionChangeComplete = async (region) => {
        setLoading(true)
        const data = await findPlaceFromLatLng(`${region.latitude},${region.longitude}`);
        if (data.status === 'ZERO_RESULTS') {
            let getStrings = await data.plus_code.compound_code.slice(9);
            let splitString = await getStrings.split(', ')
            await setCity(splitString[0])
            await SetCountry(splitString[1])
            //await SetCountry(data.results[1].address_components[5].long_name)
            setLoading(false)
        }
    };
    const getCurrentLocation = () => {
        geolocation.getCurrentPosition(
            (position) => {
                //console.log('updated ==>', position)
                setRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            },
            (error) => {
                console.log(JSON.stringify(error));
            },
            {
                enableHighAccuracy: false,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 10
            },
        );
    }
    const getCityName = (country) => {
        setLoading(true)
        fetch("https://countriesnow.space/api/v0.1/countries/cities", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                country: country
            })
        })
            .then(res => res.json())
            .then(json => {
                setLoading(false)
                console.log(json)
                if (json.error == false) {
                    setCityList(json.data)
                    setCityModal(true)
                } else {
                    alert(json.error)
                }
            })
            .catch(error => {
                setLoading(false)
                console.log("response error ===>", error)
            })
    }
    const restaurantApi = async () => {
        setLoading(true)
        const result = await getAllRestaurant(
            login.data.id,
            null,
            null,
            moment(date).format('YYYY-MM-DD'),
            counter,
            checked === 'first' ? "Bar"
                : checked === 'second' ? "Pub" :
                    checked === 'third' ? "Restaurante" :
                        checked === 'fourth' ? "Noche" : ""
        )
        await setResponse(result)
        await setLoading(false)
        if (result.status == 200) {
            props.navigation.navigate('HotelList', {
                data: result
            })
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <Headers
                userImg={require('../../Images/profile.png')}
                title={"MYHOOKAH"}
                isProfile={true}
                leftClick={() => props.navigation.navigate('Profile')}
                iconName={"notifications-outline"}
                //isProfile={!login.data.image ? false : true}
                profileImage={login.data.image}
                rightClick={() => props.navigation.navigate('Notification')}
            />
            {toggleValue == 1 ?
                <View style={styles.dashboardMainView}>
                    <Text style={styles.greetingTxt}>
                        {"Hello "}{login.data.name}
                    </Text>
                    <Text style={[styles.findTxt, {
                        color: darkBlue
                    }]}>
                        {"Find Your Restaurant"}
                    </Text>
                    <View style={styles.row5}>
                        <TouchableOpacity
                            onPress={() => { setCountryModal(true) }}
                        >
                            <FastImage
                                source={require('../../Images/Location.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={styles.vectorIcon}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.greetingTxt, { marginTop: 0, marginLeft: widthPercentageToDP(3) }]}>
                            {city + ', ' + country}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setHide(!isHide)}
                        style={[styles.inputView, {
                            width: widthPercentageToDP(90),
                            marginTop: heightPercentageToDP(3),
                            //justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center"
                        }]}>
                        <FastImage
                            source={require('../../Images/Search-1.png')}
                            resizeMode={FastImage.resizeMode.cover}
                            style={[styles.vectorIcon, {
                                marginLeft: widthPercentageToDP(3)
                            }]}
                        />
                        <Text style={[styles.greetingTxt, {
                            marginTop: 0,
                            marginLeft: widthPercentageToDP(3),
                            color: lightGrey
                        }]}>
                            {city + ', ' + country}
                        </Text>
                    </TouchableOpacity>
                    {isHide &&
                        <Animatable.View
                            duration={500}
                            animation="slideInDown"
                        >
                            <TouchableOpacity
                                onPress={() => setPopUp(true)}
                                style={[styles.inputView, {
                                    width: widthPercentageToDP(90),
                                    marginTop: 0,
                                    //justifyContent: "center",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }]}>
                                <FastImage
                                    source={require('../../Images/Calender.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={[styles.vectorIcon, {
                                        marginLeft: widthPercentageToDP(3)
                                    }]}
                                />
                                <Text style={[styles.greetingTxt, {
                                    marginTop: 0,
                                    marginLeft: widthPercentageToDP(3),
                                    color: lightGrey
                                }]}>
                                    {checked === 'first' ? "Bar"
                                        : checked === 'second' ? "Pub" :
                                            checked === 'third' ? "Restaurante" :
                                                checked === 'fourth' ? "Noche" : ""}
                                    <Text style={[styles.greetingTxt, {
                                        marginTop: 0,
                                        marginLeft: widthPercentageToDP(3),
                                        color: lightGrey
                                    }]}>
                                        {', '}{formatedDate}
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                            <View style={[styles.inputView, {
                                width: widthPercentageToDP(90),
                                marginTop: 0,
                                //justifyContent: "center",
                                flexDirection: "row",
                                alignItems: "center"
                            }]}>
                                <FastImage
                                    source={require('../../Images/Person.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={[styles.vectorIcon, {
                                        marginLeft: widthPercentageToDP(3)
                                    }]}
                                />
                                <Text style={[styles.greetingTxt, {
                                    marginTop: 0,
                                    marginLeft: widthPercentageToDP(3),
                                    color: lightGrey
                                }]}>
                                    {counter}{" person"}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setHide(false),
                                        restaurantApi()
                                }}
                                style={[styles.btn2]}
                            >
                                <Text style={[styles.btnTxt, {}]}>
                                    {"Search"}
                                </Text>
                            </TouchableOpacity>
                        </Animatable.View>

                    }
                    <Text style={[styles.searchTxt, {
                        color: darkBlue
                    }]}>
                        {"Recent Search"}
                    </Text>
                    <FlatList
                        data={data.recent}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: heightPercentageToDP(2), }}
                        keyExtractor={(item, index) => 'key' + index}
                        renderItem={({ item }) => (
                            <Rececnt
                                dishImg={item.img}
                                title={item.country}
                                date={item.date}
                                adult={item.adult}
                            //clickHandler={() => { props.navigation.navigate('HotelDetail') }}
                            />
                        )}
                    />

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
                                <View style={styles.innerModal}>
                                    <Text style={[styles.findTxt, {
                                        textAlign: "center",
                                        fontSize: widthPercentageToDP(6)
                                    }]}>
                                        {"Date, Time and Persons"}
                                    </Text>
                                    <View style={styles.line2} />
                                    <DatePicker
                                        mode="date"
                                        androidVariant="iosClone"
                                        date={date}
                                        onDateChange={date => setDate(date)}
                                    />
                                    <View style={styles.line2} />
                                    <View style={[styles.row3, {
                                        marginTop: heightPercentageToDP(1),
                                        justifyContent: "space-between",
                                        width: "90%"
                                    }]}>
                                        <View style={{ flexDirection: "row", alignItems: "center", width: "50%", }}>
                                            <RadioButton
                                                value="first"
                                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                                onPress={() => setChecked('first')}
                                                color={darkBlue}
                                            />
                                            <Text style={[styles.smallTxt, {
                                                fontFamily: "Montserrat-Medium",
                                                fontSize: widthPercentageToDP(4.5),
                                                marginLeft: widthPercentageToDP(2),
                                                marginTop: 0
                                            }]}>
                                                {"Bar"}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", width: "50%", }}>
                                            <RadioButton
                                                value="second"
                                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                                onPress={() => setChecked('second')}
                                                color={darkBlue}
                                            />
                                            <Text style={[styles.smallTxt, {
                                                fontFamily: "Montserrat-Medium",
                                                fontSize: widthPercentageToDP(4.5),
                                                marginLeft: widthPercentageToDP(2),
                                                marginTop: 0
                                            }]}>
                                                {"Pub"}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[styles.row3, {
                                        marginTop: heightPercentageToDP(1),
                                        justifyContent: "space-between",
                                        width: "90%"
                                    }]}>
                                        <View style={{ flexDirection: "row", alignItems: "center", width: "50%", }}>
                                            <RadioButton
                                                value="first"
                                                status={checked === 'third' ? 'checked' : 'unchecked'}
                                                onPress={() => setChecked('third')}
                                                color={darkBlue}
                                            />
                                            <Text style={[styles.smallTxt, {
                                                fontFamily: "Montserrat-Medium",
                                                fontSize: widthPercentageToDP(4.5),
                                                marginLeft: widthPercentageToDP(2),
                                                marginTop: 0
                                            }]}>
                                                {"Restaurante"}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", width: "50%", }}>
                                            <RadioButton
                                                value="second"
                                                status={checked === 'fourth' ? 'checked' : 'unchecked'}
                                                onPress={() => setChecked('fourth')}
                                                color={darkBlue}
                                            />
                                            <Text style={[styles.smallTxt, {
                                                fontFamily: "Montserrat-Medium",
                                                fontSize: widthPercentageToDP(4.5),
                                                marginLeft: widthPercentageToDP(2),
                                                marginTop: 0
                                            }]}>
                                                {"Noche"}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.line2} />
                                    <View style={styles.row3}>
                                        <Text style={[styles.smallTxt, {
                                            fontFamily: "Montserrat-Medium",
                                            fontSize: widthPercentageToDP(4.5)
                                        }]}>
                                            {"Total Persons :"}
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
                                        onPress={() => setPopUp(false)}
                                        style={[styles.btn, {
                                            position: "absolute",
                                            bottom: "4%"
                                        }]}>
                                        <Text style={styles.btnTxt}>
                                            {"Select"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    }

                </View>
                : <View style={styles.dashboardMainView}>
                    <Text style={[styles.findTxt, {
                        marginTop: heightPercentageToDP(2)
                    }]}>
                        {"Trending"}
                    </Text>
                    <Text style={[styles.greetingTxt, {
                        color: black,
                        fontFamily: "Montserrat-SemiBold",
                        marginTop: heightPercentageToDP(1)
                    }]}>
                        {"Recent Posts"}
                    </Text>
                    <FlatList
                        data={data.trending}
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: heightPercentageToDP(2), }}
                        keyExtractor={(item, index) => 'key' + index}
                        renderItem={({ item }) => (
                            <Trending
                                dishImg={item.img}
                                title={item.country}
                                date={item.date}
                                name={item.name}
                                profile={item.profile}
                            //clickHandler={() => { props.navigation.navigate('HotelDetail') }}
                            />
                        )}
                    />
                </View>

            }
            <View style={styles.bottomToggle}>
                <CustomSwitch
                    selectionMode={1}
                    roundCorner={true}
                    option1={'Search'}
                    option2={'Social'}
                    onSelectSwitch={(newState) => setToggleValue(newState)}
                    selectionColor={darkBlue}
                />
            </View>
            {isLoading &&
                <ActivityIndicator
                    size="large"
                    color={darkBlue}
                    style={styles.loading}
                />
            }
            {AuthLoading &&
                <ActivityIndicator
                    size="large"
                    color={darkBlue}
                    style={styles.loading}
                />
            }
            {countryModal &&
                <Modal
                    transparent={true}
                    visible={countryModal}
                    animationType="slide"
                    onRequestClose={() => console.log('close')}
                >
                    <View style={{ flex: 1, backgroundColor: white }}>
                        <Header
                            leftComponent={
                                <TouchableOpacity
                                    onPress={() => { setCountryModal(false) }}>
                                    <MaterialIcons
                                        name="close"
                                        color={black}
                                        size={35}
                                    />
                                </TouchableOpacity>
                            }
                            centerComponent={{
                                text: "Select Location", style: {
                                    color: black,
                                    fontSize: widthPercentageToDP(4),
                                    fontFamily: "Montserrat-Bold",
                                    marginTop: 5
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
                        <View style={styles.dashboardMainView}>
                            <View style={[styles.row5, {
                                borderBottomWidth: widthPercentageToDP(0.2),
                                borderBottomColor: black,
                                height: heightPercentageToDP(7)
                            }]}>
                                <FastImage
                                    source={require('../../Images/Location.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.vectorIcon}
                                />
                                <Text style={[styles.greetingTxt, { marginTop: 0, marginLeft: widthPercentageToDP(3) }]}>
                                    {country}
                                </Text>
                            </View>
                            <View style={[styles.row5, {
                                borderBottomWidth: widthPercentageToDP(0.2),
                                borderBottomColor: black,
                                height: heightPercentageToDP(7)
                            }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        onRegionChangeComplete(region),
                                            setCountryModal(false)
                                    }}
                                >
                                    <FastImage
                                        source={require('../../Images/location-img.png')}
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={styles.vectorIcon}
                                    //tintColor = {lightBlue}
                                    />
                                </TouchableOpacity>
                                <Text style={[styles.greetingTxt, { marginTop: 0, marginLeft: widthPercentageToDP(3), color: lightBlue }]}>
                                    {"Use current location"}
                                </Text>
                            </View>

                            {!countryData || !countryData.length ?
                                <View />
                                : <FlatList
                                    data={countryData}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ flexGrow: 1 }}
                                    style={{ marginTop: heightPercentageToDP(2), }}
                                    keyExtractor={(item, index) => 'key' + index}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                SetCountry(item.name),
                                                    getCityName(item.name),
                                                    setCountryModal(false)
                                            }}
                                            style={[styles.blockView, {
                                                justifyContent: "space-between"
                                            }]}>
                                            <Text style={[styles.blockTxt, {
                                                marginLeft: 0,
                                                textAlign: "left"
                                            }]}>
                                                {item.name}
                                            </Text>
                                            <MaterialIcons
                                                name="keyboard-arrow-right"
                                                color={black}
                                                size={30}
                                            />
                                        </TouchableOpacity>
                                    )}
                                />
                            }

                        </View>
                    </View>
                </Modal>
            }
            {cityModal &&
                <Modal
                    transparent={true}
                    visible={cityModal}
                    animationType="slide"
                    onRequestClose={() => console.log('close')}
                >
                    <View style={{ flex: 1, backgroundColor: white }}>
                        <Header
                            leftComponent={
                                <TouchableOpacity
                                    onPress={() => { setCityModal(false) }}>
                                    <MaterialIcons
                                        name="close"
                                        color={black}
                                        size={35}
                                    />
                                </TouchableOpacity>
                            }
                            centerComponent={{
                                text: "Select Location", style: {
                                    color: black,
                                    fontSize: widthPercentageToDP(4),
                                    fontFamily: "Montserrat-Bold",
                                    marginTop: 5
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
                        <View style={styles.dashboardMainView}>
                            <View style={[styles.row5, {
                                borderBottomWidth: widthPercentageToDP(0.2),
                                borderBottomColor: black,
                                height: heightPercentageToDP(7)
                            }]}>
                                <FastImage
                                    source={require('../../Images/Location.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.vectorIcon}
                                />
                                <Text style={[styles.greetingTxt, { marginTop: 0, marginLeft: widthPercentageToDP(3) }]}>
                                    {city}
                                </Text>
                            </View>
                            <View style={[styles.row5, {
                                borderBottomWidth: widthPercentageToDP(0.2),
                                borderBottomColor: black,
                                height: heightPercentageToDP(7)
                            }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        onRegionChangeComplete(region),
                                            setCityModal(false)
                                    }}
                                >
                                    <FastImage
                                        source={require('../../Images/location-img.png')}
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={styles.vectorIcon}
                                    //tintColor = {lightBlue}
                                    />
                                </TouchableOpacity>
                                <Text style={[styles.greetingTxt, { marginTop: 0, marginLeft: widthPercentageToDP(3), color: lightBlue }]}>
                                    {"Use current location"}
                                </Text>
                            </View>

                            {!cityList || !cityList.length ?
                                <View />
                                : <FlatList
                                    data={cityList}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ flexGrow: 1 }}
                                    style={{ marginTop: heightPercentageToDP(2), }}
                                    keyExtractor={(item, index) => 'key' + index}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setCity(item),
                                                    setCityModal(false)
                                            }}
                                            style={[styles.blockView, {
                                                justifyContent: "space-between"
                                            }]}>
                                            <Text style={[styles.blockTxt, {
                                                marginLeft: 0,
                                                textAlign: "left"
                                            }]}>
                                                {item}
                                            </Text>
                                            <MaterialIcons
                                                name="keyboard-arrow-right"
                                                color={black}
                                                size={30}
                                            />
                                        </TouchableOpacity>
                                    )}
                                />
                            }

                        </View>
                    </View>
                </Modal>
            }
        </SafeAreaView>
    )
}

export default Dashboard