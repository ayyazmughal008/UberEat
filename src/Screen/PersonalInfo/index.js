import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
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

const PersonalInfo = (props) => {
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
                    text: "PERSONAL INFO", style: {
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
                <FastImage
                    source={require('../../Images/profile2.png')}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.roundImg}
                />
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
                style={[styles.btn,{
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

export default PersonalInfo;