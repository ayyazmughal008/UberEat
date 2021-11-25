import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, lightGrey, textBlack, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import { Header, Input } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FastImage from 'react-native-fast-image'

const Settings = (props) => {


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
                    <Input
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
                        containerStyle={{ marginTop: heightPercentageToDP(2), borderBottomColor: black }}
                    //style = {styles.inputTxt}
                    />
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
                        containerStyle={{ marginTop: heightPercentageToDP(2), borderBottomColor: black }}
                    //style = {styles.inputTxt}
                    />

                    <TouchableOpacity
                        style={[styles.btn, {
                            marginTop: heightPercentageToDP(4)
                        }]}
                    >
                        <Text style={[styles.btnTxt, {}]}>
                            {"Done"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>

        </View>
    )
}

export default Settings

