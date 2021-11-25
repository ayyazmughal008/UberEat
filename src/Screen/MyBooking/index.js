import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import { Header } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toggle from '../../Component/Toggle'
import { data } from './data'
import Booking from '../../Component/Booking'

const MyBooking = (props) => {
    const [toggleValue, setToggleValue] = useState(1);

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
                    text: "MY BOOKINGS", style: {
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
            <View style={{ alignSelf: "center", marginTop: heightPercentageToDP(4), width: widthPercentageToDP(95) }}>
                <Toggle
                    selectionMode={1}
                    roundCorner={true}
                    option1={'Upcoming'}
                    option2={'Previous'}
                    onSelectSwitch={(newState) => setToggleValue(newState)}
                    selectionColor={darkBlue}
                />
            </View>
            <FlatList
                data={toggleValue == 1 ? data.upcoming : data.previous}
                style={{ marginTop: heightPercentageToDP(5) }}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item }) => (
                    <Booking
                        clickHandler={() => props.navigation.navigate('OverView', {
                            type: 'checking'
                        })}
                        name={item.name}
                        image={item.image}
                    />
                )}
            />
        </View>
    )
}

export default MyBooking