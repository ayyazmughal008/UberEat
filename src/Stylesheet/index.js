import { StyleSheet, Platform } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { white, darkBlue, lightBlue, textBlack, lightGrey, black, offWhite } from '../Colors'

export const CELL_SIZE = 50;
export const CELL_BORDER_RADIUS = 15;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = '#000000';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    bottomLoginView: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(45),
        // position: "absolute",
        // bottom: "0%",
        alignSelf: "center",
        marginTop: heightPercentageToDP(5)
        //backgroundColor:"red"
    },
    inputView: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(6.5),
        borderWidth: widthPercentageToDP(0.1),
        borderColor: lightGrey,
        backgroundColor: offWhite,
        alignSelf: "center",
        borderRadius: widthPercentageToDP(2),
        marginTop: heightPercentageToDP(3)
    },
    inputTxt: {
        fontSize: widthPercentageToDP(4),
        color: black,
        fontFamily: "Montserrat-Medium",
        paddingLeft: widthPercentageToDP(5),
        paddingTop: Platform.OS === 'ios' ? heightPercentageToDP(2) : 0
    },
    forgetPassTxt: {
        fontSize: widthPercentageToDP(4.5),
        color: lightBlue,
        fontFamily: "Montserrat-Medium",
        paddingTop: heightPercentageToDP(1)
    },
    btn: {
        width: widthPercentageToDP("86%"),
        height: heightPercentageToDP(7.5),
        borderRadius: widthPercentageToDP(10),
        backgroundColor: darkBlue,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: heightPercentageToDP(4)
    },
    btn2: {
        width: widthPercentageToDP("90%"),
        height: heightPercentageToDP(7.5),
        borderRadius: widthPercentageToDP(10),
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
        marginTop: heightPercentageToDP(5),
        marginLeft: widthPercentageToDP(2)
    },
    TxtLight: {
        fontSize: widthPercentageToDP(4.5),
        color: lightBlue,
        fontFamily: "Montserrat-SemiBold",
        marginLeft: widthPercentageToDP(2)
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
        fontFamily: "Montserrat-Medium",
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
        bottom: "1%",
        width: "100%"
    },
    banner: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(35),
        //opacity: "rgba(0,0,0,0.8)"
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
        fontSize: widthPercentageToDP(4.5),
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
    },
    sticker: {
        width: widthPercentageToDP(20),
        height: widthPercentageToDP(20),
        borderRadius: widthPercentageToDP(3),
        position: "absolute",
        bottom: "3%",
        left: "5%"
    },
    row: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: heightPercentageToDP(2),
        flex: 0
    },
    row2: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: heightPercentageToDP(2),
        height: heightPercentageToDP(5),
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: black,
        alignSelf: "center",
        justifyContent: "space-between"
    },
    mediumText: {
        fontSize: widthPercentageToDP(4.5),
        color: black,
        fontFamily: "Montserrat-Medium",
        textAlign: "left",
        marginLeft: widthPercentageToDP(4)
    },
    title: {
        fontSize: widthPercentageToDP(4.5),
        color: black,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "left",
        marginTop: heightPercentageToDP(4)
    },
    modalView: {
        flex: 1,
        alignItems: "center"
    },
    modalBottom: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(35),
        position: "absolute",
        bottom: "0%",
        backgroundColor: offWhite,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 4,
        borderTopLeftRadius: widthPercentageToDP(15),
        borderTopRightRadius: widthPercentageToDP(15)
    },
    modalBottom3: {
        width: widthPercentageToDP(100),
        flex: 0,
        position: "absolute",
        bottom: "0%",
        backgroundColor: offWhite,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 4,
        borderTopLeftRadius: widthPercentageToDP(15),
        borderTopRightRadius: widthPercentageToDP(15)
    },
    line: {
        width: widthPercentageToDP(15),
        height: heightPercentageToDP(0.5),
        backgroundColor: black,
        alignSelf: "center",
        marginTop: heightPercentageToDP(2),
        borderRadius: widthPercentageToDP(4)
    },
    priceTxt: {
        fontSize: widthPercentageToDP(4),
        color: black,
        fontFamily: "Montserrat-Medium",
    },
    price: {
        fontSize: widthPercentageToDP(4),
        color: black,
        fontFamily: "Montserrat-SemiBold",
    },
    rectangle: {
        width: widthPercentageToDP(43),
        height: heightPercentageToDP(22),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: widthPercentageToDP(0.3),
        borderColor: black,
        borderRadius: widthPercentageToDP(4),
    },
    innerModal: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(70),
        borderRadius: widthPercentageToDP(5),
        backgroundColor: white,
        alignItems: "center"
    },
    line2: {
        marginTop: heightPercentageToDP(2),
        width: "100%",
        height: widthPercentageToDP(0.1),
        backgroundColor: black
    },
    row3: {
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: heightPercentageToDP(2),
        alignSelf: "center"
    },
    row4: {
        width: "50%",
        height: heightPercentageToDP(6),
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: offWhite,
        justifyContent: "space-between",
        marginTop: heightPercentageToDP(1),
        marginLeft: widthPercentageToDP(2)
    },
    blueCircle: {
        width: widthPercentageToDP(9),
        height: widthPercentageToDP(9),
        borderRadius: widthPercentageToDP(9) / 2,
        backgroundColor: darkBlue,
        justifyContent: "center",
        alignItems: "center"
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topIntro: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(40),
        backgroundColor: darkBlue,
        justifyContent: "center",
        alignItems: "center"
    },
    aboutTxt: {
        fontSize: widthPercentageToDP(6),
        fontFamily: "Montserrat-SemiBold",
        color: black,
        marginTop: heightPercentageToDP(3)
    },
    row5: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        width: "100%",
    },
    modalBottom2: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(35),
        backgroundColor: white,
        borderTopRightRadius: widthPercentageToDP(4),
        borderTopLeftRadius: widthPercentageToDP(4),
        position: "absolute",
        bottom: "0%"
    },
    timeBox: {
        width: widthPercentageToDP(24),
        height: heightPercentageToDP(8),
        borderWidth: widthPercentageToDP(0.1),
        borderTopColor: black,
        marginLeft: widthPercentageToDP(0.5),
        marginRight: widthPercentageToDP(0.5),
        marginTop: heightPercentageToDP(1)
    },
    topBox: {
        width: widthPercentageToDP(24),
        height: heightPercentageToDP(4),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkBlue
    },
    codeFieldRoot: {
        marginTop: 20
    },
    cell: {
        marginHorizontal: 8,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 5,
        ...Platform.select({ web: { lineHeight: 65 } }),
        fontSize: 30,
        textAlign: 'center',
        borderRadius: CELL_BORDER_RADIUS,
        color: '#000',
        backgroundColor: '#fff',

        // IOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        // Android
        elevation: 5,
    },
    focusCell: {
        borderColor: '#000',
    },

})
