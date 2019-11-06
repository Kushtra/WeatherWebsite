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
        day1.textContent = ('Tomorrow' + punch + 's highest temperature is ' + data.day1max + '°C and lowest is ' + data.day1min + '°C. ' + data.day1sum);
        day2.textContent = (data.day2name + punch + 's highest temperature is ' + data.day2max + '°C and lowest is ' + data.day2min + '°C. ' + data.day2sum);
        day3.textContent = (data.day3name + punch + 's highest temperature is ' + data.day3max + '°C and lowest is ' + data.day3min + '°C. ' + data.day3sum);
        day4.textContent = (data.day4name + punch + 's highest temperature is ' + data.day4max + '°C and lowest is ' + data.day4min + '°C. ' + data.day4sum);
        day5.textContent = (data.day5name + punch + 's highest temperature is ' + data.day5max + '°C and lowest is ' + data.day5min + '°C. ' + data.day5sum);
        day6.textContent = (data.day6name + punch + 's highest temperature is ' + data.day6max + '°C and lowest is ' + data.day6min + '°C. ' + data.day6sum);
      }
    });
  });
});
