const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getName = (x) => {
  if(x > 6){
    y = x - 7;
  }else {
    y = x;
  }
  return days[y];
}

module.exports = getName;
