import React, { useEffect } from 'react'
import useState from 'react-usestateref'
import { View, Text, TextInput, FlatList, Modal, TouchableOpacity } from 'react-native'
import { styles } from '../../Stylesheet'
import FastImage from 'react-native-fast-image'
import StarRating from 'react-native-star-rating';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, lightGrey, white } from '../../Colors'

const Rating = () => {
    return (
        <View style={styles.container}>
            <FastImage
                source={require('../../Images/blue_logo.png')}
                resizeMode={FastImage.resizeMode.cover}
                style={{
                    width: widthPercentageToDP(35),
                    height: widthPercentageToDP(50),
                    alignSelf: "center",
                    marginTop: heightPercentageToDP(4)
                }}
            />

            <Text style={{
                fontSize: widthPercentageToDP(5),
                color: black,
                marginTop: heightPercentageToDP(2),
                fontFamily: "Montserrat-SemiBold",
                textAlign: "center"
            }}>
                {"Your opinion matter to us"}
            </Text>

            <Text style={{
                fontSize: widthPercentageToDP(7),
                color: black,
                marginTop: heightPercentageToDP(4),
                fontFamily: "Montserrat-Bold",
                textAlign: "center"
            }}>
                {"Rate & Review"}
            </Text>
            <Text style={{
                fontSize: widthPercentageToDP(4.5),
                color: black,
                marginTop: heightPercentageToDP(2),
                fontFamily: "Montserrat-Medium",
                textAlign: "center"
            }}>
                {"share your experience to help others"}
            </Text>
            <View style={{ alignSelf: "center", marginTop: heightPercentageToDP(2) }}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    emptyStarColor={lightGrey}
                    fullStarColor={darkBlue}
                    rating={3}
                    starSize={50}
                    containerStyle={{ width: "80%", marginLeft: 10 }}
                //selectedStar={(rating) => setStars(rating)}
                />
            </View>

            <TextInput
                placeholder='Your comments'
                placeholderTextColor={lightGrey}
                onChangeText={text => console.log(text)}
                style={{
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(16),
                    borderWidth: widthPercentageToDP(0.1),
                    borderColor: black,
                    textAlignVertical: "top",
                    padding: widthPercentageToDP(2),
                    marginTop: heightPercentageToDP(2),
                    color: black,
                    fontFamily: "Montserrat-Medium",
                    fontSize: widthPercentageToDP(4.5),
                    alignSelf: "center",
                    borderRadius: widthPercentageToDP(3)
                }}
            />
            <TouchableOpacity
                onPress={() => { }}
                style={[styles.btn, {
                    //marginBottom: heightPercentageToDP(2)
                }]}>
                <Text style={styles.btnTxt}>
                    {"Rate Now"}
                </Text>
            </TouchableOpacity>
            <Text style={{
                fontSize: widthPercentageToDP(5),
                color: lightGrey,
                marginTop: heightPercentageToDP(2),
                fontFamily: "Montserrat-Medium",
                textAlign: "center"
            }}>
                {"May be later"}
            </Text>

        </View>
    )
}

export default Rating;