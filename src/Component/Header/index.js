import React from 'react'
import { Header } from 'react-native-elements'
import { Text, TouchableOpacity, Platform } from 'react-native'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, white } from '../../Colors'
import Icon from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { View } from 'react-native-animatable'

const MyHeader = (props) => {
    return (
        <Header
            leftComponent={
                props.isBack ?
                    <TouchableOpacity
                        onPress={props.leftClick}
                    >
                        <AntDesign
                            name="arrowleft"
                            color={black}
                            size={30}
                        />
                    </TouchableOpacity>
                    : props.isProfile ?
                        <TouchableOpacity
                            onPress={props.leftClick}
                        >
                            {props.profileImage ?
                                <FastImage
                                    source={{ uri: 'http://108.61.209.20/' + props.profileImage }}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={{
                                        width: widthPercentageToDP(10),
                                        height: widthPercentageToDP(10),
                                        borderRadius: widthPercentageToDP(10) / 2,
                                        marginLeft: widthPercentageToDP(2)
                                    }}
                                />
                                : <FastImage
                                    source={props.userImg}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={{
                                        width: widthPercentageToDP(10),
                                        height: widthPercentageToDP(10),
                                        borderRadius: widthPercentageToDP(10) / 2,
                                        marginLeft: widthPercentageToDP(2)
                                    }}
                                />
                            }
                        </TouchableOpacity>
                        : <View />

            }
            centerComponent={{
                text: props.title, style: {
                    color: darkBlue,
                    fontSize: widthPercentageToDP(5.5),
                    fontFamily: "Montserrat-Bold",
                }
            }}
            rightComponent={
                <TouchableOpacity onPress={props.rightClick}>
                    <FastImage
                        source={require('../../Images/Notification.png')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={{
                            width: widthPercentageToDP(10),
                            height: widthPercentageToDP(10)
                        }}
                    />
                </TouchableOpacity>

            }
            containerStyle={{
                backgroundColor: white,
                borderBottomWidth: 0,
                paddingTop: 0
            }}
            statusBarProps={{
                backgroundColor: white
            }}
            barStyle="dark-content"
        />
    )
}

export default MyHeader