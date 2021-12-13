import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { styles } from '../../Stylesheet'
import Header from '../../Component/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { black, darkBlue, lightBlue, lightGrey, offWhite, textBlack, white } from '../../Colors'
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image'
import Toggle from '../../Component/Toggle'
import Listing from '../../Component/Listing'
import { mapStyle } from './mapStyle'
import { data } from './data'
import StarRating from 'react-native-star-rating';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


const HotelList = (props) => {
    const [toggleValue, setToggleValue] = useState(1);
    const [isPopUp, setPopUp] = useState(false)
    const [response, setResponse] = useState(false)
    const result = props.route.params.data
    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFillObject}>
                <View style={{ alignSelf: "center", width: widthPercentageToDP(95), position: "absolute", top: "15%", zIndex: 3 }}>
                    <Toggle
                        selectionMode={1}
                        roundCorner={true}
                        option1={'Listing'}
                        option2={'Map'}
                        onSelectSwitch={(newState) => setToggleValue(newState)}
                        selectionColor={darkBlue}
                    />
                </View>
                {toggleValue == 1 ?
                    <View style={styles.dashboardMainView}>
                        <Header
                            isBack={true}
                            leftClick={() => props.navigation.goBack()}
                            title={"SEARCH RESULT"}
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

                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: heightPercentageToDP(3) }}>
                            <Text style={[styles.findTxt, {
                                textAlign: "left",
                                fontFamily: "Montserrat-SemiBold",
                                fontSize: widthPercentageToDP(4.5),
                            }]}>
                                {"Favorite Restaurants"}
                            </Text>
                            <Text style={[styles.findTxt, {
                                textAlign: "left",
                                fontFamily: "Montserrat-Light",
                                fontSize: widthPercentageToDP(4),
                                color: darkBlue
                            }]}>
                                {"See More"}
                            </Text>
                        </View>

                        <FlatList
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
                        />

                        {/* <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: heightPercentageToDP(3) }}>
                            <Text style={[styles.findTxt, {
                                textAlign: "left",
                                fontFamily: "Montserrat-SemiBold",
                                fontSize: widthPercentageToDP(4.5),
                            }]}>
                                {"Popular Restaurants"}
                            </Text>
                            <Text style={[styles.findTxt, {
                                textAlign: "left",
                                fontFamily: "Montserrat-Light",
                                fontSize: widthPercentageToDP(4),
                                color: darkBlue
                            }]}>
                                {"See More"}
                            </Text>
                        </View> */}
                        {/* <FlatList
                            data={data}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ marginTop: heightPercentageToDP(2), }}
                            keyExtractor={(item, index) => 'key' + index}
                            renderItem={({ item }) => (
                                <Listing
                                    dishImg={item.image}
                                    title={item.country}
                                    title={item.name}
                                />
                            )}
                        /> */}

                    </View>
                    : <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={StyleSheet.absoluteFillObject}
                        region={{
                            latitude: 41.055787854765626,
                            longitude: -2.541948949818237,
                            latitudeDelta: 5.0193,
                            longitudeDelta: 5.0194
                            ,
                            //latitudeDelta: 30.1922,
                            //longitudeDelta: 30.1421,
                        }}
                        customMapStyle={mapStyle}
                    >
                        {result.map.map((item, index) => {
                            return (
                                <Marker
                                    key={"unique" + index}
                                    coordinate={{
                                        latitude: parseFloat(item.latitude),
                                        longitude: parseFloat(item.longitude),
                                    }}
                                    image={require('../../Images/MapLation.png')}
                                    onPress={() => {
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
                            <View style={styles.modalBottom2}>
                                <TouchableOpacity onPress={() => setPopUp(false)} >
                                    <View style={styles.line} />
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "100%", marginTop: 10 }}>
                                    <View style={{ width: "50%", height: "100%", alignItems: "center" }}>
                                        <FastImage
                                            source={{ uri: "http://108.61.209.20/" + response.large_image }}
                                            resizeMode={FastImage.resizeMode.cover}
                                            style={{
                                                width: "95%",
                                                height: "50%"
                                            }}
                                        />
                                        <View style={{ alignSelf: "center", marginTop: heightPercentageToDP(2) }}>
                                            <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                emptyStarColor={lightGrey}
                                                fullStarColor={darkBlue}
                                                rating={response.averageRating}
                                                starSize={30}
                                                containerStyle={{ width: "40%", marginLeft: 10 }}
                                            //selectedStar={(rating) => setStars(rating)}
                                            />
                                        </View>
                                        <Text style={[styles.greetingTxt, {
                                            marginTop: heightPercentageToDP(1),
                                            textAlign: "center",
                                            fontSize: widthPercentageToDP(5)
                                        }]}>
                                            {response.city + ', ' + response.country}
                                        </Text>
                                    </View>
                                    <View style={{ width: "50%", flex: 1, alignItems: "center", }}>
                                        <Text style={[styles.greetingTxt, {
                                            marginTop: 0,
                                            textAlign: "center",
                                            fontSize: widthPercentageToDP(5),
                                            fontFamily: "Montserrat-SemiBold"
                                        }]}>
                                            {response.name}
                                        </Text>
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
                                                            {'Available'}
                                                        </Text>
                                                    </View>
                                                </View>
                                            )}
                                        />
                                        <View style={{ marginTop: heightPercentageToDP(5) }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                }
            </View>
        </View>
    )
}

export default HotelList