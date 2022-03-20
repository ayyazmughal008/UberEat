import React, { useEffect } from 'react'
import { View, SafeAreaView, Text, FlatList, TouchableOpacity, Modal, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native'
import { styles } from '../../Stylesheet'
import Headers from '../../Component/Header'
import useState from 'react-usestateref'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { black, darkBlue, lightBlue, lightGrey, offWhite, textBlack, white, gold3, darkBlue2 } from '../../Colors'
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
    checkPopUps,
    getRanksData,
    getAllCities,
    getCitiesResturants
} from '../../Redux/action'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import moment from 'moment'
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Strings from '../../Translation'

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
    const [socialResponse, setSocial] = useState([])
    const [isAnimate, setAnimate] = useState(true)
    const [countryList2, setCountryList2] = useState([])
    const [countryList, setCountryList] = useState([{ name: "Spain" }])
    const [countryText, setCountryText] = useState("")
    const [cityList2, setCityList2] = useState([])
    const [cityText, setCityText] = useState("")
    // new states
    const [cities, setCities, counterRef2] = useState([])
    const [citiesText, setCitiesText] = useState("")
    const [citiesResponse, setCitiesResponse] = useState([])
    const [citiesResponse2, setCitiesResponse2] = useState([])
    const [citiesPopup, setCitiesPopup] = useState(false)
    // new states for selected cities
    const [selectedCitiesText, setSelectedCitiesText] = useState("")
    const [selectedCitiesResponse, setSelectedCitiesResponse, counterRef] = useState([])
    const [selectedCitiesResponse2, setSelectedCitiesResponse2] = useState([])
    const [selectedCitiesPopup, setSelectedCitiesPopup] = useState(false)
    const [isActive, setIsActive] = useState(false)
    // new states for resturants
    const [resturants, setResturants, counterRef3] = useState([])
    const [resturantsText, setResturantsText] = useState("")
    const [resturantsResponse, setResturantsResponse] = useState([])
    const [resturantsResponse2, setResturantsResponse2] = useState([])
    const [resturantsPopup, setResturantsPopup] = useState(false)
    const [isActive2, setIsActive2] = useState(false)

    useEffect(() => {
        getCurrentLocation()
        citiesApi()
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
    const citiesApi = async () => {
        setLoading(true)
        const result = await getAllCities()
        await setCitiesResponse(result.data)
        await setLoading(false)
    }
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
        const result = await getRanksData(login.data.id, counterRef3.current)
        await setSocial(result.data)
        await setLoading(false)
    }
    const rankRastuDataApi = async () => {
        setLoading(true)
        const result = await getCitiesResturants(login.data.id, cities)
        await setResturantsResponse(result.data)
        await setLoading(false)
        if (result.status == 200) {
            setResturantsPopup(true)
        }
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
        let temList = citiesResponse;
        const newData = temList.filter(item => {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        //setCountryList(data => ([data, ...newData]));
        setCitiesResponse2(newData)
        setCitiesText(text)
    };
    const searchSelectedFilterFunction = text => {
        let temList = selectedCitiesResponse;
        const newData = temList.filter(item => {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        //setCountryList(data => ([data, ...newData]));
        setSelectedCitiesResponse2(newData)
        setSelectedCitiesText(text)
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
    // new functions for filters

    const _removeItem = (value) => {
        const temArr = [...counterRef2.current]
        const index = temArr.indexOf(value);
        if (index > -1) {
            temArr.splice(index, 1);
        }
        setCities(temArr)
    }
    const _checkBoxClick = (name) => {
        let myData = [...counterRef.current]
        let temArr = [...counterRef2.current]
        for (let i = 0; i < myData.length; i++) {
            if (myData[i].name === name) {
                if (!myData[i].isActive) {
                    myData[i].isActive = true
                    temArr.push(myData[i].name)
                    setCities(temArr)
                } else {
                    myData[i].isActive = false
                    _removeItem(myData[i].name)
                }
            }
        }
        setSelectedCitiesResponse(myData)
    }
    const _selectAll = () => {
        let myData = [...counterRef.current]
        let temArr = [...counterRef2.current]
        if (isActive) {
            for (let i = 0; i < myData.length; i++) {
                myData[i].isActive = false
            }
            setCities([])
            setSelectedCitiesResponse(myData)
            setIsActive(false)
        } else {
            for (let i = 0; i < myData.length; i++) {
                myData[i].isActive = true
                temArr.push(myData[i].name)
                setCities(temArr)
            }
            setSelectedCitiesResponse(myData)
            setIsActive(true)
        }
    }

    // new functions for filters
    const _removeItem2 = (value) => {
        const temArr = [...counterRef3.current]
        const index = temArr.indexOf(value);
        if (index > -1) {
            temArr.splice(index, 1);
        }
        setResturants(temArr)
    }
    const _checkBoxClick2 = (name) => {
        let myData = [...resturantsResponse]
        let temArr = [...counterRef3.current]
        for (let i = 0; i < myData.length; i++) {
            if (myData[i].name === name) {
                if (!myData[i].isActive) {
                    myData[i].isActive = true
                    temArr.push(myData[i].id)
                    setResturants(temArr)
                } else {
                    myData[i].isActive = false
                    _removeItem2(myData[i].name)
                }
            }
        }
        setResturantsResponse(myData)
    }
    const _selectAll2 = () => {
        let myData = [...resturantsResponse]
        let temArr = [...counterRef3.current]
        if (isActive2) {
            for (let i = 0; i < myData.length; i++) {
                myData[i].isActive = false
            }
            setResturants([])
            setResturantsResponse(myData)
            setIsActive2(false)
        } else {
            for (let i = 0; i < myData.length; i++) {
                myData[i].isActive = true
                temArr.push(myData[i].id)
                setResturants(temArr)
            }
            setResturantsResponse(myData)
            setIsActive2(true)
        }
    }
    const searchResturantFilterFunction = text => {
        let temList = resturantsResponse;
        const newData = temList.filter(item => {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        //setCountryList(data => ([data, ...newData]));
        setResturantsResponse2(newData)
        setResturantsText(text)
    };




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
                        {Strings.Hello}{login.data.name}
                    </Text>
                    <Text style={[styles.findTxt, {
                        color: darkBlue
                    }]}>
                        {Strings.Find_Your_Restaurant}
                    </Text>
                    {/* <View style={styles.row5}>
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
                    </View> */}
                    <TouchableOpacity
                        onPress={() => {
                            if (!isHide) {
                                setCityModal(true),
                                    setHide(!isHide)
                            } else {
                                setHide(!isHide)
                            }

                        }}
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
                                    {checked === 'first' ? Strings.Bar
                                        : checked === 'second' ? Strings.Pub :
                                            checked === 'third' ? Strings.Restaurante :
                                                checked === 'fourth' ? Strings.Noche : ""}
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
                                    {counter}{Strings.person}
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
                                    {Strings.Search}
                                </Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    }
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between", marginTop: heightPercentageToDP(2) }}>
                        <Text style={[styles.searchTxt, {
                            color: darkBlue,
                            marginTop: 0
                        }]}>
                            {Strings.Recent_Search}
                        </Text>
                        <TouchableOpacity
                            onPress={() => deleteSearch()}
                        >
                            <Text style={[styles.greetingTxt, {
                                marginTop: 0,
                                color: darkBlue,
                                fontFamily: "Montserrat-SemiBold",
                            }]}>
                                {Strings.Clear_all}
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
                                            {Strings.Select}
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
                                        {Strings.Date_Time_and_Persons}
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
                                                {Strings.Bar}
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
                                                {Strings.Pub}
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
                                                {Strings.Restaurante}
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
                                                {Strings.Noche}
                                            </Text>
                                        </View>
                                    </View>
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
                                            //console.log(date)
                                            setPopUp(false)
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
                : <View style={styles.dashboardMainView}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        marginTop: heightPercentageToDP(2),
                        justifyContent: "space-between"
                    }}>
                        <Text style={styles.findTxt}>
                            {Strings.Trending}
                        </Text>
                        <TouchableOpacity onPress={() => {
                            setIsActive(false),
                                setIsActive2(false),
                                setCities([]),
                                setCitiesPopup(true)
                        }}>
                            <FastImage
                                source={require('../../Images/filter.jpg')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{
                                    width: widthPercentageToDP(15),
                                    height: widthPercentageToDP(15)
                                }}
                                tintColor={black}
                            />
                        </TouchableOpacity>
                    </View>

                    {!socialResponse || !socialResponse.length ?
                        <View />
                        : <FlatList
                            data={socialResponse}
                            showsVerticalScrollIndicator={false}
                            style={{ marginTop: heightPercentageToDP(2), }}
                            keyExtractor={(item, index) => 'key' + index}
                            renderItem={({ item, index }) => (
                                <Trending
                                    title={item.name}
                                    images={item.images}
                                    rank={item.rank}
                                />
                            )}
                        />}
                </View>

            }
            <View style={styles.bottomToggle}>
                <CustomSwitch
                    selectionMode={1}
                    roundCorner={true}
                    option1={Strings.Search}
                    option2={Strings.Social}
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
                                text: Strings.Select_Location, style: {
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
                                    {Strings.Use_current_location}
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
                                text: Strings.Select_Location, style: {
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
                                    placeholder={Strings.search_city}
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
                                    {Strings.Use_current_location}
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
            {citiesPopup &&
                <Modal
                    transparent={true}
                    visible={citiesPopup}
                    animationType="slide"
                    onRequestClose={() => console.log('close')}
                >
                    <View style={{ flex: 1, backgroundColor: white }}>
                        <Header
                            leftComponent={
                                <TouchableOpacity
                                    onPress={() => { setCitiesPopup(false) }}>
                                    <MaterialIcons
                                        name="close"
                                        color={black}
                                        size={35}
                                    />
                                </TouchableOpacity>
                            }
                            centerComponent={{
                                text: Strings.Filtration, style: {
                                    color: black,
                                    fontSize: widthPercentageToDP(5),
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
                                <SearchBar
                                    placeholder={Strings.Search_comunidad}
                                    lightTheme
                                    round
                                    value={citiesText}
                                    onChangeText={text => searchFilterFunction(text)}
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
                                <Text style={{
                                    color: black,
                                    fontSize: widthPercentageToDP(5),
                                    fontFamily: "Montserrat-Bold",
                                }}>
                                    {Strings.Comunidad_autonoma}
                                </Text>
                            </View>

                            {!citiesResponse || !citiesResponse.length ?
                                <View />
                                : <FlatList
                                    data={!citiesText ? citiesResponse : citiesResponse2}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ flexGrow: 1 }}
                                    style={{ marginTop: heightPercentageToDP(2), }}
                                    keyExtractor={(item, index) => 'key' + index}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setCitiesPopup(false),
                                                    setSelectedCitiesResponse(item.cities),
                                                    setSelectedCitiesPopup(true)
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
            {selectedCitiesPopup &&
                <Modal
                    transparent={true}
                    visible={selectedCitiesPopup}
                    animationType="slide"
                    onRequestClose={() => console.log('close')}
                >
                    <View style={{ flex: 1, backgroundColor: white }}>
                        <Header
                            leftComponent={
                                <TouchableOpacity
                                    onPress={() => { setSelectedCitiesPopup(false) }}>
                                    <MaterialIcons
                                        name="close"
                                        color={black}
                                        size={35}
                                    />
                                </TouchableOpacity>
                            }
                            centerComponent={{
                                text: Strings.Filtration, style: {
                                    color: black,
                                    fontSize: widthPercentageToDP(5),
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
                                <SearchBar
                                    placeholder={Strings.Search_comunidad}
                                    lightTheme
                                    round
                                    value={selectedCitiesText}
                                    onChangeText={text => searchSelectedFilterFunction(text)}
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
                                height: heightPercentageToDP(7),
                                justifyContent: "space-between"
                            }]}>
                                <Text style={{
                                    color: black,
                                    fontSize: widthPercentageToDP(5),
                                    fontFamily: "Montserrat-Bold",
                                }}>
                                    {Strings.Choose_City}
                                </Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{
                                        color: black,
                                        fontSize: widthPercentageToDP(4),
                                        fontFamily: "Montserrat-Bold",
                                        marginRight: widthPercentageToDP(3)
                                    }}>
                                        {Strings.Select_All}
                                    </Text>
                                    <Fontisto
                                        name={!isActive ?
                                            'checkbox-passive'
                                            : 'checkbox-active'}
                                        color={black}
                                        size={25}
                                        onPress={() => { _selectAll() }}
                                    />
                                </View>

                            </View>

                            {!selectedCitiesResponse || !selectedCitiesResponse.length ?
                                <View />
                                : <FlatList
                                    data={!selectedCitiesText ? selectedCitiesResponse : selectedCitiesResponse2}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ flexGrow: 1 }}
                                    style={{ marginTop: heightPercentageToDP(2), }}
                                    keyExtractor={(item, index) => 'key' + index}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => { }}
                                            style={[styles.blockView, {
                                                justifyContent: "space-between"
                                            }]}>
                                            <Text style={[styles.blockTxt, {
                                                marginLeft: 0,
                                                textAlign: "left"
                                            }]}>
                                                {item.name}
                                            </Text>
                                            <Fontisto
                                                name={!item.isActive ?
                                                    'checkbox-passive'
                                                    : 'checkbox-active'}
                                                color={black}
                                                size={25}
                                                onPress={() => { _checkBoxClick(item.name) }}
                                            />
                                        </TouchableOpacity>
                                    )}
                                />
                            }
                            <View style={{ height: heightPercentageToDP(10) }} />
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedCitiesPopup(false),
                                        rankRastuDataApi()
                                    // socialDataApi(),
                                    // citiesApi()
                                }}
                                style={[styles.btn, {
                                    position: "absolute",
                                    bottom: "1%",
                                    zIndex: 3
                                }]}>
                                <Text style={styles.btnTxt}>
                                    {Strings.Done}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
            }
            {resturantsPopup &&
                <Modal
                    transparent={true}
                    visible={resturantsPopup}
                    animationType="slide"
                    onRequestClose={() => console.log('close')}
                >
                    <View style={{ flex: 1, backgroundColor: white }}>
                        <Header
                            leftComponent={
                                <TouchableOpacity
                                    onPress={() => { setResturantsPopup(false) }}>
                                    <MaterialIcons
                                        name="close"
                                        color={black}
                                        size={35}
                                    />
                                </TouchableOpacity>
                            }
                            centerComponent={{
                                text: Strings.Filtration, style: {
                                    color: black,
                                    fontSize: widthPercentageToDP(5),
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
                                <SearchBar
                                    placeholder={Strings.Search_Resturants}
                                    lightTheme
                                    round
                                    value={resturantsText}
                                    onChangeText={text => searchResturantFilterFunction(text)}
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
                                height: heightPercentageToDP(7),
                                justifyContent: "space-between"
                            }]}>
                                <Text style={{
                                    color: black,
                                    fontSize: widthPercentageToDP(5),
                                    fontFamily: "Montserrat-Bold",
                                }}>
                                    {Strings.Choose_Resturants}
                                </Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{
                                        color: black,
                                        fontSize: widthPercentageToDP(4),
                                        fontFamily: "Montserrat-Bold",
                                        marginRight: widthPercentageToDP(3)
                                    }}>
                                        {Strings.Select_All}
                                    </Text>
                                    <Fontisto
                                        name={!isActive2 ?
                                            'checkbox-passive'
                                            : 'checkbox-active'}
                                        color={black}
                                        size={25}
                                        onPress={() => { _selectAll2() }}
                                    />
                                </View>

                            </View>

                            {!resturantsResponse || !resturantsResponse.length ?
                                <View />
                                : <FlatList
                                    data={!resturantsText ? resturantsResponse : resturantsResponse2}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ flexGrow: 1 }}
                                    style={{ marginTop: heightPercentageToDP(2), }}
                                    keyExtractor={(item, index) => 'key' + index}
                                    renderItem={({ item }) => (
                                        <View style={[styles.blockView, {
                                            justifyContent: "space-between"
                                        }]}>
                                            <Text style={[styles.blockTxt, {
                                                marginLeft: 0,
                                                textAlign: "left"
                                            }]}>
                                                {item.name}
                                            </Text>
                                            <Fontisto
                                                name={!item.isActive ?
                                                    'checkbox-passive'
                                                    : 'checkbox-active'}
                                                color={black}
                                                size={25}
                                                onPress={() => { _checkBoxClick2(item.name) }}
                                            />
                                        </View>
                                    )}
                                />
                            }
                            <View style={{ height: heightPercentageToDP(10) }} />
                            <TouchableOpacity
                                onPress={() => {
                                    setResturantsPopup(false),
                                        socialDataApi(),
                                        citiesApi()
                                }}
                                style={[styles.btn, {
                                    position: "absolute",
                                    bottom: "1%",
                                    zIndex: 3
                                }]}>
                                <Text style={styles.btnTxt}>
                                    {Strings.Done}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
            }

        </SafeAreaView >
    )
}

export default Dashboard