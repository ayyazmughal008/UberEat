import { Alert } from 'react-native'
export const AUTH_LOADING = "AUTH_LOADING";


// export const getUpdateUser = (userID) => {
//     return dispatch => {
//         dispatch({ type: AUTH_LOADING, payload: true });
//         fetch(baseUrl + user, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 "Content-type": "application/json",
//             },
//             body: JSON.stringify({
//                 userId: userID,
//             })
//         })
//             .then(res => res.json())
//             .then(json => {
//                 dispatch({ type: AUTH_LOADING, payload: false });
//                 console.log(json)
//                 if (json.status == 200) {
//                     dispatch(getMainMenu(json.data.id))
//                     dispatch({
//                         type: USER_LOGIN,
//                         payload: {
//                             login: json
//                         }
//                     })
//                 } else if (json.status == 401) {
//                     Alert.alert("", json.message)
//                 } else {
//                     Alert.alert("", json.message)
//                 }

//             })
//             .catch(error => {
//                 dispatch({ type: AUTH_LOADING, payload: false });
//                 console.log(error)
//             })
//     };
// }