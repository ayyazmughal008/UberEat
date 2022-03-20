import React, { useState, useEffect, useRef } from 'react'
import { View, SafeAreaView, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { styles } from '../../Stylesheet'
//import PropTypes from "prop-types";
import Header from '../../Component/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { black, darkBlue, lightBlue, lightGrey, offWhite, textBlack, white } from '../../Colors'
import FastImage from 'react-native-fast-image'
import Toggle from '../../Component/Toggle'
import Listing from '../../Component/Listing'
import { mapStyle } from './mapStyle'
import { data } from './data'
import { makeUserFavourite } from '../../Redux/action'
import StarRating from 'react-native-star-rating';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import Strings from '../../Translation'


const HotelList = (props) => {
    const dispatch = useDispatch();
    const makeFav = useSelector((state) => state.user.makeFav);
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [toggleValue, setToggleValue] = useState(1);
    const [isPopUp, setPopUp] = useState(false)
    const [response, setResponse] = useState(false)
    const [hotelId, setId] = useState("")
    const result = props.route.params.data
    const mapRef = useRef();


    // Call fitToSuppliedMarkers() method on the MapView after markers get updated
    useEffect(() => {
        if (mapRef.current)
            setTimeout(() => {
                // list of _id's must same that has been provided to the identifier props of the Marker
                mapRef.current.fitToSuppliedMarkers(result.map.map(({ _id }) => _id), false);
            }, 1000);
    }, []);
    useEffect(() => {
        if (toggleValue == 2)
            setTimeout(() => {
                // list of _id's must same that has been provided to the identifier props of the Marker
                mapRef.current.fitToSuppliedMarkers(result.map.map(({ _id }) => _id), false);
            }, 1000);
    }, [toggleValue])
    useEffect(() => {
        if (isPopUp) {
            setTimeout(() => {
                // list of _id's must same that has been provided to the identifier props of the Marker
                mapRef.current.fitToSuppliedMarkers(result.map.map(({ _id }) => _id), false);
            }, 1000)
        } else {
            if (mapRef.current)
                setTimeout(() => {
                    // list of _id's must same that has been provided to the identifier props of the Marker
                    mapRef.current.fitToSuppliedMarkers(result.map.map(({ _id }) => _id), false);
                }, 1000)
        }

    }, [isPopUp])


    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFillObject}>
                <View style={{ alignSelf: "center", width: widthPercentageToDP(95), position: "absolute", top: "15%", zIndex: 3 }}>
                    <Toggle
                        selectionMode={1}
                        roundCorner={true}
                        option1={Strings.Listing}
                        option2={Strings.Map}
                        onSelectSwitch={(newState) => setToggleValue(newState)}
                        selectionColor={darkBlue}
                    />
                </View>
                {toggleValue == 1 ?
                    <View style={styles.dashboardMainView}>
                        <Header
                            isBack={true}
                            leftClick={() => props.navigation.goBack()}
                            title={Strings.SEARCH_RESULT}
                            iconName={"notifications-outline"}
                        />
                        <View style={{ marginTop: heightPercentageToDP(10) }} />
                        <Text style={[styles.findTxt, {
                            textAlign: "left",
                            fontFamily: "Montserrat-SemiBold",
                            fontSize: widthPercentageToDP(6),
                            marginTop: heightPercentageToDP(5)
                        }]}>
                            {!result.country ? "" : result.country + ", " + !result.city ? "" : result.city}
                        </Text>

                        {!result.listing_favourite.length ?
                            <View />
                            : <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: heightPercentageToDP(3) }}>
                                <Text style={[styles.findTxt, {
                                    textAlign: "left",
                                    fontFamily: "Montserrat-SemiBold",
                                    fontSize: widthPercentageToDP(4.5),
                                }]}>
                                    {Strings.Favorite_Restaurants}
                                </Text>
                                <Text style={[styles.findTxt, {
                                    textAlign: "left",
                                    fontFamily: "Montserrat-Light",
                                    fontSize: widthPercentageToDP(4),
                                    color: darkBlue
                                }]}>
                                    {Strings.See_More}
                                </Text>
                            </View>
                        }

                        {!result.listing_favourite.length ?
                            <View />
                            : <FlatList
                                data={result.listing_favourite}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: heightPercentageToDP(1), }}
                                keyExtractor={(item, index) => 'key' + index}
                                renderItem={({ item }) => (
                                    <Listing
                                        dishImg={'http://108.61.209.20/' + item.large_image}
                                        title={item.name}
                                        clickHandler={() => props.navigation.navigate('HotelDetail', {
                                            contacts: item.contact,
                                            menu: item.menu,
                                            name: item.name,
                                            country: item.country,
                                            city: item.city,
                                            rating: item.averageRating,
                                            id: item.id,
                                            large_image: item.large_image,
                                            small_image: item.small_image,
                                            total_person: result.total_person,
                                            date: result.date,
                                        })}
                                        rating={item.averageRating}
                                    />
                                )}
                            />
                        }

                        {!result.listing.length ?
                            <View />
                            : <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: heightPercentageToDP(3) }}>
                                <Text style={[styles.findTxt, {
                                    textAlign: "left",
                                    fontFamily: "Montserrat-SemiBold",
                                    fontSize: widthPercentageToDP(4.5),
                                }]}>
                                    {Strings.Popular_Restaurants}
                                </Text>
                                <Text style={[styles.findTxt, {
                                    textAlign: "left",
                                    fontFamily: "Montserrat-Light",
                                    fontSize: widthPercentageToDP(4),
                                    color: darkBlue
                                }]}>
                                    {Strings.See_More}
                                </Text>
                            </View>}
                        {!result.listing.length ?
                            <View />
                            : <FlatList
                                data={result.listing}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: heightPercentageToDP(2), }}
                                keyExtractor={(item, index) => 'key' + index}
                                renderItem={({ item }) => (
                                    <Listing
                                        dishImg={'http://108.61.209.20/' + item.large_image}
                                        title={item.name}
                                        clickHandler={() => props.navigation.navigate('HotelDetail', {
                                            contacts: item.contact,
                                            menu: item.menu,
                                            name: item.name,
                                            country: item.country,
                                            city: item.city,
                                            rating: item.averageRating,
                                            id: item.id,
                                            large_image: item.large_image,
                                            small_image: item.small_image,
                                            total_person: result.total_person,
                                            date: result.date,
                                        })}
                                        rating={item.averageRating}
                                    />
                                )}
                            />}
                        <View style={{ marginTop: heightPercentageToDP(2) }} />
                    </View>
                    : <MapView
                        ref={mapRef}
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={StyleSheet.absoluteFillObject}
                        region={{
                            latitude: 41.055787854765626,
                            longitude: -2.541948949818237,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                            //latitudeDelta: 30.1922,
                            //longitudeDelta: 30.1421,
                        }}
                        customMapStyle={mapStyle}
                    >
                        {!result.map.length ?
                            <View />
                            : result.map.map((item, index) => {
                                return (
                                    <Marker
                                        key={item._id}
                                        identifier={item._id}
                                        //key={"unique" + index}
                                        coordinate={{
                                            latitude: parseFloat(item.latitude),
                                            longitude: parseFloat(item.longitude),
                                        }}
                                        image={require('../../Images/MapLation.png')}
                                        onPress={() => {
                                            setId(item.id),
                                                setPopUp(true),
                                                setResponse(item)
                                        }}
                                    />
                                )
                            })}
                    </MapView>
                }
                {isPopUp &&
                    <Modal
                        visible={isPopUp}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => console.log('close')}
                    >
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                //console.log(response)
                                {
                                    setPopUp(false);
                                    props.navigation.navigate('HotelDetail', {
                                        contacts: response.contact,
                                        menu: response.menu,
                                        name: response.name,
                                        country: response.country,
                                        city: response.city,
                                        rating: response.averageRating,
                                        id: response.id,
                                        large_image: response.large_image,
                                        small_image: response.small_image,
                                        total_person: result.total_person,
                                        date: result.date,
                                    })
                                }
                                }
                                style={styles.modalBottom2}>
                                <TouchableOpacity onPress={() => setPopUp(false)} >
                                    <View style={styles.line} />
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "100%", marginTop: 10 }}>
                                    <View style={{ width: "50%", height: "100%", alignItems: "center" }}>
                                        <Text style={[styles.greetingTxt, {
                                            marginTop: 0,
                                            textAlign: "center",
                                            fontSize: widthPercentageToDP(4.6),
                                            fontFamily: "Montserrat-SemiBold",
                                            padding: 2
                                        }]}>
                                            {response.name}
                                        </Text>
                                        <View style={{ alignSelf: "center", marginTop: heightPercentageToDP(0.5), marginBottom: heightPercentageToDP(0.5) }}>
                                            <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                emptyStarColor={lightGrey}
                                                fullStarColor={darkBlue}
                                                rating={response.averageRating}
                                                starSize={25}
                                                containerStyle={{ width: "30%", marginLeft: 10 }}
                                            //selectedStar={(rating) => setStars(rating)}
                                            />
                                        </View>
                                        <FastImage
                                            source={{ uri: "http://108.61.209.20/" + response.large_image }}
                                            resizeMode={FastImage.resizeMode.cover}
                                            style={{
                                                width: "95%",
                                                height: "40%"
                                            }}
                                        />
                                        <Text style={[styles.greetingTxt, {
                                            marginTop: heightPercentageToDP(1),
                                            textAlign: "center",
                                            fontSize: widthPercentageToDP(5)
                                        }]}>
                                            {response.city + ', ' + response.country}
                                        </Text>
                                    </View>
                                    <View style={{ width: "50%", flex: 1, alignItems: "center", }}>
                                        <View style={{ width: "100%", height: heightPercentageToDP(5), flexDirection: "row-reverse" }}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    dispatch(makeUserFavourite(
                                                        login.data.id,
                                                        hotelId
                                                    ))
                                                }
                                            >
                                                <FastImage
                                                    source={
                                                        response.is_favourite === 'yes' ?
                                                            require('../../Images/heart.png')
                                                            : makeFav === 'Marked' ?
                                                                require('../../Images/heart.png')
                                                                : makeFav === 'UnMarked' ?
                                                                    require('../../Images/heart_blue.png')
                                                                    : require('../../Images/heart_blue.png')}
                                                    resizeMode={FastImage.resizeMode.cover}
                                                    style={[styles.vectorIcon, {
                                                        width: widthPercentageToDP(10),
                                                        height: widthPercentageToDP(10),
                                                        marginRight: widthPercentageToDP(2)
                                                    }]}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <FlatList
                                            data={response.available_times}
                                            showsVerticalScrollIndicator={false}
                                            numColumns={2}
                                            //style={{ marginTop: heightPercentageToDP(1), }}
                                            keyExtractor={(item, index) => 'key' + index}
                                            contentContainerStyle={{ flexGrow: 1 }}
                                            renderItem={({ item }) => (
                                                <View style={styles.timeBox}>
                                                    <View style={styles.topBox}>
                                                        <Text style={[styles.greetingTxt, {
                                                            marginTop: 0,
                                                            textAlign: "center",
                                                            fontSize: widthPercentageToDP(3.8),
                                                            fontFamily: "Montserrat-Medium",
                                                            color: white
                                                        }]}>
                                                            {item.show}
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.topBox, {
                                                        backgroundColor: white
                                                    }]}>
                                                        <Text style={[styles.greetingTxt, {
                                                            marginTop: 0,
                                                            textAlign: "center",
                                                            fontSize: widthPercentageToDP(3.8),
                                                            fontFamily: "Montserrat-Medium"
                                                        }]}>
                                                            {Strings.Available}
                                                        </Text>
                                                    </View>
                                                </View>
                                            )}
                                        />
                                        <View style={{ marginTop: heightPercentageToDP(5) }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                }
            </View>
        </View>
    )
}

export default HotelList