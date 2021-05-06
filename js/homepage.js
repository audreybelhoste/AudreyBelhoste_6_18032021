// url of json file 
const jsonFile = 'https://audreybelhoste.github.io/AudreyBelhoste_6_18032021/FishEyeDataFR.json'

// call fetch(url) with default options
fetch(jsonFile)
.then(function(response) {
	// convert response to json 
	return response.json(); 
})
.then(function(data) {
	console.log(data);
	showPhotographers(data);
})

// photographer factory
function createAPhotographer(name, id, city, country, tags, tagline, price, portrait, alt){
	return {
		name,
		id, 
		city, 
		country, 
		tags, 
		tagline, 
		price, 
		portrait, 
		alt
	}
}

// create DOM elements
function showPhotographers(data){
	var main = document.querySelector('main');

	var photographers = [];

	data['photographers'].forEach(element => {
		photographers.push(createAPhotographer(element.name, element.id, element.city, element.country, element.tags, element.tagline, element.price, element.portrait, element.alt))
	});

	var allTags = [];
	
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
		image.setAttribute('alt', photographers[i].alt);

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
			var listItemContainer = document.createElement('li');
			var listItemLink = document.createElement('a');
			var listItem = document.createElement('span');
			var listItemSr = document.createElement('span');

			listItem.textContent = "#" + tags[j];
			listItem.setAttribute('aria-hidden', 'true');
			listItemSr.textContent = "Tag " + tags[j];
			listItemSr.classList.add('sr-only');
			listItemContainer.classList.add("content__card__tag");
			listItemContainer.classList.add("filterTag");
			listItemContainer.setAttribute("data-filter-tag", tags[j]);
			listItemLink.href = '#';
			cardList.appendChild(listItemContainer);
			listItemContainer.appendChild(listItemLink);
			listItemLink.appendChild(listItem);
			listItemLink.appendChild(listItemSr);
 
			if(!allTags.includes(tags[j])){
				allTags.push(tags[j]);
			}
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

	displayTags(allTags);

	toggleNavSelectedTags();
}

// display tags in navbar
function displayTags(tags){
	for (var j = 0; j < tags.length; j++){
		var tagList = document.querySelector('#tagList');
		var listItemContainer = document.createElement('li');
		var listItemLink = document.createElement('a');
		var listItem = document.createElement('span');
		var listItemSr = document.createElement('span');

		listItem.textContent = "#" + tags[j].charAt(0).toUpperCase() + tags[j].slice(1);
		listItem.setAttribute('aria-hidden', 'true');
		listItemSr.textContent = "Tag " + tags[j];
		listItemSr.classList.add('sr-only');
		listItemContainer.classList.add("header__navigation__item");
		listItemContainer.classList.add("filterTag");
		listItemContainer.setAttribute("data-filter-tag", tags[j]);
		listItemLink.href = '#';
		tagList.appendChild(listItemContainer);
		listItemContainer.appendChild(listItemLink);
		listItemLink.appendChild(listItem);
		listItemLink.appendChild(listItemSr);
	}
}

// manage selected tags with url get parameters
function toggleNavSelectedTags() {
	let tags = [];
	let currentPath = window.location.href;
	const currentParams = new URL(currentPath).searchParams;
	let tagParams = (currentParams.get("tag")) ? currentParams.get("tag").split(',') : [];
	const filters = document.querySelectorAll(".filterTag");

	tagParams.forEach(function(item) {
		tags.push(item);
		document.querySelectorAll('.filterTag[data-filter-tag="' + item + '"]').forEach(function(element){
			element.classList.add('selected')
		});
	})

	filters.forEach(function(item) {
		item.addEventListener('click', function() {
	
			let url = "index.html";
	
			if(item.classList.contains('selected')){
				tags.splice(tags.indexOf(item.getAttribute('data-filter-tag')), 1);
				tagParams.splice(tagParams.indexOf(item.getAttribute('data-filter-tag')), 1);
				document.querySelectorAll('.filterTag[data-filter-tag="' + item.getAttribute('data-filter-tag') + '"]').forEach(function(element){
					element.classList.remove('selected')
				});
			} else {
				tagParams.push(item.getAttribute('data-filter-tag'));
				document.querySelectorAll('.filterTag[data-filter-tag="' + item.getAttribute('data-filter-tag') + '"]').forEach(function(element){
					element.classList.add('selected')
				});
				tags.push(item.getAttribute('data-filter-tag'));
			}
	
			tagParams.forEach((tag, index) => {
				if (index === 0) url += `?tag=${tag}`;
				else url += `,${tag}`;
			});
	
			window.history.pushState({}, "", url);
	
			filterTag(tags);
		})
	})

	filterTag(tags);
}

// display photographers by selected tags
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
