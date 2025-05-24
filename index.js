async function news(cat, loc) {

	const newsKey = '7c5e02b67c5949c58a5653c78adbecf1';

	const newsList = document.querySelector('.news-list');

	if (!cat) {

		url = `http://newsapi.org/v2/top-headlines?country=${loc}&pageSize=100&apiKey=${newsKey}`;

	} else {

		url = `http://newsapi.org/v2/top-headlines?country=${loc}&category=${cat}&pageSize=100&apiKey=${newsKey}`;

	}

	fetch(url).then(result=> {

		return result.json();

	}).then(data=> {

		if (data.totalResults > 0) {

			newsUrl = url;

		} else {

			if (!cat) {

				newsUrl = `http://newsapi.org/v2/top-headlines?category=general&pageSize=100&apiKey=${newsKey}`;

			} else {

				var newsUrl = `http://newsapi.org/v2/top-headlines?category=${cat}&pageSize=100&apiKey=${newsKey}`;

			}

		}

		fetch(newsUrl).then(result=> {

			return result.json();

		}).then(news=> {

			for (var i = 0; i < newsList.childNodes.length; i++) {

				newsList.removeChild(newsList.children[i]);

			}if (news.status == 'ok') {

				news.articles.forEach(article=> {

					let img = document.createElement('img');

					let main_info = document.createElement('div');

					let essay = document.createElement('a');

					let essay_item = document.createElement('li');

					let info = document.createElement('div');

					let title = document.createElement('div');

					let author = document.createElement('div');

					essay_item.setAttribute('class', 'article');

					essay.setAttribute('href', article.url);

					essay.setAttribute('target', '_blank');

					main_info.setAttribute('class', 'main-info');

					img.setAttribute('class', 'article-image');

					img.setAttribute('src', article.urlToImage);

					img.setAttribute('onerror', "this.onerror=null;this.src='https://cdn.iconscout.com/icon/free/png-256/free-news-1661516-1410317.png';");

					info.setAttribute('class', 'info');

					title.setAttribute('class', 'title');

					author.setAttribute('class', 'author');

					if (article.source.name !== null) {

						info.textContent = article.source.name;

						author.textContent = article.author;

					} else {

						info.textContent = article.author;

					}

					title.textContent = article.title;

					main_info.appendChild(info);

					main_info.appendChild(img);

					main_info.appendChild(title);

					essay.appendChild(main_info);

					essay.appendChild(author);

					essay_item.appendChild(essay)

					newsList.appendChild(essay_item);

				})} else {

				let error = document.createElement('div');

				let errorMessage = document.createElement('div');

				let errorImage = document.createElement('img');

				error.setAttribute('class', 'error');

				errorMessage.setAttribute('class', 'error-message');

				errorImage.setAttribute('class', 'error-image');

				errorImage.setAttribute('src', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3SsGbcnR5UPp72XP4N93d4qUwvsP2awnf-A&s")

				errorMessage.textContent = news.message;

				error.appendChild(errorImage);

				error.appendChild(errorMessage);

				newsList.appendChild(error);

			}

			console.log("Number of visible Articles: "+newsList.childNodes.length);

			console.log(news);

		})

	})

}

async function weather(lat, lon) {

	const weatherKey = '95309698a2291a49ea63b30477ece22b';

	const weatherWidget = document.querySelector('.weather-widget');

	weatherCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherKey}`;

	weatherForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${weatherKey}`;

	weatherWidget.setAttribute('href', `https://openweathermap.org/weathermap?basemap=map&cities=true&layer=radar&lat=${lat}&lon=${lon}&zoom=9`);

	fetch(weatherCurrent).then(result=> {

		return result.json();

	}).then(current=> {

		var temp = Math.round(current.main.temp);

		let weatherNow = document.createElement('div');

		let description = document.createElement('div');

		let weatherPack = document.createElement('div');

		let icon = document.createElement('img');

		let temperature = document.createElement('div');

		let humidity = document.createElement('div');

		let city_name = document.createElement('div');

		weatherNow.setAttribute('class',
			'weather');

		description.setAttribute('class',
			'weather-description');

		weatherPack.setAttribute('class',
			'weather-pack');

		icon.setAttribute('class',
			'weather-icon');

		temperature.setAttribute('class',
			'weather-temperature');

		humidity.setAttribute('class',
			'weather-humidity');

		city_name.setAttribute('class',
			'city-name');

		icon.setAttribute('src',
			`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`);

		temperature.textContent = temp+'\u00B0C';

		humidity.textContent = current.main.humidity+'%';

		city_name.textContent = current.name;

		weatherNow.appendChild(city_name);

		description.appendChild(temperature);

		description.appendChild(humidity);

		weatherPack.appendChild(description);

		weatherPack.appendChild(icon);

		weatherNow.appendChild(weatherPack);

		weatherWidget.appendChild(weatherNow);

	})

	fetch(weatherForecast).then(result=> {

		return result.json();

	}).then(forecasts=> {

		let weatherList = document.createElement('div');

		weatherList.setAttribute('class',
			'forecast-list');

		weatherWidget.appendChild(weatherList);

		forecasts.list.forEach(forecast=> {

			var temp = Math.round(forecast.main.temp);

			let weatherPredict = document.createElement('div');

			let icon = document.createElement('img');

			let description = document.createElement('div');

			weatherPredict.setAttribute('class', 'forecast');

			icon.setAttribute('class', 'forecast-icon');

			icon.setAttribute('src', `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`);

			description.setAttribute('class', 'forecast-description');

			description.textContent = temp+'\u00B0C';

			weatherPredict.appendChild(icon);

			weatherPredict.appendChild(description);

			weatherList.appendChild(weatherPredict);

		})

	})

}

async function category() {

	const categoryList = document.querySelector('.category-list');

	const categories = ["business", "entertainment", "health", "science", "sports", "technology", "general"];

	for (var i = 0; i < 7; i++) {

		let categoryItem = document.createElement('input');

		let categoryLabel = document.createElement('label');

		let categoryBox = document.createElement('div');

		categoryBox.setAttribute('class', 'category')

		categoryBox.setAttribute('id', categories[i]+'Box');

		categoryItem.setAttribute('type', 'radio');

		categoryItem.setAttribute('id', categories[i]);

		categoryItem.setAttribute('class', 'checkbox');

		categoryItem.setAttribute('name', categoryItem.class);

		categoryItem.setAttribute('onclick', 'filter("'+categoryItem.id+'","'+loc+'");');

		categoryLabel.setAttribute('for', categoryItem.id);

		categoryLabel.setAttribute('class', 'label');

		categoryLabel.textContent = categoryItem.id.toUpperCase();

		if (categoryList.childNodes.length < 7) {

			categoryBox.appendChild(categoryItem);

			categoryBox.appendChild(categoryLabel);

			categoryList.appendChild(categoryBox);

		}

	}

}

async function filter(category, location) {

	const categoryList = document.querySelector('.category-list');

	const categories = ["business",
		"entertainment",
		"health",
		"science",
		"sports",
		"technology",
		"general"];

	for (var i = 0; i < categoryList.childNodes.length; i++) {

		let buttons = document.getElementById(categories[i]+'Box');

		buttons.setAttribute('class', 'category');

	}

	let button = document.getElementById(category+'Box');

	let item = document.getElementById(category);

	if (item.checked) {

		button.setAttribute('class', 'categoryChecked');

	}

	await news(category, location);

}

async function retrieve() {

	locUrl = `http://ip-api.com/json/`;

	fetch(locUrl).then(result=> {

		return result.json();

	}).then(location=> {

		loc = location.countryCode.toLowerCase();

		lon = location.lon;

		lat = location.lat;

		await weather(lat, lon);

		await category();

		news('general', loc);

	})

}
