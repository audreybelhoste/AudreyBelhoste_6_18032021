const jsonFile = 'https://audreybelhoste.github.io/AudreyBelhoste_6_18032021/FishEyeDataFR.json'

fetch(jsonFile)
.then(function(response) {
	return response.json(); 
})
.then(function(data) {
	showPhotographers(data);
})

function photographer(name, id, city, country, tags, tagline, price, portrait){
	this.name = name,
	this.id = id, 
	this.city = city, 
	this.country = country, 
	this.tags = tags, 
	this.tagline = tagline, 
	this.price = price, 
	this.portrait = portrait
}

function showPhotographers(data){
	var main = document.querySelector('main');

	var photographers = data['photographers'];
	
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

		imageContainer.classList.add("content__card__image");

		image.src = 'Sample Photos/Photographers ID Photos/' + photographers[i].portrait;

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
		card.appendChild(imageContainer);
		imageContainer.appendChild(image);
		card.appendChild(cardTitle);
		card.appendChild(cardLocation);
		card.appendChild(cardDescription);
		card.appendChild(cardPrice);
		card.appendChild(cardList);
	}
}
