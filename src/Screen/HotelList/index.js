import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
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
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


const HotelList = (props) => {
    const [toggleValue, setToggleValue] = useState(1);
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
                            {"Barcilona, Espana"}
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
                        />

                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: heightPercentageToDP(3) }}>
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
                        </View>
                        <FlatList
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
                        />

                    </View>
                    : <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={StyleSheet.absoluteFillObject}
                        region={{
                            latitude: 41.40338,
                            longitude: 2.17403,
                            latitudeDelta: 0.0193,
                            longitudeDelta: 0.0194
                            //latitudeDelta: 30.1922,
                            //longitudeDelta: 30.1421,
                        }}
                        customMapStyle={mapStyle}
                    >

                    </MapView>
                }
            </View>
        </View>
    )
}

export default HotelList