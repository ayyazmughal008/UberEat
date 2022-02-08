import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, FlatList, TouchableOpacity, Modal, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native'
import { styles } from '../../Stylesheet'
import Headers from '../../Component/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { black, darkBlue, lightBlue, lightGrey, offWhite, textBlack, white, gold3 } from '../../Colors'
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image'
import { Input, Header, SearchBar } from 'react-native-elements';
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
import {
    getCountryName,
    getAllRestaurant,
    getRecentData,
    getSocialData,
    clearAllSearches,
    updateUserToken,
    updateRecentSearch,
    checkPopUps
} from '../../Redux/action'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const Dashboard = (props) => {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const token = useSelector((state) => state.user.token);
    const countryData = useSelector((state) => state.user.countryData);
    const [toggleValue, setToggleValue] = useState(1);
    const [isHide, setHide] = useState(false)
    const [isPopUp, setPopUp] = useState(false)
    const [isPopUp2, setPopUp2] = useState(false)
    const [date, setDate] = useState(new Date())
    const [date2, setDate2] = useState('')
    const [searchId, setId] = useState('')
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
    const [recentResponse, setRecent] = useState('')
    const [socialResponse, setSocial] = useState('')
    const [isAnimate, setAnimate] = useState(true)
    const [countryList2, setCountryList2] = useState([])
    const [countryList, setCountryList] = useState([{ name: "Spain" }])
    const [countryText, setCountryText] = useState("")
    const [cityList2, setCityList2] = useState([])
    const [cityText, setCityText] = useState("")

    useEffect(() => {
        getCurrentLocation()
        //dispatch(getCountryName())
        getCityName()
        recentDataApi()
        socialDataApi()
        updateUserToken(login.data.id, token)
        checkIsPopup()
    }, [])
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            recentDataApi()
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (region.latitude && region.longitude) {
            onRegionChangeComplete(region)
        }
    }, [region])
    useEffect(() => {
        setFormatedDate(moment(date).format('DD MMM'))
    }, [date, formatedDate])

    useEffect(() => {
        setTimeout(() => {
            setAnimate(false)
        }, 5000);
    }, [])
    const checkIsPopup = async () => {
        if (login) {
            const result = await checkPopUps(login.data.id)
            if (result.popup === 'yes') {
                props.navigation.navigate('Rating', {
                    data: result.data
                })
            }
        }
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
    const onRegionChangeComplete = async (region) => {
        setLoading(true)
        const data = await findPlaceFromLatLng(`${region.latitude},${region.longitude}`);
        if (data.status === 'ZERO_RESULTS' || data.status === 'OK') {
            let getStrings = await data.plus_code.compound_code.slice(9);
            let splitString = await getStrings.split(', ')
            await setCity(splitString[0])
            await SetCountry(splitString[1])
            //await SetCountry(data.results[1].address_components[5].long_name)
            setLoading(false)
        }
    };
    const getCurrentLocation = async () => {
        if (Platform.OS === 'ios') {
            await geolocation.requestAuthorization('whenInUse')
        }
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
                country: "Spain"
            })
        })
            .then(res => res.json())
            .then(json => {
                setLoading(false)
                //console.log(json)
                if (json.error == false) {
                    setCityList(json.data)
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
            "Spain",
            city,
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
    const updateSearchApi = async (id) => {
        setLoading(true)
        const result = await updateRecentSearch(
            id,
            login.data.id,
            moment(date).format('YYYY-MM-DD'),
        )
        await setResponse(result)
        await setLoading(false)
        if (result.status == 200) {
            props.navigation.navigate('HotelList', {
                data: result
            })
        }
    }
    const recentDataApi = async () => {
        setLoading(true)
        const result = await getRecentData(login.data.id)
        await setRecent(result)
        await setLoading(false)

    }
    const socialDataApi = async () => {
        setLoading(true)
        const result = await getSocialData(login.data.id)
        await setSocial(result)
        await setLoading(false)

    }
    const iosDownload = (fileUrl) => {
        setLoading(true)
        var date = new Date();
        var url = fileUrl;
        var encoded = encodeURI(url)
        var ext = extention(encoded);
        ext = "." + ext[0];
        const localFile = RNFS.DocumentDirectoryPath + "/Myhookah_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext;

        const options = {
            fromUrl: encoded,
            toFile: localFile
        };
        RNFS.downloadFile(options).promise
            .then(() => FileViewer.open(localFile, { showOpenWithDialog: true }))
            .then(susscess => {
                console.log("Download Successfull => ", susscess)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            });
    }
    const download = (fileUrl) => {
        setLoading(true)
        var date = new Date();
        var url = fileUrl;
        var ext = extention(url);
        ext = "." + ext[0];
        const { config, fs } = RNFetchBlob
        let DownloadDir = fs.dirs.DownloadDir
        //this.setState({ isOpen: true })
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: DownloadDir + "/Myhookah_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
                description: 'Myhookah'
            }
        }
        config(options).fetch('GET', url)
            .then((res) => {
                console.log("my download response ==>", res)
                setLoading(false)
            })
            .catch(error => {
                console.log("my download response error ==>", error)
                setLoading(false)
            })
    }
    const extention = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }
    const requestPermission = async (url) => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Agefred',
                    message:
                        'Agefred App needs access to your Storage ' +
                        'so you can download and save any files.',
                    //buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                download(url)
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
    const searchFilterFunction = text => {
        let temList = countryData;
        const newData = temList.filter(item => {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        //setCountryList(data => ([data, ...newData]));
        setCountryList2(newData)
        setCountryText(text)
    };
    const searchCityFilterFunction = text => {
        let temList = cityList;
        const newData = temList.filter(item => {
            const itemData = item ? item.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        //setCountryList(data => ([data, ...newData]));
        setCityList2(newData)
        setCityText(text)
    };
    const deleteSearch = async () => {
        setLoading(true)
        const result = await clearAllSearches(login.data.id)
        await setLoading(false)
        if (result.status == 200) {
            recentDataApi()
        }
    }




    return (
        <SafeAreaView
            style={styles.container}>
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
                            onPress={() => { setCityModal(true) }}
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
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between", marginTop: heightPercentageToDP(2) }}>
                        <Text style={[styles.searchTxt, {
                            color: darkBlue,
                            marginTop: 0
                        }]}>
                            {"Recent Search"}
                        </Text>
                        <TouchableOpacity
                            onPress={() => deleteSearch()}
                        >
                            <Text style={[styles.greetingTxt, {
                                marginTop: 0,
                                color: darkBlue,
                                fontFamily: "Montserrat-SemiBold",
                            }]}>
                                {"Clear all"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {!recentResponse || !recentResponse.data.length ?
                        <View />
                        : <FlatList
                            //contentContainerStyle={{ alignItems: "center" }}
                            data={recentResponse.data}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            style={{
                                marginTop: heightPercentageToDP(2),
                                height: heightPercentageToDP(20)
                            }}
                            keyExtractor={(item, index) => 'key' + index}
                            renderItem={({ item }) => (
                                <Rececnt
                                    //dishImg={item.img}
                                    title={item.type}
                                    date={item.date}
                                    city={item.city}
                                    //adult={item.search_date}
                                    person={item.total_person}
                                    time={item.search_time}
                                    clickHandler={() => {
                                        setDate(item.date2),
                                            setDate2({ [item.date2]: { selected: true, selectedColor: gold3 } }),
                                            setId(item.id),
                                            setPopUp2(true)
                                    }}
                                />
                            )}
                        />
                    }
                    {isPopUp2 &&
                        <Modal
                            transparent={true}
                            visible={isPopUp2}
                            animationType="slide"
                            onRequestClose={() => console.log('close')}
                        >
                            <TouchableOpacity
                                onPress={() => setPopUp2(false)}
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flex: 1,
                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                    opacity: 1
                                }}>
                                <View style={[styles.innerModal, {
                                    height: heightPercentageToDP(55)
                                }]}>
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
                                    <TouchableOpacity
                                        onPress={() => {
                                            setPopUp2(false),
                                                updateSearchApi(searchId)
                                        }}
                                        style={[styles.btn, {
                                            position: "absolute",
                                            bottom: "2%"
                                        }]}>
                                        <Text style={styles.btnTxt}>
                                            {"Select"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    }
                    <View style={{ height: heightPercentageToDP(10) }} />
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
                                    <View style={[styles.row3, {
                                        marginTop: heightPercentageToDP(1),
                                        justifyContent: "space-between",
                                        width: "90%"
                                    }]}>
                                        <View style={{ flexDirection: "row", alignItems: "center", width: "50%", }}>
                                            <RadioButton.Android
                                                value="first"
                                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                                onPress={() => setChecked('first')}
                                                color={darkBlue}
                                                uncheckedColor={darkBlue}
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
                                            <RadioButton.Android
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
                                            <RadioButton.Android
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
                                            <RadioButton.Android
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
                                        onPress={() => {
                                            //console.log(date)
                                            setPopUp(false)
                                        }}
                                        style={[styles.btn, {
                                            position: "absolute",
                                            bottom: "2%"
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
                    {!socialResponse || !socialResponse.data.length ?
                        <View />
                        : <FlatList
                            data={socialResponse.data}
                            showsVerticalScrollIndicator={false}
                            style={{ marginTop: heightPercentageToDP(2), }}
                            keyExtractor={(item, index) => 'key' + index}
                            renderItem={({ item, index }) => (
                                <Trending
                                    dishImg={'http://108.61.209.20/' + item.large_image}
                                    title={item.name}
                                    date={item.date}
                                    name={item.person_name}
                                    profile={'http://108.61.209.20/' + item.small_image}
                                    downloadClick={() => {
                                        if (Platform.OS === 'ios') {
                                            iosDownload('http://108.61.209.20/' + item.large_image)
                                        } else {
                                            requestPermission('http://108.61.209.20/' + item.large_image)
                                        }
                                    }}
                                //clickHandler={() => { props.navigation.navigate('HotelDetail') }}
                                />
                            )}
                        />}
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
                                {/* <SearchBar
                                    placeholder="Search country..."
                                    lightTheme
                                    round
                                    value={countryText}
                                    onChangeText={text => searchFilterFunction(text)}
                                    autoCorrect={false}
                                    inputContainerStyle={{ backgroundColor: white }}
                                    inputStyle={{ fontSize: widthPercentageToDP(5), color: black }}
                                    containerStyle={{ width: widthPercentageToDP(95), backgroundColor: white }}
                                //style={{}}
                                /> */}
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

                            {!countryList || !countryList.length ?
                                <View />
                                : <FlatList
                                    data={countryList}
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
                                {/* <FastImage
                                    source={require('../../Images/Location.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.vectorIcon}
                                />
                                <Text style={[styles.greetingTxt, { marginTop: 0, marginLeft: widthPercentageToDP(3) }]}>
                                    {city}
                                </Text> */}
                                <SearchBar
                                    placeholder="Search city..."
                                    lightTheme
                                    round
                                    value={cityText}
                                    onChangeText={text => searchCityFilterFunction(text)}
                                    autoCorrect={false}
                                    inputContainerStyle={{ backgroundColor: white }}
                                    inputStyle={{ fontSize: widthPercentageToDP(5), color: black }}
                                    containerStyle={{ width: widthPercentageToDP(95), backgroundColor: white }}
                                //style={{}}
                                />
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
                                    data={!cityText ? cityList : cityList2}
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