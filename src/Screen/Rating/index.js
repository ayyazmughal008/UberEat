import React, { useEffect } from 'react'
import useState from 'react-usestateref'
import { View, Text, TextInput, FlatList, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import { styles } from '../../Stylesheet'
import FastImage from 'react-native-fast-image'
import StarRating from 'react-native-star-rating';
import { useSelector } from 'react-redux'
import { updateUserFeedback } from '../../Redux/action'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, lightGrey, white } from '../../Colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const Rating = (props) => {
    const login = useSelector((state) => state.user.login);
    const data = props.route.params.data
    const [loading, setLoading] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")


    const submitReview = async () => {
        setLoading(true)
        const result = await updateUserFeedback(
            login.data.id,
            data.resturant_id,
            data.id,
            rating,
            comment
        )
        await setLoading(false)
        if (result.status == 200) {
            props.navigation.goBack()
        }
    }


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                        rating={rating}
                        starSize={50}
                        containerStyle={{ width: "80%", marginLeft: 10 }}
                        selectedStar={(rating) => setRating(rating)}
                    />
                </View>

                <TextInput
                    placeholder='Your comments'
                    placeholderTextColor={lightGrey}
                    value={comment}
                    onChangeText={text => setComment(text)}
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
                    multiline = {true}
                />
                <TouchableOpacity
                    onPress={() => { submitReview() }}
                    style={[styles.btn, {
                        //marginBottom: heightPercentageToDP(2)
                    }]}>
                    <Text style={styles.btnTxt}>
                        {"Rate Now"}
                    </Text>
                </TouchableOpacity>
                <Text
                    onPress={() => props.navigation.goBack()}
                    style={{
                        fontSize: widthPercentageToDP(5),
                        color: lightGrey,
                        marginTop: heightPercentageToDP(2),
                        fontFamily: "Montserrat-Medium",
                        textAlign: "center"
                    }}>
                    {"May be later"}
                </Text>
            </KeyboardAwareScrollView>
            {loading &&
                <ActivityIndicator
                    size="large"
                    color={darkBlue}
                    style={styles.loading}
                />
            }
        </View>
    )
}

export default Rating;