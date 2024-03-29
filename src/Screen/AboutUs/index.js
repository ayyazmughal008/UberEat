import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import { Header, Switch } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { userAboutUs, dispatchFuncOn, dispatchErrorMessage } from '../../Redux/action'
import Strings from '../../Translation'

const Settings = (props) => {
    const dispatch = useDispatch()
    const login = useSelector((state) => state.user.login);
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')

    useEffect(() => {
        getPolicy()
    }, [])

    const getPolicy = async () => {
        setLoading(true)
        const result = await userAboutUs(login.data.id)
        setResponse(result)
        setLoading(false)
        if (result.status == 401) {
            console.log('hi')
            dispatch(dispatchFuncOn())
            dispatch(dispatchErrorMessage(result.message))
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
                    text: Strings.ABOUT_US, style: {
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

            <View style={styles.profileOptionView}>
                <Text style={[styles.blockTxt, {
                    marginLeft: 0
                }]}>
                    {!response ? "" : response.data}
                </Text>

            </View>
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

export default Settings