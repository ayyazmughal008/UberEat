import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native'
import { styles } from '../../Stylesheet'
import FastImage from 'react-native-fast-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { black, darkBlue, lightGrey, white } from '../../Colors'


const Table = (props) => {
    const [tableNo, setTableNo] = useState(null)
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <FastImage
                    source={require('../../Images/dish1.jpg')}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.banner}
                >
                    <View style={{ width: "100%", height: "100%", backgroundColor: 'rgba(0,0,0,0.9)', opacity: 0.7 }} />
                    <FastImage
                        source={require('../../Images/grill.jpg')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.sticker}
                    />
                </FastImage>
                <View style={styles.dashboardMainView}>
                    <Text style={[styles.findTxt, {
                        textAlign: "left",
                        fontFamily: "Montserrat-SemiBold",
                        fontSize: widthPercentageToDP(5),
                        marginTop: heightPercentageToDP(3)
                    }]}>
                        {"Select Available Table"}
                    </Text>

                    <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", marginTop: heightPercentageToDP(2) }}>
                        <TouchableOpacity
                            onPress={() => setTableNo(0)}
                            style={[styles.rectangle, {
                                marginRight: widthPercentageToDP(2),
                                backgroundColor: tableNo == 0 ? darkBlue : white
                            }]}>
                            <FastImage
                                source={require('../../Images/Table.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{
                                    width: "68%",
                                    height: "50%"
                                }}
                                tintColor={tableNo == 0 ? white : black}
                            />
                            <Text style={[styles.findTxt, {
                                textAlign: "center",
                                fontFamily: "Montserrat-SemiBold",
                                fontSize: widthPercentageToDP(5),
                                marginTop: heightPercentageToDP(2),
                                color: tableNo == 0 ? white : black
                            }]}>
                                {"7:30 PM"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setTableNo(1)}
                            style={[styles.rectangle, {
                                marginLeft: widthPercentageToDP(2),
                                backgroundColor: tableNo == 1 ? darkBlue : white
                            }]}>
                            <FastImage
                                source={require('../../Images/Table.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{
                                    width: "68%",
                                    height: "50%"
                                }}
                                tintColor={tableNo == 1 ? white : black}
                            />
                            <Text style={[styles.findTxt, {
                                textAlign: "center",
                                fontFamily: "Montserrat-SemiBold",
                                fontSize: widthPercentageToDP(5),
                                marginTop: heightPercentageToDP(2),
                                color: tableNo == 1 ? white : black
                            }]}>
                                {"8:00 PM"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", marginTop: heightPercentageToDP(2) }}>
                        <TouchableOpacity
                            onPress={() => setTableNo(2)}
                            style={[styles.rectangle, {
                                marginRight: widthPercentageToDP(2),
                                backgroundColor: tableNo == 2 ? darkBlue : white
                            }]}>
                            <FastImage
                                source={require('../../Images/Table.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{
                                    width: "68%",
                                    height: "50%"
                                }}
                                tintColor={tableNo == 2 ? white : black}
                            />
                            <Text style={[styles.findTxt, {
                                textAlign: "center",
                                fontFamily: "Montserrat-SemiBold",
                                fontSize: widthPercentageToDP(5),
                                marginTop: heightPercentageToDP(2),
                                color: tableNo == 2 ? white : black
                            }]}>
                                {"9:00 PM"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setTableNo(3)}
                            style={[styles.rectangle, {
                                marginLeft: widthPercentageToDP(2),
                                backgroundColor: tableNo == 3 ? darkBlue : white
                            }]}>
                            <FastImage
                                source={require('../../Images/Table.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{
                                    width: "68%",
                                    height: "50%"
                                }}
                                tintColor={tableNo == 3 ? white : black}
                            />
                            <Text style={[styles.findTxt, {
                                textAlign: "center",
                                fontFamily: "Montserrat-SemiBold",
                                fontSize: widthPercentageToDP(5),
                                marginTop: heightPercentageToDP(2),
                                color: tableNo == 3 ? white : black
                            }]}>
                                {"9:30 PM"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('OverView', {
                            type: "route"
                        })}
                        style={[styles.btn, {
                            marginBottom: heightPercentageToDP(2)
                        }]}>
                        <Text style={styles.btnTxt}>
                            {"Next"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Table