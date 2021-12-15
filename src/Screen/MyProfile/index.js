import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, PermissionsAndroid, Platform, ActivityIndicator } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, gold1, gold2, gold3, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import { Header } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import Picker from '../../Component/Picker'
import ImagePicker from 'react-native-image-crop-picker';
import { uploadUserImage } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../Redux/action'
import Fontisto from 'react-native-vector-icons/Fontisto'
import LinearGradient from 'react-native-linear-gradient'

const Profile = (props) => {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [pickerOption, setOption] = useState(false)

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Myhookah',
                    'message': 'Myhookah App needs access to your camera ' +
                        'so you can take pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                _onLunchCamera();
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    const _onLunchCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(response => {
            let data = "";
            data = {
                'uri': response.path,
                'type': response.mime,
                'name': Date.now() + '_Pecedex.png',
            }
            dispatch(uploadUserImage(data, login.data.id));
            setOption(false);
        })
            .catch(err => {
                console.log(err);
            })
    }
    const _onLunchGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            let data = "";
            data = {
                'uri': image.path,
                'type': image.mime,
                'name': Date.now() + '_Pecedex.png',
            }
            console.log(data);
            dispatch(uploadUserImage(data, login.data.id));
            setOption(false);
        }).catch(error => {
            console.log(error);
        })
    }
    const toggleOption = () => {
        setOption(!pickerOption)
    }

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
                            fontSize: widthPercentageToDP(4),
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
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={[gold1, gold2, gold3]}
                    style={styles.profileRound}>
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
                    <Feather
                        name="edit"
                        color={darkBlue}
                        size={30}
                        style={{
                            position: "absolute",
                            bottom: "10%",
                            right: "5%"
                        }}
                        onPress={() => setOption(true)}
                    />
                </LinearGradient>
            </View>
            {/* name info */}
            <Text style={styles.profileName}>
                {login.data.name}
            </Text>
            <Text style={styles.memberTxt}>
                {login.data.member_since}
            </Text>
            {/* profile options */}

            <View style={styles.profileOptionView}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('PersonalInfo')}
                    style={styles.blockView}>
                    <FastImage
                        source={require('../../Images/Group_5443.png')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.vectorIcon}
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
                    <FastImage
                        source={require('../../Images/Group_5434.png')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.vectorIcon}
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
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Favourites')}
                    style={styles.blockView}>
                    <FastImage
                        source={require('../../Images/heart_blue.png')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.vectorIcon}
                    />
                    <Text style={styles.blockTxt}>
                        {"Favourites Restaurants"}
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
                    <FastImage
                        source={require('../../Images/Group_5170.png')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.vectorIcon}
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
                    <FastImage
                        source={require('../../Images/Group_5436.png')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.vectorIcon}
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
                    <FastImage
                        source={require('../../Images/settings.png')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.vectorIcon}
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
                <TouchableOpacity
                    onPress={() => dispatch(logOut())}
                    style={styles.blockView}>
                    <FastImage
                        source={require('../../Images/Group_4090.png')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.vectorIcon}
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
            {pickerOption &&
                <Picker
                    isDialogOpen={pickerOption}
                    cancelClick={() => {
                        if (Platform.OS === 'ios') {
                            _onLunchCamera();
                            //toggleOption()

                        } else {
                            toggleOption(),
                                requestCameraPermission()
                        }
                    }}
                    okClick={() => {
                        if (Platform.OS === 'ios') {
                            _onLunchGallery();
                            //toggleOption()

                        } else {
                            toggleOption(),
                                _onLunchGallery()
                        }
                    }}
                    title={"Please choose an image from Camera OR Gallery "}
                    closeBox={() => toggleOption()}
                />
            }
            {AuthLoading &&
                <ActivityIndicator
                    size="large"
                    color={darkBlue}
                    style={styles.loading}
                />
            }
        </View>
    )
}

export default Profile;


