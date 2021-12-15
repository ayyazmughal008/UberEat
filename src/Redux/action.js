import { Alert } from 'react-native'
export const AUTH_LOADING = "AUTH_LOADING";
export const POPUP = "POPUP";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const IS_FIRST = "IS_FIRST";
export const LOG_OUT = "LOG_OUT";
export const LOGIN_DATA = "LOGIN_DATA";
export const COUNTRY_NAME = "COUNTRY_NAME";
export const MAKE_FAV = "MAKE_FAV";


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
    register = 'register';
const country_url = "https://countriesnow.space/api/v0.1/countries/positions"

export const dispatchFunc = () => {
    return dispatch => {
        dispatch({ type: POPUP, payload: false })
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
export const getTimes = async (resturant_id) => {
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