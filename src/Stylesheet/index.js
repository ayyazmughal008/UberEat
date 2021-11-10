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
        paddingLeft: widthPercentageToDP(5)
    },
    forgetPassTxt: {
        fontSize: widthPercentageToDP(4.5),
        color: lightBlue,
        fontWeight: "300",
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
    btnTxt: {
        fontSize: widthPercentageToDP(4.5),
        color: white,
    },
    smallTxt: {
        fontSize: widthPercentageToDP(3.8),
        color: black,
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
        fontWeight: "500",
        marginTop: heightPercentageToDP(3)
    },
    TxtLight: {
        fontSize: widthPercentageToDP(4.5),
        color: lightBlue,
        fontWeight: "500",
    },
    dashboardMainView: {
        width: widthPercentageToDP(90),
        flex: 1,
        alignSelf: "center",
    },
    greetingTxt:{
        fontSize: widthPercentageToDP(4),
        color: textBlack,
        fontWeight: "300",
        marginTop: heightPercentageToDP(2)
    },
    findTxt:{
        fontSize: widthPercentageToDP(7),
        color: textBlack,
        fontWeight: "bold",
        marginTop: heightPercentageToDP(1)
    },
    vectorIcon:{
        width: widthPercentageToDP(7),
        height: widthPercentageToDP(7)
    },
    searchTxt:{
        fontSize: widthPercentageToDP(6),
        color: textBlack,
        fontWeight: "500",
        marginTop: heightPercentageToDP(2)
    }
})
