import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, FlatList } from 'react-native'
import { styles } from '../../Stylesheet'
import Header from '../../Component/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { black, darkBlue, lightBlue, lightGrey, offWhite, white } from '../../Colors'
import { useDispatch, useSelector } from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import Toggle from 'react-native-toggle-element';
import FastImage from 'react-native-fast-image'
import { Input } from 'react-native-elements';
import { data } from './data'
import Rececnt from '../../Component/Recent'
import CustomSwitch from '../../Component/CustomSwitch'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

const Dashboard = (props) => {
    const [toggleValue, setToggleValue] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <Header
                userImg={require('../../Images/profile.png')}
                title={"MYHOOKAH"}
                iconName={"notifications-outline"}
            />
            <View style={styles.dashboardMainView}>
                <Text style={styles.greetingTxt}>
                    {"Hello John"}
                </Text>
                <Text style={styles.findTxt}>
                    {"Find Your Restaurant"}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, width: "100%" }}>
                    <FastImage
                        source={require('../../Images/Location.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.vectorIcon}
                    />
                    <Text style={[styles.greetingTxt, { marginTop: 0, marginLeft: widthPercentageToDP(3) }]}>
                        {"Berlin, Germany"}
                    </Text>
                </View>
                <View style={[styles.inputView, {
                    width: widthPercentageToDP(90)
                }]}>
                    <Input
                        placeholder="Search"
                        placeholderTextColor={lightGrey}
                        inputContainerStyle={{
                            borderBottomWidth: 0,
                        }}
                        leftIcon={{ type: 'ant-design', name: 'search1', color: lightGrey }}
                    />
                </View>
                <Text style={styles.searchTxt}>
                    {"Recent Search"}
                </Text>
                <FlatList
                    data={data}
                    horizontal
                    style={{ marginTop: heightPercentageToDP(2),  }}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={({ item }) => (
                        <Rececnt
                            dishImg={item.img}
                            title={item.country}
                            date={item.date}
                            adult={item.adult}
                        />
                    )}
                />
                <CustomSwitch
                    selectionMode={1}
                    roundCorner={true}
                    option1={'Search'}
                    option2={'Social'}
                    onSelectSwitch={(newState) => setToggleValue(newState)}
                    selectionColor={darkBlue}
                />
                <View style = {{height: heightPercentageToDP(4)}}/>

            </View>
        </SafeAreaView>
    )
}

export default Dashboard