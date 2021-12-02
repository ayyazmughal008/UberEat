import { Alert } from 'react-native'
export const AUTH_LOADING = "AUTH_LOADING";
export const IS_FIRST = "IS_FIRST";
export const LOGIN_DATA = "LOGIN_DATA";


const baseUrl = 'http://108.61.209.20/api/',
    login = 'login',
    uploadImage = 'upload-image',
    privacyPolicy = 'privacy-policy',
    termsConditions = 'terms-conditions',
    aboutUs = 'about-us',
    register = 'register';

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