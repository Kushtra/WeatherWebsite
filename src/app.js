const forecast = require('./utils/whether');
const geolocation = require('./utils/geocode');
const days = require('./utils/weekday');
const express = require('express');
const path = require('path');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
const app = express();

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    someone: 'Me'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'Is this text helping?'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.adress){
    return res.send({
      error: 'No adress!'
    });
  }

  geolocation(req.query.adress, (error, {longitude, latitude, location} = {}) => {
    if(error){
      return res.send({error});
    }
    forecast(latitude, longitude, (error, {temperature, summary, day1min, day1max, day1sum, day2min, day2max, day2sum, day3min, day3max, day3sum, day4min, day4max, day4sum, day5min, day5max, day5sum, day6min, day6max, day6sum, }) => {
      if(error){
        return res.send({error});
      }
      let datetime = new Date();
      const today = datetime.getDay();
      const day2name = days(today+2);
      const day3name = days(today+3);
      const day4name = days(today+4);
      const day5name = days(today+5);
      const day6name = days(today+6);
      res.send({
        location,
        temperature,
        summary,
        day1min,
        day1max,
        day1sum,
        day2name,
        day2min,
        day2max,
        day2sum,
        day3name,
        day3min,
        day3max,
        day3sum,
        day4name,
        day4min,
        day4max,
        day4sum,
        day5name,
        day5min,
        day5max,
        day5sum,
        day6name,
        day6min,
        day6max,
        day6sum
      });
    });
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'ERROR'
  });
});

app.listen(port, () => {
  console.log('Server started at port ' + port + '!');
});
