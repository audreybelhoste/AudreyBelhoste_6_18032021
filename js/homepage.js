const jsonFile = 'https://audreybelhoste.github.io/AudreyBelhoste_6_18032021/FishEyeDataFR.json'

fetch(jsonFile)
.then(function(response) {
	return response.json(); 
})
.then(function(data) {
	showPhotographers(data);
})

function createAPhotographer(name, id, city, country, tags, tagline, price, portrait){
	return {
		name,
		id, 
		city, 
		country, 
		tags, 
		tagline, 
		price, 
		portrait
	}
}

function showPhotographers(data){
	var main = document.querySelector('main');

	// var photographers = data['photographers'];

	var photographers = [];

	data['photographers'].forEach(element => {
		photographers.push(createAPhotographer(element.name, element.id, element.city, element.country, element.tags, element.tagline, element.price, element.portrait))
	});
	
	for(var i = 0; i < photographers.length; i++){
		var card = document.createElement('div');
		var cardTitle = document.createElement('h2'); 
		var cardLocation = document.createElement('p');
		var cardDescription = document.createElement('p');
		var cardPrice = document.createElement('p');
		var cardList = document.createElement('ul');
		var link = document.createElement('a');
		var imageContainer = document.createElement('div');
		var image = document.createElement('img');

		card.classList.add("content__card")
		card.setAttribute("data-tags", photographers[i].tags);

		imageContainer.classList.add("content__card__image");

		image.src = 'Sample Photos/Photographers ID Photos/' + photographers[i].portrait;

		link.setAttribute('href', 'photographer.html?id=' + photographers[i].id);

		cardTitle.textContent = photographers[i].name;
		cardTitle.classList.add("content__card__title");

		cardLocation.textContent = photographers[i].city + ", " + photographers[i].country;
		cardLocation.classList.add("content__card__location");

		cardDescription.textContent = photographers[i].tagline;
		cardDescription.classList.add("content__card__description"); 

		cardPrice.textContent = photographers[i].price + "€/jour"; 
		cardPrice.classList.add("content__card__price");

		var tags = photographers[i].tags; 
		for (var j = 0; j < tags.length; j++){
			var listItem = document.createElement('li');
			listItem.textContent = "#" + tags[j];
			listItem.classList.add("content__card__tag") 
			cardList.appendChild(listItem);
		}

		main.appendChild(card);
		card.appendChild(link);
		link.appendChild(imageContainer);
		imageContainer.appendChild(image);
		card.appendChild(cardTitle);
		card.appendChild(cardLocation);
		card.appendChild(cardDescription);
		card.appendChild(cardPrice);
		card.appendChild(cardList);
	}
}

var filters = document.querySelectorAll(".header__navigation__item");
let tags = [];

filters.forEach(function(item) {
	item.addEventListener('click', function() {
		if(item.classList.contains('selected')){
			tags.splice(tags.indexOf(item.getAttribute('data-filter-tag')));
			item.classList.remove('selected');
		} else {
			item.classList.add('selected');
			tags.push(item.getAttribute('data-filter-tag'));
		}

		filterTag(tags);
	})
})

function filterTag(tags) {
	var items = document.querySelectorAll('.content__card');

	for (var i = 0; i < items.length; i++){
		var itemTags = items[i].getAttribute('data-tags');
		items[i].setAttribute('data-toggle', 'off');

		if (itemTags != null) {
			tags.forEach(function(tag) {
				if (itemTags.includes(tag)) {
					items[i].setAttribute('data-toggle', 'on');
				  }
			})
		}

		if(!tags.length){
			items[i].setAttribute('data-toggle', 'on');
		}
	}
}
