import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Header } from 'react-native-elements'
import FastImage from 'react-native-fast-image'

const Profile = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <Header
                    leftComponent={
                        <TouchableOpacity
                            onPress={() => { props.navigation.goBack() }}>
                            <MaterialIcons
                                name="keyboard-arrow-left"
                                color={white}
                                size={35}
                            />
                        </TouchableOpacity>
                    }
                    centerComponent={{
                        text: "MY PROFILE", style: {
                            color: white,
                            fontSize: widthPercentageToDP(5),
                            fontFamily: "Montserrat-Bold",
                        }
                    }}
                    containerStyle={{
                        backgroundColor: 'transparent',
                        borderBottomWidth: 0,
                        height: heightPercentageToDP(17)
                    }}
                    statusBarProps={{
                        backgroundColor: white
                    }}
                    barStyle="dark-content"
                />
                <View style={styles.profileRound}>
                    <FastImage
                        source={require('../../Images/profile2.png')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.roundImg}
                    />
                </View>
            </View>
            {/* name info */}
            <Text style={styles.profileName}>
                {"John Martin"}
            </Text>
            <Text style={styles.memberTxt}>
                {"Member since  November 2021"}
            </Text>
            {/* profile options */}

            <View style={styles.profileOptionView}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('PersonalInfo')}
                    style={styles.blockView}>
                    <Ionicons
                        name='ios-person-circle-outline'
                        color={black}
                        size={35}
                    />
                    <Text style={styles.blockTxt}>
                        {"Personal Info"}
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={black}
                        size={30}
                        style={{
                            position: "absolute",
                            right: "0%",
                            top: "25%"
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('MyBooking')}
                    style={styles.blockView}>
                    <FontAwesome
                        name='calendar-check-o'
                        color={black}
                        size={30}
                    />
                    <Text style={styles.blockTxt}>
                        {"My Booking"}
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={black}
                        size={30}
                        style={{
                            position: "absolute",
                            right: "0%",
                            top: "25%"
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.blockView}>
                    <AntDesign
                        name='wallet'
                        color={black}
                        size={30}
                    />
                    <Text style={styles.blockTxt}>
                        {"Payment Method"}
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={black}
                        size={30}
                        style={{
                            position: "absolute",
                            right: "0%",
                            top: "25%"
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Language')}
                    style={styles.blockView}>
                    <Fontisto
                        name='world-o'
                        color={black}
                        size={30}
                    />
                    <Text style={styles.blockTxt}>
                        {"Change Language"}
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={black}
                        size={30}
                        style={{
                            position: "absolute",
                            right: "0%",
                            top: "25%"
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Settings')}
                    style={styles.blockView}>
                    <AntDesign
                        name='setting'
                        color={black}
                        size={30}
                    />
                    <Text style={styles.blockTxt}>
                        {"Settings"}
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={black}
                        size={30}
                        style={{
                            position: "absolute",
                            right: "0%",
                            top: "25%"
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.blockView}>
                    <MaterialIcons
                        name='logout'
                        color={black}
                        size={30}
                    />
                    <Text style={styles.blockTxt}>
                        {"Logout"}
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={black}
                        size={30}
                        style={{
                            position: "absolute",
                            right: "0%",
                            top: "25%"
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Profile;


