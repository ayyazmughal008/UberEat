import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { black, darkBlue, lightGrey, textBlack } from '../../Colors'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import StarRating from 'react-native-star-rating';

const Review = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.circle}>
                    <FastImage
                        source={props.profile}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.roundImg}
                    />
                </View>
                <Text style={styles.name}>
                    {props.name}
                </Text>

                <Text style={styles.dateTime}>
                    {props.dateTime}
                </Text>
            </View>

            <Text style={styles.reviewTxt}>
                {props.review}
            </Text>
            <StarRating
                disabled={false}
                maxStars={5}
                emptyStarColor={lightGrey}
                fullStarColor={darkBlue}
                rating={3}
                starSize={25}
                containerStyle={{
                    width: "35%",
                    marginTop: heightPercentageToDP(2),
                    marginBottom: heightPercentageToDP(2)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(100),
        flex: 0,
        marginTop: heightPercentageToDP(5),
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: black
    },
    topRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center"
    },
    circle: {
        width: widthPercentageToDP(13),
        height: widthPercentageToDP(13),
        borderRadius: widthPercentageToDP(13) / 2,
        backgroundColor: darkBlue,
        justifyContent: "center",
        alignItems: "center"
    },
    roundImg: {
        width: widthPercentageToDP(11.5),
        height: widthPercentageToDP(11.5),
        borderRadius: widthPercentageToDP(11.5) / 2,
    },
    name: {
        fontSize: widthPercentageToDP(4.5),
        fontFamily: "Montserrat-SemiBold",
        color: textBlack,
        marginLeft: widthPercentageToDP(5)
    },
    dateTime: {
        fontSize: widthPercentageToDP(4.5),
        fontFamily: "Montserrat-SemiBold",
        color: lightGrey,
        position: "absolute",
        right: "10%"
    },
    reviewTxt: {
        fontSize: widthPercentageToDP(4.5),
        fontFamily: "Montserrat-Medium",
        color: textBlack,
        //paddingLeft: widthPercentageToDP(3),
        //paddingRight: widthPercentageToDP(3),
        marginTop: heightPercentageToDP(3)
    }
})

export default Review;