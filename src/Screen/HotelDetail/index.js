import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity , FlatList } from 'react-native'
import { styles } from '../../Stylesheet'
import FastImage from 'react-native-fast-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import StarRating from 'react-native-star-rating';
import { darkBlue, white } from '../../Colors'
import Toggle from '../../Component/Toggle'

const HotelDetail = () => {
    const [toggleValue, setToggleValue] = useState(1);

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <FastImage
                    source={require('../../Images/dish1.jpg')}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.banner}
                />
                <Text style={[styles.findTxt, {
                    textAlign: "center",
                    fontFamily: "Montserrat-SemiBold",
                    fontSize: widthPercentageToDP(6)
                }]}>
                    {"Famillio's Mexican Grill"}
                </Text>
                <View style={{ alignSelf: "center", marginTop: heightPercentageToDP(2) }}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        emptyStarColor={darkBlue}
                        fullStarColor={darkBlue}
                        rating={3}
                        starSize={30}
                        containerStyle={{ width: "40%", marginLeft: 10 }}
                    //selectedStar={(rating) => setStars(rating)}
                    />
                </View>
                <View style={{ alignSelf: "center", marginTop: heightPercentageToDP(4), width: widthPercentageToDP(95) }}>
                    <Toggle
                        selectionMode={1}
                        roundCorner={true}
                        option1={'Menu'}
                        option2={'Contact'}
                        onSelectSwitch={(newState) => setToggleValue(newState)}
                        selectionColor={darkBlue}
                    />
                </View>
                <View style={styles.dashboardMainView}>
                    <Text style={[styles.findTxt, {
                        textAlign: "left",
                        fontFamily: "Montserrat-SemiBold",
                        fontSize: widthPercentageToDP(5),
                        marginTop: heightPercentageToDP(3)
                    }]}>
                        {"Categories"}
                    </Text>
                    <FlatList
                        data={[{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }]}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: heightPercentageToDP(2), }}
                        keyExtractor={(item, index) => 'key' + index}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{
                                    width: widthPercentageToDP(32),
                                    height: heightPercentageToDP(20),
                                    marginRight: widthPercentageToDP(2)
                                }}
                            >
                                <FastImage
                                    source={require('../../Images/dish2.jpg')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: widthPercentageToDP(2)
                                    }}
                                >
                                    <Text style={[styles.findTxt, {
                                        textAlign: "center",
                                        fontFamily: "Montserrat-SemiBold",
                                        fontSize: widthPercentageToDP(5),
                                        color: white
                                    }]}>
                                        {"Foods"}
                                    </Text>
                                </FastImage>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </KeyboardAwareScrollView>

        </View>
    )
}

export default HotelDetail;