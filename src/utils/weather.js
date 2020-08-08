const request = require('request');

const weather = (longitude, latitude, callback) => {
  const url = 'https://api.darksky.net/forecast/c03d51f505a9164fc0d86adffdb082f1/'+ encodeURI(longitude) +','+ encodeURI(latitude) +'?units=si'

  request({ url, json: true}, (err, {body}) => {
    if(err) {
      callback('Unable to connecto to whether api, check your internet connection!', undefined);
    } else if(body.error) {
      callback('Unable to fetch whether for those coordinates, try again!', undefined);
    } else {
      callback(undefined, {
        temperature: body.currently.temperature,
        summary: body.hourly.summary,
        week: body.daily.data
      });
    }
  });
}

module.exports = weather;
