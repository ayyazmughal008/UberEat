import React, { Component } from 'react';
import { View, Modal, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import LinearGradient from 'react-native-linear-gradient';
import { offWhite, darkBlue } from '../../Colors'
import { useDispatch, useSelector } from 'react-redux';


const DialogBox = (props) => {
    const dispatch = useDispatch();
    const popUp = useSelector((state) => state.user.popUp);
    const errorMessage = useSelector((state) => state.user.errorMessage);


    return (
        <Modal
            transparent={true}
            visible={popUp}
            animationType="fade"
            onRequestClose={() => {
                console.log('alert close')
            }}
        >
            <View style={styles.modalMain2}>
                <View style={styles.quesBox}>
                    <View style={styles.toptile}>
                        <Text style={styles.toptext}>
                            {errorMessage}
                        </Text>
                    </View>
                    <View style={styles.bottomView}>
                        {/* <TouchableOpacity
                            onPress={props.cancelClick}
                            style={{
                                width: "50%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text style={styles.btnText}>
                                {"Actualizar"}
                            </Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={props.okClick}
                            style={{
                                width: "50%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: darkBlue,
                                borderRadius: widthPercentageToDP(10)
                            }}
                        >
                            <Text style={styles.btnText}>
                                {"Ok"}
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
    )

}


const styles = StyleSheet.create({
    modalMain2: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    quesBox: {
        width: widthPercentageToDP(90),
        flex: 0,
        marginLeft: widthPercentageToDP(0),
        borderRadius: widthPercentageToDP(3),
        alignItems: "center",
        backgroundColor: offWhite,
        borderRadius: widthPercentageToDP(7),
        shadowColor: '#000000',
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.5
    },
    btnText: {
        color: "#ffff",
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center"
    },
    bottomView: {
        width: "100%",
        height: "25%",
        flexDirection: "row",
        position: "absolute",
        bottom: "2%",
        alignItems: "center",
        justifyContent: "space-around",
        //backgroundColor: lightBlue,
        borderBottomLeftRadius: widthPercentageToDP(5),
        borderBottomRightRadius: widthPercentageToDP(5)
    },
    toptile: {
        width: "100%",
        height: "30%",
        justifyContent: "center",
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: "#000"
    },
    toptext: {
        color: "#000",
        fontSize: widthPercentageToDP(4.5),
        fontFamily: "Montserrat-SemiBold",
        //paddingLeft: widthPercentageToDP(3),
        marginTop: heightPercentageToDP(1),
        textAlign: "center"
    },
    centerView: {
        flex: 1
    },
})

export default DialogBox;