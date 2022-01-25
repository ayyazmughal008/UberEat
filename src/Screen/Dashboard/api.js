const mapToken = 'AIzaSyDLzsRGQF1FIOQZgBWQv1EgMUoC2DZuMNg';
//const mapToken = 'AIzaSyDLzsRGQF1FI0QZgBWQv1EgMUoC2DZuMNg';

export const apis = {
  // Google service
  findPlaceFromLatLng: `https://maps.googleapis.com/maps/api/geocode/json?latlng={{latlng}}&location_type=ROOFTOP&result_type=street_address&key=${mapToken}&language=en`,
  //findPlaceFromLatLng: `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${HERE_API_KEY}&mode=retrieveAddresses&prox=${latitude},${longitude}`,
};