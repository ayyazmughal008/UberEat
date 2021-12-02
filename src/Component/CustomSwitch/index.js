import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import FastImage from 'react-native-fast-image';
import { darkBlue, gold1, gold2, gold3, lightGrey, textBlack, white } from '../../Colors';
import LinearGradient from 'react-native-linear-gradient'

const CustomSwitch = ({
    navigation,
    selectionMode,
    roundCorner,
    option1,
    option2,
    onSelectSwitch,
    selectionColor
}) => {
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);
    const [getRoundCorner, setRoundCorner] = useState(roundCorner);

    const updatedSwitchData = val => {
        setSelectionMode(val);
        onSelectSwitch(val);
    };

    return (
        <View>
            <View
                style={{
                    width: "90%",
                    height: heightPercentageToDP(10),
                    backgroundColor: 'white',
                    borderRadius: getRoundCorner ? widthPercentageToDP(10) : widthPercentageToDP(10),
                    borderWidth: 1,
                    borderColor: lightGrey,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    //padding: 2,
                    alignSelf: "center",
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 1.0,
                    elevation: 4
                }}>

                {getSelectionMode == 1 ?
                    <LinearGradient
                        colors={[gold1, gold2, gold3]}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: widthPercentageToDP(10),
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => updatedSwitchData(1)}
                            style={{
                                // flex: 1,
                                // backgroundColor: getSelectionMode == 1 ? selectionColor : 'white',
                                // borderRadius: getRoundCorner ? widthPercentageToDP(10) : widthPercentageToDP(10),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <FastImage
                                source={require('../../Images/Search.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(10),
                                    height: widthPercentageToDP(10)
                                }}
                                tintColor={getSelectionMode == 1 ? darkBlue : white}
                            />
                            <Text
                                style={{
                                    fontSize: widthPercentageToDP(4.5),
                                    fontFamily: "Montserrat-Bold",
                                    color: getSelectionMode == 1 ? darkBlue : white,
                                }}>
                                {option1}
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    : <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => updatedSwitchData(1)}
                        style={{
                            flex: 1,
                            backgroundColor: 'white',
                            borderRadius: getRoundCorner ? widthPercentageToDP(10) : widthPercentageToDP(10),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <FastImage
                            source={require('../../Images/Search.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(10),
                                height: widthPercentageToDP(10)
                            }}
                            tintColor={getSelectionMode == 1 ? 'white' : darkBlue}
                        />
                        <Text
                            style={{
                                fontSize: widthPercentageToDP(4.5),
                                fontFamily: "Montserrat-Bold",
                                color: getSelectionMode == 1 ? 'white' : darkBlue,
                            }}>
                            {option1}
                        </Text>
                    </TouchableOpacity>
                }
                {getSelectionMode == 2 ?
                    <LinearGradient
                        colors={[gold1, gold2, gold3]}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: widthPercentageToDP(10),
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <TouchableOpacity
                            TouchableOpacity
                            activeOpacity={1}
                            onPress={() => updatedSwitchData(2)}
                            style={{
                                //flex: 1,
                                //backgroundColor: getSelectionMode == 2 ? selectionColor : 'white',
                                //borderRadius: getRoundCorner ? widthPercentageToDP(10) : widthPercentageToDP(10),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <FastImage
                                source={require('../../Images/Social.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(10),
                                    height: widthPercentageToDP(10)
                                }}
                                tintColor={getSelectionMode == 2 ? darkBlue : white}
                            />
                            <Text
                                style={{
                                    fontSize: widthPercentageToDP(4.5),
                                    fontFamily: "Montserrat-Bold",
                                    color: getSelectionMode == 2 ? darkBlue : white,
                                }}>
                                {option2}
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    : <TouchableOpacity
                        TouchableOpacity
                        activeOpacity={1}
                        onPress={() => updatedSwitchData(2)}
                        style={{
                            flex: 1,
                            backgroundColor: getSelectionMode == 2 ? selectionColor : 'white',
                            borderRadius: getRoundCorner ? widthPercentageToDP(10) : widthPercentageToDP(10),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <FastImage
                            source={require('../../Images/Social.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(10),
                                height: widthPercentageToDP(10)
                            }}
                            tintColor={getSelectionMode == 2 ? 'white' : darkBlue}
                        />
                        <Text
                            style={{
                                fontSize: widthPercentageToDP(4.5),
                                fontFamily: "Montserrat-Bold",
                                color: getSelectionMode == 2 ? 'white' : darkBlue,
                            }}>
                            {option2}
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};
export default CustomSwitch;