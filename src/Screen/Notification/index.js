import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator, Modal, FlatList } from 'react-native'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import Item from '../../Component/NotificationItems'
import { data } from './data'
import { Header } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Notification = (props) => {
    return (
        <SafeAreaView style={styles.container}>
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
                    text: "NOTIFICATIONS", style: {
                        color: black,
                        fontSize: widthPercentageToDP(4),
                        fontFamily: "Montserrat-Bold",
                    }
                }}
                containerStyle={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 0,
                    paddingTop:0
                    //height: heightPercentageToDP(17)
                }}
                statusBarProps={{
                    backgroundColor: white
                }}
                barStyle="dark-content"
            />

            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                //style={styles.flatStyle}
                enableEmptySections={true}
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <Item
                        date={item.date}
                        index={index}
                        name={item.name}
                        detail={item.detail}
                        data={item.dataItem}
                    />
                )}
            />

        </SafeAreaView>
    )
}

export default Notification