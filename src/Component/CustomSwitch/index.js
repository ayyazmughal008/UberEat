import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import FastImage from 'react-native-fast-image';

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
                    borderColor: selectionColor,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 2,
                }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updatedSwitchData(1)}
                    style={{
                        flex: 1,

                        backgroundColor: getSelectionMode == 1 ? selectionColor : 'white',
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
                        tintColor={getSelectionMode == 1 ? 'white' : selectionColor}
                    />
                    <Text
                        style={{
                            fontSize: widthPercentageToDP(4.5),
                            fontFamily: "OpenSans-Bold",
                            color: getSelectionMode == 1 ? 'white' : selectionColor,
                        }}>
                        {option1}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
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
                        tintColor={getSelectionMode == 2 ? 'white' : selectionColor}
                    />
                    <Text
                        style={{
                            fontSize: widthPercentageToDP(4.5),
                            fontFamily: "OpenSans-Bold",
                            color: getSelectionMode == 2 ? 'white' : selectionColor,
                        }}>
                        {option2}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default CustomSwitch;