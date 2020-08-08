const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');
const days = [];
days.push(document.querySelector('#day1'));
days.push(document.querySelector('#day2'));
days.push(document.querySelector('#day3'));
days.push(document.querySelector('#day4'));
days.push(document.querySelector('#day5'));
days.push(document.querySelector('#day6'));

const punch = "'";

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading weather...';
  messageTwo.textContent = '';
  days.forEach(day => {
    day.textContent = '';
  });

  fetch('/weather?adress=' + encodeURI(location)).then((res) => {
    res.json().then((data) => {
      if(data.error){
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = ('Temperature in ' + data.location + ' is ' + data.temperature + '°C.');
        messageTwo.textContent = data.summary;
        day1.textContent = ('Tomorrow' + punch + 's highest temperature is ' + data.week[0].temperatureHigh + '°C and lowest is ' + data.week[0].temperatureLow + '°C. ' + data.week[0].summary);
        for(let i=1;i<days.length;i++) {
          days[i].textContent = (data.weekName[i-1] + punch + 's highest temperature is ' + data.week[i].temperatureHigh + '°C and lowest is ' + data.week[i].temperatureLow + '°C. ' + data.week[i].summary);
        }
      }
    });
  });
});
