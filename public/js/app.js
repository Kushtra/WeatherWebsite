const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');
const day1 = document.querySelector('#day1');
const day2 = document.querySelector('#day2');
const day3 = document.querySelector('#day3');
const day4 = document.querySelector('#day4');
const day5 = document.querySelector('#day5');
const day6 = document.querySelector('#day6');

const punch = "'";

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading weather...';
  messageTwo.textContent = '';
  day1.textContent = '';
  day2.textContent = '';
  day3.textContent = '';
  day4.textContent = '';
  day5.textContent = '';
  day6.textContent = '';

  fetch('/weather?adress=' + encodeURI(location)).then((res) => {
    res.json().then((data) => {
      if(data.error){
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = ('Temperature in ' + data.location + ' is ' + data.temperature + '°C.');
        messageTwo.textContent = data.summary;
        day1.textContent = ('Tomorrow' + punch + 's highest temperature is ' + data.week[0].temperatureHigh + '°C and lowest is ' + data.week[0].temperatureLow + '°C. ' + data.week[0].summary);
        day2.textContent = (data.weekName[0] + punch + 's highest temperature is ' + data.week[1].temperatureHigh + '°C and lowest is ' + data.week[1].temperatureLow + '°C. ' + data.week[1].summary);
        day3.textContent = (data.weekName[1] + punch + 's highest temperature is ' + data.week[2].temperatureHigh + '°C and lowest is ' + data.week[2].temperatureLow + '°C. ' + data.week[2].summary);
        day4.textContent = (data.weekName[2] + punch + 's highest temperature is ' + data.week[3].temperatureHigh + '°C and lowest is ' + data.week[3].temperatureLow + '°C. ' + data.week[3].summary);
        day5.textContent = (data.weekName[3] + punch + 's highest temperature is ' + data.week[4].temperatureHigh + '°C and lowest is ' + data.week[4].temperatureLow + '°C. ' + data.week[4].summary);
        day6.textContent = (data.weekName[4] + punch + 's highest temperature is ' + data.week[5].temperatureHigh + '°C and lowest is ' + data.week[5].temperatureLow + '°C. ' + data.week[5].summary);
      }
    });
  });
});
