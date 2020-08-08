const request = require('request');

const weather = (longitude, latitude, callback) => {
  const url = 'https://api.darksky.net/forecast/c03d51f505a9164fc0d86adffdb082f1/'+ encodeURI(longitude) +','+ encodeURI(latitude) +'?units=si'

  request({ url, json: true}, (err, {body}) => {
    if(err) {
      callback('Unable to connecto to whether api, check your internet connection!', undefined);
    } else if(body.error) {
      callback('Unable to fetch whether for those coordinates, try again!', undefined);
    }/* else {
      callback(undefined, {
        temperature: body.currently.temperature,
        summary: body.hourly.summary,
        day1sum: body.daily.data[0].summary,
        day1max: Math.round(body.daily.data[0].temperatureHigh),
        day1min: Math.round(body.daily.data[0].temperatureLow),
        day2sum: body.daily.data[1].summary,
        day2max: Math.round(body.daily.data[1].temperatureHigh),
        day2min: Math.round(body.daily.data[1].temperatureLow),
        day3sum: body.daily.data[2].summary,
        day3max: Math.round(body.daily.data[2].temperatureHigh),
        day3min: Math.round(body.daily.data[2].temperatureLow),
        day4sum: body.daily.data[3].summary,
        day4max: Math.round(body.daily.data[3].temperatureHigh),
        day4min: Math.round(body.daily.data[3].temperatureLow),
        day5sum: body.daily.data[4].summary,
        day5max: Math.round(body.daily.data[4].temperatureHigh),
        day5min: Math.round(body.daily.data[4].temperatureLow),
        day6sum: body.daily.data[5].summary,
        day6max: Math.round(body.daily.data[5].temperatureHigh),
        day6min: Math.round(body.daily.data[5].temperatureLow)
      });
    }*/ else {
      callback(undefined, {
        temperature: body.currently.temperature,
        summary: body.hourly.summary,
        week: body.daily.data
      });
    }
  });
}

module.exports = weather;
