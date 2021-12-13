import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import { Header } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux';

const PersonalInfo = (props) => {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    return (
        <View style={styles.container}>
            <Header
                leftComponent={
                    <TouchableOpacity
                        onPress={() => { props.navigation.goBack() }}>
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            color={black}
                            size={35}
                        />
                    </TouchableOpacity>
                }
                centerComponent={{
                    text: "PERSONAL INFO", style: {
                        color: black,
                        fontSize: widthPercentageToDP(4),
                        fontFamily: "Montserrat-Bold",
                    }
                }}
                containerStyle={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 0,
                    //height: heightPercentageToDP(17)
                }}
                statusBarProps={{
                    backgroundColor: white
                }}
                barStyle="dark-content"
            />
            <View style={[styles.profileRound, {
                backgroundColor: darkBlue,
                alignSelf: "center"
            }]}>
                {!login || !login.data.image ?
                    <FastImage
                        source={require('../../Images/profile.png')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.roundImg}
                    />
                    : <FastImage
                        source={{ uri: 'http://108.61.209.20/' + login.data.image }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.roundImg}
                    />
                }
            </View>

            <View style={[styles.profileOptionView, { marginTop: heightPercentageToDP(8) }]}>
                <View style={styles.blockView}>
                    <FastImage
                        source={require('../../Images/Person.png')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.vectorIcon}
                    />
                    <Text style={styles.blockTxt}>
                        {login.data.name}
                    </Text>
                </View>
                <View style={styles.blockView}>
                    <Ionicons
                        name='call-outline'
                        color={darkBlue}
                        size={30}
                    />
                    <Text style={styles.blockTxt}>
                        {login.data.phone}
                    </Text>
                </View>
                {/* <View style={styles.blockView}>
                    <FastImage
                        source={require('../../Images/mail.png')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.vectorIcon}
                    />
                    <Text style={styles.blockTxt}>
                        {login.data.email}
                    </Text>
                </View>
                <View style={styles.blockView}>
                    <FastImage
                        source={require('../../Images/Location.png')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.vectorIcon}
                    />
                    <Text style={styles.blockTxt}>
                        {!login.data.country ? "" : login.data.country + ", " + !login.data.city ? "" : login.data.city}
                    </Text>
                </View> */}
            </View>

            <TouchableOpacity
                onPress={() => props.navigation.navigate('EditProfile')}
                style={[styles.btn, {
                    marginTop: heightPercentageToDP(10)
                }]}
            >
                <Text style={[styles.btnTxt, {}]}>
                    {"Edit Info"}
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default PersonalInfo;