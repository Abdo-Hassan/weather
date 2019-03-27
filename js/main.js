window.addEventListener('load', () => {
	let long;
	let lat;
	let temperatureDesc = document.querySelector('.temperature-desc');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimeZone = document.querySelector('.location-timezone');
	let degreeSection = document.querySelector('.degree-section');
	let temperatureSpan = document.querySelector('.degree-section span');

	if (navigator.geolocation) {
		// get my own position (coordinates) to fetch from it
		navigator.geolocation.getCurrentPosition((position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			// solve the CORS problem
			const proxy = 'https://cors-anywhere.herokuapp.com/';
			// the URL to fetch the weahther data from it
			const api = `${proxy}https://api.darksky.net/forecast/d96f10357e6009550c22c7568cac8979/${lat},${long}`;

			// fetch the data from my location coordinates
			fetch(api)
				.then((response) => response.json())
				.then((data) => {
					const {
						temperature,
						summary,
						icon
					} = data.currently;

					// set dom elements from api
					temperatureDegree.textContent = Math.floor(temperature);
					temperatureDesc.textContent = summary;
					locationTimeZone.textContent = data.timezone;
					// formula for F => C
					let celsuis = (temperature - 32) * (5 / 9);
					// set icon
					setIcons(icon, document.querySelector('.icon'));
					// change temperature to c /f 
					degreeSection.addEventListener('click', () => {
						if (temperatureSpan.textContent === 'F') {
							temperatureSpan.textContent = 'C';
							temperatureDegree.textContent = Math.floor(celsuis);;
						} else {
							temperatureSpan.textContent = 'F';
							temperatureDegree.textContent = Math.floor(temperature);
						}
					})
				});
		})
	} else {
		console.log('sorry your browser do not support the location feature');
	}

	function setIcons(icon, iconID) {
		// 1- create new skycons
		const skycons = new Skycons({
			color: "#fff"
		});
		// 2- get the current icon from api icon data
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		// 3- play the animation
		skycons.play();
		// 4- return the icon 
		return skycons.set(iconID, Skycons[currentIcon]);
	}
})