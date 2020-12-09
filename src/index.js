const key = 'd3df3c959b4f72c4bd5a6ba64d3cd298';
const formel = document.querySelector('form');
const details = document.querySelector('.details');

formel.addEventListener(submit, (e) => {
  e.preventDefault();
  details.innerHTML = '<h1>loading...</h1>'
  const location = e.target.location.value;
  weatherApp(location)
});

function weatherApp(location) {
  fetchAPI(location);
}

function fetchAPI(location) {
  const baseURL = `http://api.weatherstack.com/current?access_key=${key}&query=${location}`
  const res = fetch(baseURL);
  console.log(res)
}