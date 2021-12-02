import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity , ActivityIndicator, Alert } from 'react-native'
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

const EditProfile = (props) => {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConPassword] = useState('')
    const [isLoading, setLoading] = useState(false)


    const _onSubmit = () => {
        if (!name) {
            Alert.alert('Name Error', 'Please enter a valid name')
            return;
        }
        if (!phone) {
            Alert.alert('Name Error', 'Please enter a valid Phone no')
            return;
        }
        if (!password || password.length < 8) {
            Alert.alert('Password Error', 'Please enter password, should be 8 characters long')
            return;
        }
        if (!ConfirmPassword || ConfirmPassword.length < 8) {
            Alert.alert('Password Error', 'Please enter confirm password, should be 8 characters long')
            return;
        }
        if (password !== ConfirmPassword) {
            Alert.alert('Password Mismatch', 'Password and Confirm password should be same ')
            return;
        }

        //registerApi()

    }
    const registerApi = async () => {
        setLoading(true)
        const result = await userRegister(name, email, password, phone)
        if (result.status == 200) {
            setLoading(false)
            props.navigation.navigate('Login')
        }
    }




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
                    text: "EDIT INFO", style: {
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
                    <Ionicons
                        name='person-outline'
                        color={black}
                        size={30}
                    />
                    <Text style={styles.blockTxt}>
                        {"John Martin"}
                    </Text>
                </View>
                <View style={styles.blockView}>
                    <Ionicons
                        name='call-outline'
                        color={black}
                        size={30}
                    />
                    <Text style={styles.blockTxt}>
                        {"+1 883 345 2321"}
                    </Text>
                </View>
                <View style={styles.blockView}>
                    <Fontisto
                        name='email'
                        color={black}
                        size={30}
                    />
                    <Text style={styles.blockTxt}>
                        {"johnmartin@gmail.com"}
                    </Text>
                </View>
                <View style={styles.blockView}>
                    <MaterialCommunityIcons
                        name='map-marker-radius'
                        color={black}
                        size={30}
                    />
                    <Text style={styles.blockTxt}>
                        {"Barcilona, Spain"}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
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

export default EditProfile;