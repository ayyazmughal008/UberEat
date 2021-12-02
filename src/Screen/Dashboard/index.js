import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, FlatList, TouchableOpacity, Modal } from 'react-native'
import { styles } from '../../Stylesheet'
import Header from '../../Component/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { black, darkBlue, lightBlue, lightGrey, offWhite, textBlack, white } from '../../Colors'
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image'
import { Input } from 'react-native-elements';
import { data } from './data'
import Rececnt from '../../Component/Recent'
import Trending from '../../Component/Trending'
import CustomSwitch from '../../Component/CustomSwitch'
import * as Animatable from 'react-native-animatable';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import DatePicker from 'react-native-date-picker'

const Dashboard = (props) => {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.user.login);
    const [toggleValue, setToggleValue] = useState(1);
    const [isHide, setHide] = useState(false)
    const [isPopUp, setPopUp] = useState(false)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(true)

    useEffect(() => {
        console.log(toggleValue)
    }, [toggleValue])
    return (
        <SafeAreaView style={styles.container}>
            <Header
                userImg={require('../../Images/profile2.png')}
                title={"MYHOOKAH"}
                isProfile={true}
                leftClick={() => props.navigation.navigate('Profile')}
                iconName={"notifications-outline"}
                isProfile={!login.data.image ? false : true}
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
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, width: "100%" }}>
                        <FastImage
                            source={require('../../Images/Location.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.vectorIcon}
                        />
                        <Text style={[styles.greetingTxt, { marginTop: 0, marginLeft: widthPercentageToDP(3) }]}>
                            {"Berlin, Germany"}
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
                            {"Barcelona, Spain"}
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
                                    {"Lunch , 25 Oct"}
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
                                    {"2 person"}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('HotelList')}
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
                                clickHandler={() => { props.navigation.navigate('HotelDetail') }}
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
                                        //modal
                                        mode="date"
                                        androidVariant="iosClone"
                                        open={open}
                                        date={date}
                                        onConfirm={(date) => {
                                            //setOpen(false)
                                            setDate(date)
                                        }}
                                        onCancel={() => {
                                            //setOpen(false)
                                        }}
                                    />
                                    <View style={styles.row3}>
                                        <Text style={[styles.smallTxt, {
                                            fontFamily: "Montserrat-Medium",
                                            fontSize: widthPercentageToDP(4.5)
                                        }]}>
                                            {"Total Persons :"}
                                        </Text>
                                        <View style={styles.row4}>
                                            <TouchableOpacity style={styles.blueCircle}>
                                                <Text style={styles.btnTxt}>
                                                    {"-"}
                                                </Text>
                                            </TouchableOpacity>
                                            <Text style={[styles.smallTxt, {
                                                fontFamily: "Montserrat-Medium",
                                                marginTop: 0
                                            }]}>
                                                {"2"}
                                            </Text>
                                            <TouchableOpacity style={styles.blueCircle}>
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
                                clickHandler={() => { props.navigation.navigate('HotelDetail') }}
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


        </SafeAreaView>
    )
}

export default Dashboard