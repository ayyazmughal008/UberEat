import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { white, darkBlue, lightBlue, textBlack, lightGrey, black, offWhite } from '../Colors'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    bottomLoginView: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(40),
        position: "absolute",
        bottom: "0%",
        alignSelf: "center"
    },
    inputView: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(6.5),
        borderWidth: widthPercentageToDP(0.1),
        borderColor: black,
        backgroundColor: offWhite,
        alignSelf: "center",
        borderRadius: widthPercentageToDP(2),
        marginTop: heightPercentageToDP(3)
    },
    inputTxt: {
        fontSize: widthPercentageToDP(4),
        color: textBlack,
        fontFamily: "Montserrat-Light",
        paddingLeft: widthPercentageToDP(5)
    },
    forgetPassTxt: {
        fontSize: widthPercentageToDP(4.5),
        color: lightBlue,
        fontFamily: "Montserrat-Light",
        paddingTop: heightPercentageToDP(1)
    },
    btn: {
        width: widthPercentageToDP("80%"),
        height: heightPercentageToDP(7.5),
        borderRadius: widthPercentageToDP(7),
        backgroundColor: darkBlue,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: heightPercentageToDP(4)
    },
    btn2: {
        width: widthPercentageToDP("90%"),
        height: heightPercentageToDP(7.5),
        borderRadius: widthPercentageToDP(2),
        backgroundColor: darkBlue,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: heightPercentageToDP(1)
    },
    btnTxt: {
        fontSize: widthPercentageToDP(4.5),
        color: white,
        fontFamily: "Montserrat-Bold",
    },
    smallTxt: {
        fontSize: widthPercentageToDP(3.8),
        color: black,
        fontFamily: "Montserrat-Light",
        marginTop: heightPercentageToDP(1),
        textAlign: "center"
    },
    smallCircle: {
        width: widthPercentageToDP(10),
        height: widthPercentageToDP(10),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: widthPercentageToDP(10) / 2
    },
    sliderImg: {
        width: widthPercentageToDP(100),
        height: widthPercentageToDP(100),
        marginTop: heightPercentageToDP(-15)
    },
    topViewHeader: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(10),
        backgroundColor: darkBlue,
        justifyContent: "center",
        alignItems: "center"
    },
    bigTxtBold: {
        fontSize: widthPercentageToDP(8),
        color: textBlack,
        fontFamily: "Montserrat-Bold",
        marginTop: heightPercentageToDP(3)
    },
    TxtLight: {
        fontSize: widthPercentageToDP(4.5),
        color: lightBlue,
        fontFamily: "Montserrat-SemiBold",
    },
    dashboardMainView: {
        width: widthPercentageToDP(90),
        flex: 1,
        alignSelf: "center",
        //backgroundColor:"red"
    },
    greetingTxt: {
        fontSize: widthPercentageToDP(4),
        color: textBlack,
        fontFamily: "Montserrat-Light",
        marginTop: heightPercentageToDP(2)
    },
    findTxt: {
        fontSize: widthPercentageToDP(7),
        color: textBlack,
        fontFamily: "Montserrat-Bold",
        marginTop: heightPercentageToDP(1)
    },
    vectorIcon: {
        width: widthPercentageToDP(7),
        height: widthPercentageToDP(7)
    },
    searchTxt: {
        fontSize: widthPercentageToDP(6),
        color: textBlack,
        fontFamily: "Montserrat-SemiBold",
        marginTop: heightPercentageToDP(2)
    },
    bottomToggle: {
        position: "absolute",
        bottom: "4%",
        width: "100%"
    },
    banner: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(35)
    },
    profileHeader: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(25),
        backgroundColor: darkBlue,
        alignItems: "center"
    },
    profileRound: {
        width: widthPercentageToDP(25),
        height: widthPercentageToDP(25),
        borderRadius: widthPercentageToDP(25) / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: white,
        marginTop: heightPercentageToDP(1)
    },
    roundImg: {
        width: widthPercentageToDP(23),
        height: widthPercentageToDP(23),
        borderRadius: widthPercentageToDP(23) / 2,
    },
    profileName: {
        fontSize: widthPercentageToDP(5),
        color: textBlack,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
        marginTop: heightPercentageToDP(8)
    },
    memberTxt: {
        fontSize: widthPercentageToDP(5),
        color: lightGrey,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
        marginTop: heightPercentageToDP(1)
    },
    profileOptionView: {
        width: widthPercentageToDP(85),
        flex: 0,
        alignSelf: "center",
        marginTop: heightPercentageToDP(3)

    },
    blockView: {
        width: "100%",
        height: heightPercentageToDP(8),
        borderBottomWidth: 1,
        borderBottomColor: black,
        flexDirection: "row",
        alignItems: "center"
    },
    blockTxt: {
        fontSize: widthPercentageToDP(5),
        color: black,
        fontFamily: "Montserrat-Medium",
        textAlign: "center",
        marginLeft: widthPercentageToDP(5)
    }
})
