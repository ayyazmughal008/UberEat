import { Alert } from 'react-native'
export const AUTH_LOADING = "AUTH_LOADING";
export const POPUP = "POPUP";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const IS_FIRST = "IS_FIRST";
export const LOG_OUT = "LOG_OUT";
export const LOGIN_DATA = "LOGIN_DATA";
export const COUNTRY_NAME = "COUNTRY_NAME";
export const MAKE_FAV = "MAKE_FAV";
export const OTP = "OTP";
export const TOKEN = "TOKEN";
export const LANGUAGE = "LANGUAGE";


const baseUrl = 'http://108.61.209.20/api/',
    login = 'login',
    uploadImage = 'upload-image',
    privacyPolicy = 'privacy-policy',
    termsConditions = 'terms-conditions',
    aboutUs = 'about-us',
    updateProfile = 'update-profile',
    getResturants = 'get-resturants',
    addItem = 'add-item',
    getAddedItems = 'get-added-items',
    makeFavourite = 'make-favourite',
    getAvailableTimes = 'get-available-times',
    checkout = 'checkout',
    getFavourites = 'get-favourites',
    myBookings = 'my-bookings',
    userPassword = 'user-password',
    recentSearches = 'recent-searches',
    clearSearch = 'clear-search',
    getSocials = 'get-socials',
    sendEmail = 'send-email',
    changePassword = 'change-password',
    submitToken = 'submit-token',
    getNotifications = 'get-notifications',
    clearNotification = 'clear',
    getResturantsWithId = 'get-resturants-with-id',
    coming = 'coming',
    applyPromo = 'apply-promo',
    postReview = 'post-review',
    checkPopup = 'check-popup',
    getRanks = 'get-ranks',
    invite = 'invite',
    removeItem = 'remove-item',
    updateItem = 'update-item',
    getRanksResturants = 'get-ranks-resturants',
    getProvincesCities = 'get-provinces-cities',
    comingButton = 'coming-button',
    register = 'register';
const country_url = "https://countriesnow.space/api/v0.1/countries/positions"

export const dispatchFunc = () => {
    return dispatch => {
        dispatch({ type: POPUP, payload: false })
    }
}
export const setUserLanguage = (value) => {
    return dispatch => {
        dispatch({
            type: LANGUAGE,
            payload: {
                language: value
            }
        })
    }
}

export const saveToken = (value) => {
    return dispatch => {
        dispatch({
            type: TOKEN,
            payload: {
                token: value
            }
        })
    }
}
export const dispatchFuncOn = () => {
    return dispatch => {
        dispatch({ type: POPUP, payload: true })
    }
}
export const dispatchErrorMessage = (value) => {
    return dispatch => {
        dispatch({
            type: ERROR_MESSAGE,
            payload: {
                errorMessage: value
            }
        })
    }
}
export const logOut = () => {
    return dispatch => {
        dispatch({ type: LOG_OUT })
    }
}
export const isFirstTime = (value) => {
    return dispatch => {
        dispatch({
            type: IS_FIRST,
            payload: {
                isFirst: value
            }
        })
    }
}
export const userLogin = (email, password) => {
    return dispatch => {
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(baseUrl + login, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(json)
                if (json.status == 200) {
                    dispatch({
                        type: LOGIN_DATA,
                        payload: {
                            login: json
                        }
                    })
                } else if (json.status == 401) {
                    dispatch({ type: POPUP, payload: true });
                    dispatch({
                        type: ERROR_MESSAGE,
                        payload: {
                            errorMessage: json.message
                        }
                    });
                    //Alert.alert("", json.message)
                } else {
                    dispatch({ type: POPUP, payload: true });
                    dispatch({
                        type: ERROR_MESSAGE,
                        payload: {
                            errorMessage: json.message
                        }
                    });
                    //Alert.alert("", json.message)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
export const userRegister = async (name, email, password, phone) => {
    let api
    try {
        api = await fetch(baseUrl + register, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    //Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const uploadUserImage = (file, userId) => {
    return dispatch => {
        const body = new FormData();
        body.append('user_id', userId);
        body.append('image', file);
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(baseUrl + uploadImage, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: body
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(json)
                if (json.status == 200) {
                    dispatch({
                        type: LOGIN_DATA,
                        payload: {
                            login: json
                        }
                    })
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                } else {
                    Alert.alert("", json.message)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
export const userPrivacyPolicy = async (user_id) => {
    let api
    try {
        api = await fetch(baseUrl + privacyPolicy, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    //Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const userTermsCondition = async (user_id) => {
    let api
    try {
        api = await fetch(baseUrl + termsConditions, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    //Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const userAboutUs = async (user_id) => {
    let api
    try {
        api = await fetch(baseUrl + aboutUs, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    //Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getCountryName = () => {
    return dispatch => {
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(country_url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                //console.log(json)
                if (json.error == false) {
                    dispatch({
                        type: COUNTRY_NAME,
                        payload: {
                            countryData: json.data
                        }
                    })
                } else {
                    Alert.alert("", json.error)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
export const getAllRestaurant = async (user_id, country, city, date, total_person, type) => {
    console.log(user_id, country, city, date, total_person, type)
    let api
    try {
        api = await fetch(baseUrl + getResturants, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                country: country,
                city: city,
                date: date,
                total_person: total_person,
                type: type,
            })
        })
            .then(res => res.json())
            .then(json => {
                //console.log(json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const addUserItem = async (user_id, item_id, resturant_id, quantity) => {
    console.log(user_id, item_id, resturant_id, quantity)
    let api
    try {
        api = await fetch(baseUrl + addItem, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                item_id: item_id,
                resturant_id: resturant_id,
                quantity: quantity,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getUseraddUserItem = async (user_id, resturant_id) => {
    let api
    try {
        api = await fetch(baseUrl + getAddedItems, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                resturant_id: resturant_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const makeUserFavourite = (user_id, resturant_id) => {
    return dispatch => {
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(baseUrl + makeFavourite, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                resturant_id: resturant_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(json)
                if (json.status == 200) {
                    if (json.message === 'Maked it favourite successfully') {
                        dispatch({
                            type: MAKE_FAV,
                            payload: {
                                makeFav: 'Marked'
                            }
                        })
                    } else if (json.message === 'Removed from favourite list') {
                        dispatch({
                            type: MAKE_FAV,
                            payload: {
                                makeFav: 'UnMarked'
                            }
                        })
                    }
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                } else {
                    Alert.alert("", json.message)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
export const getTimes = async (resturant_id, date) => {
    let api
    try {
        api = await fetch(baseUrl + getAvailableTimes, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                resturant_id: resturant_id,
                date: date
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const userCheckOut = async (user_id, resturant_id, total_person, date, time) => {
    let api
    try {
        api = await fetch(baseUrl + checkout, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                resturant_id: resturant_id,
                total_person: total_person,
                date: date,
                time: time,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getUserFav = async (user_id) => {
    let api
    try {
        api = await fetch(baseUrl + getFavourites, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const updateUserInfo = (user_id, name, phone) => {
    return dispatch => {
        dispatch({ type: AUTH_LOADING, payload: true });
        fetch(baseUrl + updateProfile, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                name: name,
                phone: phone,
            })
        })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(json)
                if (json.status == 200) {
                    Alert.alert('Successful', 'User info has been updated')
                    dispatch({
                        type: LOGIN_DATA,
                        payload: {
                            login: json
                        }
                    })
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                } else {
                    Alert.alert("", json.message)
                }

            })
            .catch(error => {
                dispatch({ type: AUTH_LOADING, payload: false });
                console.log(error)
            })
    };
}
export const updatePassword = async (user_id, password, oldPassword) => {
    let api
    try {
        api = await fetch(baseUrl + userPassword, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                password: password,
                oldPassword: oldPassword,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status == 200) {
                    Alert.alert('', json.message)
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getBookings = async (user_id) => {
    let api
    try {
        api = await fetch(baseUrl + myBookings, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getRecentData = async (user_id) => {
    let api
    try {
        api = await fetch(baseUrl + recentSearches, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                //console.log('recentSearches ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getSocialData = async (user_id) => {
    let api
    try {
        api = await fetch(baseUrl + getSocials, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('getSocials ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const sendUserEmail = async (email) => {
    let api
    try {
        api = await fetch(baseUrl + sendEmail, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('getSocials ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const changeUserPassword = async (user_id, password) => {
    let api
    try {
        api = await fetch(baseUrl + changePassword, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                password: password,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('getSocials ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const clearAllSearches = async (user_id) => {
    console.log(user_id)
    let api
    try {
        api = await fetch(baseUrl + clearSearch, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('delete response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const updateUserToken = async (user_id, fcm) => {
    console.log('--------->',fcm)
    let api
    try {
        api = await fetch(baseUrl + submitToken, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                fcm: fcm,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('token updated response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getUserNotification = async (user_id) => {
    let api
    try {
        api = await fetch(baseUrl + getNotifications, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('Notification response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const deleteNotification = async (user_id) => {
    let api
    try {
        api = await fetch(baseUrl + clearNotification, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('Notification response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const confirmComing = async (booking_id) => {
    let api
    try {
        api = await fetch(baseUrl + coming, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                booking_id: booking_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('Notification response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const updateRecentSearch = async (recentSearchId, user_id, date) => {
    console.log(recentSearchId, user_id, date)
    let api
    try {
        api = await fetch(baseUrl + getResturantsWithId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                recentSearchId: recentSearchId,
                user_id: user_id,
                date: date
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('Notification response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const updateUserFeedback = async (user_id, resturant_id, booking_id, stars, comment) => {
    let api
    try {
        api = await fetch(baseUrl + postReview, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                resturant_id: resturant_id,
                booking_id: booking_id,
                stars: stars,
                comment: comment
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('Notification response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const checkPopUps = async (user_id) => {
    let api
    try {
        api = await fetch(baseUrl + checkPopup, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('Notification response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getRanksData = async (user_id, resturantsIds) => {
    console.log(resturantsIds)
    let api
    try {
        api = await fetch(baseUrl + getRanks, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                resturantsIds: resturantsIds
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('updated ranks response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    //Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("ranks error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const applyCoupanCode = async (user_id, promo) => {
    let api
    try {
        api = await fetch(baseUrl + applyPromo, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                promo: promo
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('ranks response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("ranks error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const inviteFriends = async (user_id) => {
    let api
    try {
        api = await fetch(baseUrl + invite, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('ranks response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("ranks error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getAllCities = async () => {
    let api
    try {
        api = await fetch(baseUrl + getProvincesCities, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(json => {
                console.log('ranks response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("ranks error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}
export const getCitiesResturants = async (user_id, cities) => {
    let api
    try {
        api = await fetch(baseUrl + getRanksResturants, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                cities: cities
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('ranks response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("ranks error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}

export const deleteItems = async (user_id, order_id) => {
    let api
    try {
        api = await fetch(baseUrl + removeItem, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                order_id: order_id
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('ranks response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("ranks error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}

export const updateUserItem = async (user_id, item_id, resturant_id, quantity, order_id) => {
    console.log(user_id, item_id, resturant_id, quantity, order_id)
    let api
    try {
        api = await fetch(baseUrl + updateItem, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                order_id: order_id,
                item_id: item_id,
                resturant_id: resturant_id,
                quantity: quantity,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("response error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}

export const checkComingBtn = async (booking_id) => {
    let api
    try {
        api = await fetch(baseUrl + comingButton, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                booking_id: booking_id,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('ranks response ===>', json)
                if (json.status == 200) {
                    return json
                } else if (json.status == 401) {
                    Alert.alert("", json.message)
                    return json
                }
            })
            .catch(error => {
                console.log("ranks error ===>", error)
            })
    } catch (error) {
        console.log('my error' + error.message);
    }
    return api
}