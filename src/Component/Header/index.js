import React from 'react'
import { Header } from 'react-native-elements'
import { Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { black, white } from '../../Colors'
import Icon from 'react-native-vector-icons/Ionicons'

const MyHeader = (props) => {
    return (
        <Header
            leftComponent={
                <FastImage
                    source={props.userImg}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{
                        width: widthPercentageToDP(10),
                        height: widthPercentageToDP(10),
                        borderRadius: widthPercentageToDP(10) / 2
                    }}
                />
            }
            centerComponent={{
                text: props.title, style: {
                    color: black,
                    fontSize: widthPercentageToDP(5.5),
                    fontFamily: "Montserrat-Bold",
                }
            }}
            rightComponent={
                <Icon
                    name={props.iconName}
                    color={black}
                    size={35}
                />
            }
            containerStyle={{
                backgroundColor: white,
                borderBottomWidth: 0
            }}
            statusBarProps={{
                backgroundColor: white
            }}
            barStyle= "dark-content"
        />
    )
}

export default MyHeader