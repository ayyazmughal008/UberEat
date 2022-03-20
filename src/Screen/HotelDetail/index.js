import React, { useEffect } from 'react'
import useState from 'react-usestateref'
import { View, Text, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native'
import { styles } from '../../Stylesheet'
import FastImage from 'react-native-fast-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import StarRating from 'react-native-star-rating';
import { black, darkBlue, lightGrey, white } from '../../Colors'
import Toggle from '../../Component/Toggle'
import Items from '../../Component/Items'
import Review from '../../Component/Review'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { addUserItem, getUseraddUserItem, makeUserFavourite, deleteItems, updateUserItem } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';
import Strings from '../../Translation'

const HotelDetail = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const makeFav = useSelector((state) => state.user.makeFav);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [toggleValue, setToggleValue] = useState(1);
    const [activeIndex, setIndex] = useState(0)
    const [isPop, setPop] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')
    const [isFav, setFav] = useState('')
    const [counter, setCounter, counterRef] = useState(1)
    const [itemId, setItemId, itemIdRef] = useState('')
    const [quantity, setQuantity, quantityRef] = useState('')

    const contacts = props.route.params.contacts
    const [menu, setMenu] = useState(props.route.params.menu)
    const name = props.route.params.name
    const large_image = props.route.params.large_image
    const small_image = props.route.params.small_image
    const country = props.route.params.country
    const city = props.route.params.city
    const id = props.route.params.id
    const rating = props.route.params.rating
    const total_person = props.route.params.total_person
    const date = props.route.params.date


    useEffect(() => {
        const tempArr = [...menu]
        for (let i = 0; i < tempArr.length; i++) {
            for (let j = 0; j < tempArr[i].associated_items.length; j++) {
                tempArr[i].associated_items[j].quantity = 1
            }
        }
        setMenu(tempArr)
    }, [])

    // useEffect(() => {
    //     dispatch(makeUserFavourite(login.data.id, id))
    // }, [])
    // useEffect(()=>{
    //     console.log('is favorite', makeFav)
    // },[makeFav])

    const _updateCounter = (index, type) => {
        if (type === 'plus') {
            setCounter(counter + 1)
            _updateQuantity(index)
        } else if (type === 'minus') {
            if (counter == 1) {
                return
            } else {
                setCounter(counter - 1)
                _updateQuantity(index)
            }
        }
    }

    const _updateQuantity = (index) => {
        const tempArr = [...menu]
        for (let i = 0; i < tempArr.length; i++) {
            for (let j = 0; j < tempArr[i].associated_items.length; j++) {
                if (j == index) {
                    tempArr[activeIndex].associated_items[index].quantity = counterRef.current
                }
            }
        }
        setMenu(tempArr)
        console.log(JSON.stringify(menu))
    }

    const addItemApi = async (item_id, rest_id, quantity) => {
        setLoading(true)
        const result = await addUserItem(login.data.id, item_id, rest_id, quantity)
        await setResponse(result)
        await setLoading(false)
        if (result.status == 200) {
            setPop(true)
        }
    }

    const removeItems = async (orderId, item_id, quantity) => {
        setLoading(true)
        const result = await deleteItems(login.data.id, orderId)
        await setLoading(false)
        if (result.status == 200) {
            updateApi(item_id, id, quantity)
        }
    }

    const updateApi = async () => {
        setLoading(true)
        const result = await getUseraddUserItem(login.data.id, id)
        await setResponse(result)
        await setLoading(false)
        if (!result.items_array.length) {
            setPop(false)
        }
    }




    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <FastImage
                    source={{ uri: 'http://108.61.209.20/' + large_image }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.banner}
                >
                    <View style={{ width: "100%", height: "100%", backgroundColor: 'rgba(0,0,0,0.9)', opacity: 0.7 }} />
                    <FastImage
                        source={{ uri: 'http://108.61.209.20/' + small_image }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.sticker}
                    />
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: "5%",
                            bottom: "10%"
                        }}
                        onPress={() => dispatch(makeUserFavourite(
                            login.data.id,
                            id
                        ))}
                    >
                        <FastImage
                            source={
                                !makeFav ? require('../../Images/heart_white.png')
                                    : makeFav === 'UnMarked' ? require('../../Images/heart_white.png')
                                        : makeFav === 'Marked' ? require('../../Images/heart.png')
                                            : require('../../Images/heart_white.png')
                            }
                            resizeMode={FastImage.resizeMode.cover}
                            style={[styles.vectorIcon, {
                                width: widthPercentageToDP(13),
                                height: widthPercentageToDP(13)
                            }]}
                        />
                    </TouchableOpacity>
                </FastImage>
                <Text style={[styles.findTxt, {
                    textAlign: "center",
                    fontFamily: "Montserrat-SemiBold",
                    fontSize: widthPercentageToDP(6),
                    marginTop: heightPercentageToDP(4)
                }]}>
                    {name}
                </Text>
                <View style={{ alignSelf: "center", marginTop: heightPercentageToDP(2) }}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        emptyStarColor={lightGrey}
                        fullStarColor={darkBlue}
                        rating={rating}
                        starSize={30}
                        containerStyle={{ width: "40%", marginLeft: 10 }}
                    //selectedStar={(rating) => setStars(rating)}
                    />
                </View>
                <View style={{ alignSelf: "center", marginTop: heightPercentageToDP(4), width: widthPercentageToDP(95) }}>
                    <Toggle
                        selectionMode={1}
                        roundCorner={true}
                        option1={Strings.Menu}
                        option2={Strings.Contact}
                        onSelectSwitch={(newState) => setToggleValue(newState)}
                        selectionColor={darkBlue}
                    />
                </View>
                {toggleValue == 1 ?
                    <View style={styles.dashboardMainView}>
                        <Text style={[styles.findTxt, {
                            textAlign: "left",
                            fontFamily: "Montserrat-SemiBold",
                            fontSize: widthPercentageToDP(5),
                            marginTop: heightPercentageToDP(5)
                        }]}>
                            {Strings.Categories}
                        </Text>
                        <FlatList
                            data={menu}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ marginTop: heightPercentageToDP(5), }}
                            keyExtractor={(item, index) => 'key' + index}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => setIndex(index)}
                                    style={{
                                        width: widthPercentageToDP(32),
                                        height: heightPercentageToDP(22),
                                        marginRight: widthPercentageToDP(2),
                                        borderWidth: activeIndex == index ? 5 : 0,
                                        borderColor: darkBlue,
                                        borderRadius: widthPercentageToDP(2)
                                    }}
                                >
                                    <FastImage
                                        source={{ uri: 'http://108.61.209.20/' + item.image }}
                                        resizeMode={FastImage.resizeMode.cover}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: widthPercentageToDP(2)
                                        }}
                                    >
                                        <Text style={[styles.findTxt, {
                                            textAlign: "center",
                                            fontFamily: "Montserrat-SemiBold",
                                            fontSize: widthPercentageToDP(5),
                                            color: white
                                        }]}>
                                            {item.category_name}
                                        </Text>
                                    </FastImage>
                                </TouchableOpacity>
                            )}
                        />
                        <Text style={[styles.findTxt, {
                            textAlign: "left",
                            fontFamily: "Montserrat-SemiBold",
                            fontSize: widthPercentageToDP(5),
                            marginTop: heightPercentageToDP(5)
                        }]}>
                            {Strings.Items}
                        </Text>
                        <FlatList
                            data={menu[activeIndex].associated_items}
                            numColumns={2}
                            //contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
                            style={{ marginTop: heightPercentageToDP(3), }}
                            keyExtractor={(item, index) => 'key' + index}
                            renderItem={({ item, index }) => (
                                <Items
                                    dishImg={'http://108.61.209.20/' + item.image}
                                    title={item.name}
                                    clickHandler={() => {
                                        setItemId(item.id);
                                        setQuantity(item.quantity);
                                        addItemApi(item.id, id, item.quantity);
                                        //setPop(true)
                                    }}
                                    price={item.price}
                                    plusClick={() => {
                                        _updateCounter(index, 'plus')
                                    }}
                                    minusClick={() => {
                                        _updateCounter(index, 'minus')
                                    }}
                                    quantity={item.quantity}
                                />
                            )}
                        />
                        {isPop &&
                            <Modal
                                animationType="slide"
                                visible={isPop}
                                transparent={true}
                                onRequestClose={() => console.log('modal close')}
                            >
                                <View style={styles.modalView}>
                                    <View style={styles.modalBottom3}>
                                        <TouchableOpacity onPress={() => setPop(false)} >
                                            <View style={styles.line} />
                                        </TouchableOpacity>
                                        {!response || !response.items_array.length ?
                                            <View />
                                            : <FlatList
                                                data={response.items_array}
                                                contentContainerStyle={{ flexGrow: 1 }}
                                                style={{
                                                    width: widthPercentageToDP(100),
                                                    height: heightPercentageToDP(50),
                                                    marginBottom: heightPercentageToDP(16)
                                                }}
                                                keyExtractor={(item, index) => 'key' + index}
                                                renderItem={({ item, index }) => (
                                                    <View style={styles.row2}>
                                                        <View style={{
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            width: "85%",
                                                            justifyContent: "space-between"
                                                        }}>
                                                            <Text style={styles.priceTxt}>
                                                                {item.item}
                                                            </Text>
                                                            <Text style={styles.price}>
                                                                {item.price}
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity
                                                            activeOpacity={0.6}
                                                            onPress={() => {
                                                                removeItems(
                                                                    item.order_id,
                                                                    itemIdRef.current,
                                                                    quantityRef.current
                                                                )
                                                            }}>
                                                            <AntDesign
                                                                name="delete"
                                                                color={darkBlue}
                                                                size={25}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            />
                                        }
                                        <View style={{
                                            width: "100%",
                                            height: heightPercentageToDP(15),
                                            position: "absolute",
                                            bottom: "2%",
                                            justifyContent: "center"
                                            //zIndex: 3
                                        }}>
                                            <View style={styles.row2}>
                                                <Text style={[styles.priceTxt, {
                                                    fontSize: widthPercentageToDP(5)
                                                }]}>
                                                    {Strings.Total_Price}
                                                </Text>
                                                <Text style={[styles.price, {
                                                    fontSize: widthPercentageToDP(5),
                                                    color: darkBlue
                                                }]}>
                                                    {response.total_price}
                                                </Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setPop(false),
                                                        props.navigation.navigate('Table', {
                                                            //data: result,
                                                            large_image: large_image,
                                                            small_image: small_image,
                                                            rest_id: id,
                                                            total_person: total_person,
                                                            date: date,
                                                        })
                                                }}
                                                style={[styles.btn, {
                                                    marginTop: heightPercentageToDP(2)
                                                }]}>
                                                <Text style={styles.btnTxt}>
                                                    {Strings.Book_Now}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>
                            </Modal>
                        }
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('Table', {
                                    //data: result,
                                    large_image: large_image,
                                    small_image: small_image,
                                    rest_id: id,
                                    total_person: total_person,
                                    date: date,
                                })
                            }}
                            style={[styles.btn, {
                                marginBottom: heightPercentageToDP(2)
                            }]}>
                            <Text style={styles.btnTxt}>
                                {Strings.Book_Now}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    : <View style={[styles.dashboardMainView, {
                        marginTop: heightPercentageToDP(6)
                    }]}>
                        <View style={styles.row}>
                            <FastImage
                                source={require('../../Images/Location2.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.vectorIcon}
                            />
                            <Text style={styles.mediumText}>
                                {contacts.address}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <FastImage
                                source={require('../../Images/number2.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.vectorIcon}
                            />
                            <Text style={styles.mediumText}>
                                {contacts.phone}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <FastImage
                                source={require('../../Images/mail2.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.vectorIcon}
                            />
                            <Text style={styles.mediumText}>
                                {contacts.email}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <FastImage
                                source={require('../../Images/Time2.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.vectorIcon}
                            />
                            <Text style={styles.mediumText}>
                                {contacts.open_close_time}
                            </Text>
                        </View>
                        <Text style={styles.title}>
                            {Strings.about_us}
                        </Text>
                        <Text style={[styles.mediumText, {
                            marginLeft: 0,
                            marginTop: heightPercentageToDP(3)
                        }]}>
                            {contacts.about}
                        </Text>
                        <Text style={[styles.title, {
                            marginBottom: heightPercentageToDP(1)
                        }]}>
                            {Strings.Reviews}
                        </Text>

                        {!contacts.reviews.length ?
                            <View />
                            : <FlatList
                                data={contacts.reviews}
                                style={{ marginTop: heightPercentageToDP(3), }}
                                keyExtractor={(item, index) => 'key' + index}
                                renderItem={({ item, index }) => (
                                    <Review
                                        profile={item.roundImg}
                                        name={item.name}
                                        dateTime={item.dateTime}
                                        review={item.review}
                                    />
                                )}
                            />}

                    </View>
                }
                {isLoading &&
                    <ActivityIndicator
                        size="large"
                        color={darkBlue}
                        style={styles.loading}
                    />
                }
                {AuthLoading &&
                    <ActivityIndicator
                        size="large"
                        color={darkBlue}
                        style={styles.loading}
                    />
                }
            </KeyboardAwareScrollView>

        </View>
    )
}

export default HotelDetail;