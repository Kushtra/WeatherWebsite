const request = require('request');

const geocode = (locationName, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(locationName) +'.json?access_token=pk.eyJ1IjoiYXJpeHMiLCJhIjoiY2sybHAxN2tnMDhuNjNqb2ZnY3VrdTgwbyJ9.dSV3mhceDIO9Tare1D-88g&limit=1'

  request({ url, json: true}, (err, {body}) => {
    if(err) {
      callback('Unable to connect to mapbox api, check your internet connection!', undefined);
    } else if(body.features.length === 0) {
      callback('Unable to find a location, try again!', undefined);
    } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        });
    }
  });
}

module.exports = geocode;
