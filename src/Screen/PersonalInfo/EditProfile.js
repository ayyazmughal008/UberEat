import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, textBlack, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import { Header, Input } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../Redux/action'

const EditProfile = (props) => {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [name, setName] = useState(login.data.name)
    const [phone, setPhone] = useState(login.data.phone)
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
        dispatch(updateUserInfo(login.data.id, name, phone))
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
                <Input
                    placeholder='Name'
                    placeholderTextColor={textBlack}
                    inputStyle={[styles.inputTxt, { paddingLeft: 0, paddingTop: 0 }]}
                    leftIcon={
                        <FastImage
                            source={require('../../Images/Person.png')}
                            resizeMode={FastImage.resizeMode.cover}
                            style={styles.vectorIcon}
                        />
                    }
                    value={name}
                    onChangeText={text => setName(text)}
                    containerStyle={{ marginTop: heightPercentageToDP(2), borderBottomColor: black }}
                //style = {styles.inputTxt}
                />
                <Input
                    placeholder='Phone no'
                    placeholderTextColor={textBlack}
                    inputStyle={[styles.inputTxt, { paddingLeft: 0, paddingTop: 0 }]}
                    leftIcon={
                        <Ionicons
                            name='call-outline'
                            color={darkBlue}
                            size={30}
                        />
                    }
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    containerStyle={{ marginTop: heightPercentageToDP(2), borderBottomColor: black }}
                //style = {styles.inputTxt}
                />
            </View>

            <TouchableOpacity
                onPress={() => _onSubmit()}
                style={[styles.btn, {
                    marginTop: heightPercentageToDP(10)
                }]}
            >
                <Text style={[styles.btnTxt, {}]}>
                    {"Edit Info"}
                </Text>
            </TouchableOpacity>

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

export default EditProfile;