import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native'
import { styles } from '../../Stylesheet'
import FastImage from 'react-native-fast-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import StarRating from 'react-native-star-rating';
import { black, darkBlue, lightGrey, white } from '../../Colors'
import Toggle from '../../Component/Toggle'
import Items from '../../Component/Items'
import { data } from './data'
import { reviewData } from './reviewData'
import Review from '../../Component/Review'

const HotelDetail = (props) => {
    const [toggleValue, setToggleValue] = useState(1);
    const [activeIndex, setIndex] = useState(0)
    const [isPop, setPop] = useState(false)

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <FastImage
                    source={require('../../Images/dish1.jpg')}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.banner}
                >
                    <View style={{ width: "100%", height: "100%", backgroundColor: 'rgba(0,0,0,0.9)', opacity: 0.7 }} />
                    <FastImage
                        source={require('../../Images/grill.jpg')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.sticker}
                    />
                </FastImage>
                <Text style={[styles.findTxt, {
                    textAlign: "center",
                    fontFamily: "Montserrat-SemiBold",
                    fontSize: widthPercentageToDP(6),
                    marginTop: heightPercentageToDP(4)
                }]}>
                    {"Famillio's Mexican Grill"}
                </Text>
                <View style={{ alignSelf: "center", marginTop: heightPercentageToDP(2) }}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        emptyStarColor={lightGrey}
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
                {toggleValue == 1 ?
                    <View style={styles.dashboardMainView}>
                        <Text style={[styles.findTxt, {
                            textAlign: "left",
                            fontFamily: "Montserrat-SemiBold",
                            fontSize: widthPercentageToDP(5),
                            marginTop: heightPercentageToDP(5)
                        }]}>
                            {"Categories"}
                        </Text>
                        <FlatList
                            data={[{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }]}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ marginTop: heightPercentageToDP(5), }}
                            keyExtractor={(item, index) => 'key' + index}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => setIndex(index)}
                                    style={{
                                        width: widthPercentageToDP(32),
                                        height: heightPercentageToDP(22),
                                        marginRight: widthPercentageToDP(2),
                                        borderWidth: activeIndex == index ? 5 : 0,
                                        borderColor: darkBlue,
                                        borderRadius: widthPercentageToDP(2)
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
                        <Text style={[styles.findTxt, {
                            textAlign: "left",
                            fontFamily: "Montserrat-SemiBold",
                            fontSize: widthPercentageToDP(5),
                            marginTop: heightPercentageToDP(5)
                        }]}>
                            {"Items"}
                        </Text>
                        <FlatList
                            data={data}
                            numColumns={2}
                            contentContainerStyle={{ alignItems: "center" }}
                            style={{ marginTop: heightPercentageToDP(3), }}
                            keyExtractor={(item, index) => 'key' + index}
                            renderItem={({ item, index }) => (
                                <Items
                                    dishImg={item.dishImg}
                                    title={item.title}
                                    clickHandler={() => { setPop(true) }}
                                />
                            )}
                        />
                        {isPop &&
                            <Modal
                                animationType="slide"
                                visible={isPop}
                                transparent={true}
                                onRequestClose={() => console.log('modal close')}
                            >
                                <View style={styles.modalView}>
                                    <View style={styles.modalBottom}>
                                        <TouchableOpacity onPress={() => setPop(false)} >
                                            <View style={styles.line} />
                                        </TouchableOpacity>

                                        <View style={styles.row2}>
                                            <Text style={styles.priceTxt}>
                                                {"13' Large Pizza"}
                                            </Text>
                                            <Text style={styles.price}>
                                                {"14 $"}
                                            </Text>
                                        </View>
                                        <View style={styles.row2}>
                                            <Text style={styles.priceTxt}>
                                                {"Spicy Streaks"}
                                            </Text>
                                            <Text style={styles.price}>
                                                {"13 $"}
                                            </Text>
                                        </View>
                                        <View style={styles.row2}>
                                            <Text style={[styles.priceTxt, {
                                                fontSize: widthPercentageToDP(5)
                                            }]}>
                                                {"Total Price"}
                                            </Text>
                                            <Text style={[styles.price, {
                                                fontSize: widthPercentageToDP(5),
                                                color: darkBlue
                                            }]}>
                                                {"27 $"}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setPop(false),
                                                    props.navigation.navigate('Table')
                                            }}
                                            style={[styles.btn, {
                                                position: "absolute",
                                                bottom: "4%",
                                                zIndex: 3
                                            }]}>
                                            <Text style={styles.btnTxt}>
                                                {"Book Now"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        }

                    </View>
                    : <View style={[styles.dashboardMainView, {
                        marginTop: heightPercentageToDP(6)
                    }]}>
                        <View style={styles.row}>
                            <FastImage
                                source={require('../../Images/Location2.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.vectorIcon}
                            />
                            <Text style={styles.mediumText}>
                                {"Al Samudra tower, St 6, Brampton, Barcilona"}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <FastImage
                                source={require('../../Images/number2.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.vectorIcon}
                            />
                            <Text style={styles.mediumText}>
                                {"+1 823 345 3434"}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <FastImage
                                source={require('../../Images/mail2.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.vectorIcon}
                            />
                            <Text style={styles.mediumText}>
                                {"johnmartin@gmail.com"}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <FastImage
                                source={require('../../Images/Time2.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.vectorIcon}
                            />
                            <Text style={styles.mediumText}>
                                {"9 AM To 2 AM Night"}
                            </Text>
                        </View>
                        <Text style={styles.title}>
                            {"About Us"}
                        </Text>
                        <Text style={[styles.mediumText, {
                            marginLeft: 0,
                            marginTop: heightPercentageToDP(3)
                        }]}>
                            {"The Best service and best Burgers are the focous and are particularly close to peter pain's heart"}
                        </Text>
                        <Text style={styles.title}>
                            {"Reviews"}
                        </Text>

                        <FlatList
                            data={reviewData}
                            style={{ marginTop: heightPercentageToDP(3), }}
                            keyExtractor={(item, index) => 'key' + index}
                            renderItem={({ item, index }) => (
                                <Review
                                    profile={item.roundImg}
                                    name={item.name}
                                    dateTime={item.dateTime}
                                    review={item.review}
                                />
                            )}
                        />

                    </View>
                }
            </KeyboardAwareScrollView>

        </View>
    )
}

export default HotelDetail;