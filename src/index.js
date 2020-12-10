const form = document.querySelector('.top-banner form');
const input = document.querySelector('.top-banner input');
const msg = document.querySelector('.top-banner .msg');
const list = document.querySelector('.ajax-section .cities');

const apiKey = '12bc13a5cc15a08bf549fe4d82d0f372';

form.addEventListener('submit', e => {
  e.preventDefault();
  let inputVal = input.value;
  const listItems = list.querySelectorAll('.ajax-section .city');
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = '';
      if (inputVal.includes(',')) {
        if (inputVal.split(',')[1].length > 2) {
          inputVal = inputVal.split(',')[0];// eslint-disable-line
          content = el
            .querySelector('.city-name span')
            .textContent.toLowerCase();
        } else {
          content = el.querySelector('.city-name').dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector('.city-name span').textContent.toLowerCase();
      }
      return content === inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector('.city-name span').textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  const celciusToFaren = (celcius) => ((celcius * 9) / 5 + 32).toFixed(2);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const {
        main, name, sys, weather,
      } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0].icon}.svg`;
      const li = document.createElement('li');
      li.classList.add('city');
      const markup = `
        <h1 class='city-name' data-name='${name},${sys.country}'>
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h1>
        <div class='city-temp'>${Math.round(main.temp)}<sup>°C</sup> / ${celciusToFaren(Math.round(main.temp))}<sup>°F</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
  weather[0].description
}">
          <figcaption>${weather[0].description}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = 'Please search for a valid city 😩';
    });

  msg.textContent = '';
  form.reset();
  input.focus();
});