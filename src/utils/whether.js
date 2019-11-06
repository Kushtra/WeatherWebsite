const request = require('request');

const whether = (longitude, latitude, callback) => {
  const url = 'https://api.darksky.net/forecast/c03d51f505a9164fc0d86adffdb082f1/'+ encodeURI(longitude) +','+ encodeURI(latitude) +'?units=si'
//&lang=hr

  request({ url, json: true}, (err, {body}) => {
    if(err) {
      callback('Unable to connecto to whether api, check your internet connection!', undefined);
    } else if(body.error) {
      callback('Unable to fetch whether for those coordinates, try again!', undefined);
    } else {
      callback(undefined, {
        temperature: body.currently.temperature,
        summary: body.hourly.summary,
        day1sum: body.daily.data[1].summary,
        day1max: body.daily.data[1].temperatureHigh,
        day1min: body.daily.data[1].temperatureLow,
        day2sum: body.daily.data[2].summary,
        day2max: body.daily.data[2].temperatureHigh,
        day2min: body.daily.data[2].temperatureLow,
        day3sum: body.daily.data[3].summary,
        day3max: body.daily.data[3].temperatureHigh,
        day3min: body.daily.data[3].temperatureLow,
        day4sum: body.daily.data[4].summary,
        day4max: body.daily.data[4].temperatureHigh,
        day4min: body.daily.data[4].temperatureLow,
        day5sum: body.daily.data[5].summary,
        day5max: body.daily.data[5].temperatureHigh,
        day5min: body.daily.data[5].temperatureLow,
        day6sum: body.daily.data[6].summary,
        day6max: body.daily.data[6].temperatureHigh,
        day6min: body.daily.data[6].temperatureLow,
      });
    }
  });
}

module.exports = whether;
