import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import { Header, Switch } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Strings from '../../Translation'


const Settings = (props) => {

    const [checked, setChecked] = useState(false)

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
                    text: Strings.SETTINGS, style: {
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
                <TouchableOpacity style={[styles.blockView, {
                    justifyContent: "space-between"
                }]}>
                    <Text style={[styles.blockTxt, {
                        marginLeft: 0
                    }]}>
                        {Strings.Notifications}
                    </Text>
                    <Switch
                        value={checked}
                        onValueChange={value => setChecked(value)}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('ChangePassword')}
                    style={[styles.blockView, {
                        justifyContent: "space-between"
                    }]}>
                    <Text style={[styles.blockTxt, {
                        marginLeft: 0
                    }]}>
                        {Strings.Change_Password}
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={black}
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('PrivacyPolicy')}
                    style={[styles.blockView, {
                        justifyContent: "space-between"
                    }]}>
                    <Text style={[styles.blockTxt, {
                        marginLeft: 0
                    }]}>
                        {Strings.Privacy_Policy}
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={black}
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('TermCondition')}
                    style={[styles.blockView, {
                        justifyContent: "space-between"
                    }]}>
                    <Text style={[styles.blockTxt, {
                        marginLeft: 0
                    }]}>
                        {Strings.Terms_Conditions}
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={black}
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('AboutUs')}
                    style={[styles.blockView, {
                        justifyContent: "space-between"
                    }]}>
                    <Text style={[styles.blockTxt, {
                        marginLeft: 0
                    }]}>
                        {Strings.About_Us}
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={black}
                        size={30}
                    />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Settings
