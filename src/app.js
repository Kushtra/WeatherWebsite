const forecast = require('./utils/weather');
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
    forecast(latitude, longitude, (error, {temperature, summary, week }) => {
      if(error){
        return res.send({error});
      }
      
      const weekName = [];
      const today = new Date().getDay();
      for(let i=2;i<7;i++){
        weekName.push(days(today+i));
      }
      res.send({
        location,
        temperature,
        summary,
        week,
        weekName
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
