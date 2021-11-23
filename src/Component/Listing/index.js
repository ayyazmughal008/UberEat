import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { darkBlue, lightGrey, offWhite, textBlack } from '../../Colors'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import StarRating from 'react-native-star-rating';

const Recent = (props) => {
    return (
        <TouchableOpacity
            onPress={props.clickHandler}
            style={styles.container}>
            <FastImage
                source={props.dishImg}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.img}
            />
            <Text style={styles.title}>
                {props.title}
            </Text>
            <View style={{ alignSelf: "center", marginTop: heightPercentageToDP(2) }}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    emptyStarColor={darkBlue}
                    fullStarColor={darkBlue}
                    rating={3}
                    starSize={20}
                    containerStyle={{ width: "30%", marginLeft: 10 }}
                //selectedStar={(rating) => setStars(rating)}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(33),
        height: heightPercentageToDP(23),
        backgroundColor: offWhite,
        borderRadius: widthPercentageToDP(3),
        alignItems: "center",
        marginRight: widthPercentageToDP(2),
        padding: 2,
        //alignSelf: "center",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 4
    },
    img: {
        width: "100%",
        height: heightPercentageToDP(13),
        borderTopLeftRadius: widthPercentageToDP(3),
        borderTopRightRadius: widthPercentageToDP(3)
    },
    title: {
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-SemiBold",
        color: textBlack,
        marginTop: heightPercentageToDP(0.5),
        textAlign: "center"
    },
    normalTxt: {
        fontSize: widthPercentageToDP(3.5),
        fontFamily: "Montserrat-Light",
        color: textBlack,
        textAlign: "center"
    }
})

export default Recent
