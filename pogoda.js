
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

var apiKey = "56252fd0efbb4d05906e389b15db2ceb";

form.addEventListener("submit", e => {
  e.preventDefault();
  /* zatrzymanie przesyłania formularza, aby zapobiec ponownemu załadowaniu strony oraz aby przechwycić wartość z pola tekstowego */
  const listItems = list.querySelectorAll(".ajax-section .city");
  const inputVal = input.value;
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric&lang=pl`;
  /* metric - jednostki metryczne */

	fetch(url)
		.then(response => response.json())
		.then(data => {
		  const { main, name, sys, weather, wind } = data;
		  const icon = `https://openweathermap.org/img/wn/${
			weather[0]["icon"]
		}	@2x.png`;

		  const li = document.createElement("li");
		  li.classList.add("city");
		  const markup = `
			<h2 class="city-name" data-name="${name},${sys.country}">
			  <span>${name}</span>
			  <sup>${sys.country}</sup>
			</h2>
			<div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
			<figure>
			  <img class="city-icon" src="${icon}" alt="${
			weather[0]["description"]
		  }">
			  <figcaption>${weather[0]["description"]}</figcaption>
			</figure>
			<figure>
				<img class="city-icon-pressure" src='https://cdn-icons-png.flaticon.com/128/556/556958.png'>
				<figcaption> Ciśnienie: ${main.pressure} hPa</figcaption>
			</figure>
			<figure>
				<img class="city-icon-wind" src='https://cdn-icons-png.flaticon.com/128/2011/2011448.png'>
				<figcaption> Wiatr: ${Math.round(wind.speed*3.6)} km/h</figcaption>
			</figure>
		  `;
		  li.innerHTML = markup;
		  list.appendChild(li);
		})
		.catch(() => {
		  msg.textContent = "Nie znaleziono szukanego miasta :(";
		});

	  msg.textContent = "";
	  form.reset();
	  input.focus();
});