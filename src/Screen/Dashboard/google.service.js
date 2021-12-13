// import axios from 'axios';
import { apis } from './api';

// export const findPlaceFromLatLng = latlng => axios({
//   url: apis.findPlaceFromLatLng.replace('{{latlng}}', latlng),
//   method: 'GET',
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//   },
// });

export const findPlaceFromLatLng = (latlng) => {
  let api
  try {
    api = fetch(apis.findPlaceFromLatLng.replace('{{latlng}}', latlng), {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        // 'Accept': 'application/json',
        // "Content-type": "application/json",
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        return json
      })
      .catch(error => {
        console.log("response error ===>", error)
      })
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api
}