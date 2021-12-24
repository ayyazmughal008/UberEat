import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, lightGrey, textBlack, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import { Header, Input } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux';
import { changeUserPassword } from '../../Redux/action'

const Settings = (props) => {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.user.login);
    const data = props.route.params.data
    const [isLoading, setLoading] = useState(false)
    const [newPass, setnewPass] = useState('')
    const [confPass, setConfPass] = useState('')

    const _onSubmit = () => {
        // if (!oldPass) {
        //     Alert.alert('', "please enter your old password")
        //     return
        // }
        if (!newPass) {
            Alert.alert('', "please enter your new password")
            return
        }
        if (!confPass) {
            Alert.alert('', "please re enter your password")
            return
        }

        if (newPass !== confPass) {
            Alert.alert('', "New password and confirm password should be match")
            return
        }

        updatePassApi()
    }

    const updatePassApi = async () => {
        setLoading(true)
        const result = await changeUserPassword(data.user_id, newPass)
        await setLoading(false)
        if (result.status == 200) {
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
                    text: "CHANGE PASSWORD", style: {
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
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 0, width: widthPercentageToDP(90), alignSelf: "center", marginTop: heightPercentageToDP(10) }}>
                    {/* <Input
                        placeholder='Current Password'
                        placeholderTextColor={textBlack}
                        inputStyle={[styles.inputTxt, { paddingLeft: 0 }]}
                        leftIcon={
                            <FastImage
                                source={require('../../Images/Group_5459.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.vectorIcon}
                            />
                        }
                        secureTextEntry={true}
                        onChangeText={text => setOldPass(text)}
                        containerStyle={{ marginTop: heightPercentageToDP(2), borderBottomColor: black }}
                    //style = {styles.inputTxt}
                    /> */}
                    <Input
                        placeholder='New Password'
                        placeholderTextColor={textBlack}
                        inputStyle={[styles.inputTxt, { paddingLeft: 0 }]}
                        leftIcon={
                            <FastImage
                                source={require('../../Images/Group_5459.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.vectorIcon}
                            />
                        }
                        secureTextEntry={true}
                        onChangeText={text => setnewPass(text)}
                        containerStyle={{ marginTop: heightPercentageToDP(2), borderBottomColor: black }}
                    //style = {styles.inputTxt}
                    />
                    <Input
                        placeholder='Confirm New Password'
                        placeholderTextColor={textBlack}
                        inputStyle={[styles.inputTxt, { paddingLeft: 0 }]}
                        leftIcon={
                            <FastImage
                                source={require('../../Images/Group_5459.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.vectorIcon}
                            />
                        }
                        secureTextEntry={true}
                        onChangeText={text => setConfPass(text)}
                        containerStyle={{ marginTop: heightPercentageToDP(2), borderBottomColor: black }}
                    //style = {styles.inputTxt}
                    />

                    <TouchableOpacity
                        onPress={() => _onSubmit()}
                        style={[styles.btn, {
                            marginTop: heightPercentageToDP(4)
                        }]}
                    >
                        <Text style={[styles.btnTxt, {}]}>
                            {"Done"}
                        </Text>
                    </TouchableOpacity>
                </View>
                {isLoading &&
                    <ActivityIndicator
                        size="large"
                        color={darkBlue}
                        style={styles.loading}
                    />
                }
            </KeyboardAwareScrollView>

        </View>
    )
}

export default Settings

