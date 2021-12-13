import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, white } from '../../Colors'
import { styles } from '../../Stylesheet'
import { Header } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { data } from './data'
import Items from '../../Component/FavouriteItems'
import { useDispatch, useSelector } from 'react-redux';
import { getUserFav } from '../../Redux/action'

const MyBooking = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [toggleValue, setToggleValue] = useState(1);
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')

    useEffect(() => {
        getFavApi()
    }, [])

    const getFavApi = async () => {
        setLoading(true)
        const result = await getUserFav(login.data.id)
        await setResponse(result)
        await setLoading(false)
    }



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
                    text: "FAVOURITES", style: {
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
            {!response || !response.data.length ?
                <View />
                : <FlatList
                    data={response.data}
                    style={{ marginTop: heightPercentageToDP(5) }}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={({ item }) => (
                        <Items
                            // clickHandler={() => props.navigation.navigate('OverView', {
                            //     type: 'checking'
                            // })}
                            name={item.name}
                            image={'http://108.61.209.20/' + item['small-image']}
                        />
                    )}
                />
            }
            {isLoading &&
                <ActivityIndicator
                    size="large"
                    color={darkBlue}
                    style={styles.loading}
                />
            }
        </View>
    )
}

export default MyBooking