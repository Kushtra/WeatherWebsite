const forecast = require('./utils/whether');
const geolocation = require('./utils/geocode');
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

//app = express     get = type (moze bit put get delete)

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
//start
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
    forecast(latitude, longitude, (error, {temperature, summary}) => {
      if(error){
        return res.send({error});
      }
      res.send({
        location,
        temperature,
        summary
      });
    });
  });
});

/* app.get('/json', (req, res) => {
  res.send([{
    name: 'Owner',
    age: 20
  },{
    name: 'Co-owner',
    age: 21
  }]);
}); */

app.get('*', (req, res) => {
  res.render('404', {
    title: 'ERROR'
  });
});

app.listen(port, () => {
  console.log('Server started at port ' + port + '!');
});
