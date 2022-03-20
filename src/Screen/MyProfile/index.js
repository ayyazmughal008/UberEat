import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, PermissionsAndroid, Platform, ActivityIndicator, ScrollView } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, gold1, gold2, gold3, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import { Header } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import Picker from '../../Component/Picker'
import ImagePicker from 'react-native-image-crop-picker';
import { uploadUserImage, inviteFriends } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';
import Share from 'react-native-share';
import { logOut } from '../../Redux/action'
import Entypo from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient'
import { version } from '../../../package.json'
import Strings from '../../Translation'

const Profile = (props) => {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [pickerOption, setOption] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState("")

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
    const shareVideo = async (code) => {
        const shareOptions = {
            title: 'Myhookah',
            message: `Hi, install Myhookah app, apply this code ${code} and get discount`,
            failOnCancel: false,
        };
        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log(ShareResponse)
        } catch (error) {
            console.log('Error =>', error);
        }
    };

    const getCode = async () => {
        setLoading(true)
        const result = await inviteFriends(login.data.id)
        await setLoading(false)
        if(result.status == 200){
            shareVideo(result.data)
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                            text: Strings.MY_PROFILE, style: {
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
                            {Strings.Personal_Info}
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
                            {Strings.My_Booking}
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
                            {Strings.Favorite_Restaurants}
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
                            {Strings.Payment_Method}
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
                            {Strings.Change_Language}
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
                            {Strings.Settings}
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
                        onPress={() => { getCode() }}
                        style={styles.blockView}>
                        <Entypo
                            name="share"
                            color={darkBlue}
                            size={30}
                            style={styles.vectorIcon}
                        />
                        {/* <FastImage
                            source={require('../../Images/settings.png')}
                            resizeMode={FastImage.resizeMode.cover}
                            style={styles.vectorIcon}
                        /> */}
                        <Text style={styles.blockTxt}>
                            {Strings.Invite_Friends}
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
                            {Strings.Logout}
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
                        disabled={true}
                        //onPress={() => dispatch(logOut())}
                        style={styles.blockView}>
                        {/* <FastImage
                            source={require('../../Images/Group_4090.png')}
                            resizeMode={FastImage.resizeMode.cover}
                            style={styles.vectorIcon}
                        /> */}
                        {/* <Text style={styles.blockTxt}>
                            {""}
                        </Text> */}
                        <Text style={{
                            position: "absolute",
                            right: "0%",
                            top: "25%",
                            fontSize: widthPercentageToDP(5),
                            fontWeight: "bold",
                            color: darkBlue
                        }}
                        >
                            {"Version: "}{version}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
                    title={Strings.choose_camera}
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
            {isLoading &&
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


