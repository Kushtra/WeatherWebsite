const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading weather...';
  messageTwo.textContent = '';

  fetch('http://localhost:3000/weather?adress=' + encodeURI(location)).then((res) => {
    res.json().then((data) => {
      if(data.error){
        messageOne.textContent = data.error;
        messageTwo.textContent = '';
      } else {
        messageOne.textContent = ('Temperature in ' + data.location + ' is ' + data.temperature + '°C.');
        messageTwo.textContent = data.summary;
      }
    });
  });
});
