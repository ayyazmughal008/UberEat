import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import { Header } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


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
                    text: "CHANGE LANGUAGE", style: {
                        color: black,
                        fontSize: widthPercentageToDP(5),
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
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                    style={[styles.btn, {
                        marginTop: heightPercentageToDP(4)
                    }]}
                >
                    <Text style={[styles.btnTxt, {}]}>
                        {"English"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, {
                        marginTop: heightPercentageToDP(4)
                    }]}
                >
                    <Text style={[styles.btnTxt, {}]}>
                        {"Spanish"}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default PersonalInfo;