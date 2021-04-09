const jsonFile = 'https://audreybelhoste.github.io/AudreyBelhoste_6_18032021/FishEyeDataFR.json'
const url = new URLSearchParams(window.location.search);

fetch(jsonFile)
.then(function(response) {
	return response.json(); 
})
.then(function(data) {
	showInformations(data);
	showMedia(data);
})

function showInformations(data){
	var presentation = document.querySelector('#presentation');
	var photographerPrice = document.querySelector('.info__price');

	var photographers = data['photographers'];

	for(var i = 0; i < photographers.length; i++){

		if(photographers[i].id == url.get('id')){
			var blocInfo = document.createElement('div');
			var name = document.createElement('h1');
			var location = document.createElement('p');
			var description = document.createElement('p');
			var tagsList = document.createElement('ul');
			var imageContainer = document.createElement('div');
			var image = document.createElement('img');

			photographerPrice.textContent = photographers[i].price + "€ / jour";

			blocInfo.classList.add("presentation__info")
	
			name.textContent = photographers[i].name;
			name.classList.add("presentation__info__name");
	
			location.textContent = photographers[i].city + ", " + photographers[i].country;
			location.classList.add("presentation__info__location");
	
			description.textContent = photographers[i].tagline;
			description.classList.add("presentation__info__description"); 
	
			var tags = photographers[i].tags; 
			for (var j = 0; j < tags.length; j++){
				var listItem = document.createElement('li');
				listItem.textContent = "#" + tags[j];
				listItem.classList.add("presentation__info__tag") 
				tagsList.appendChild(listItem);
			}

			imageContainer.classList.add("presentation__image");

			image.src = 'Sample Photos/Photographers ID Photos/' + photographers[i].portrait;
	
			presentation.appendChild(blocInfo);
			blocInfo.appendChild(name);
			blocInfo.appendChild(location);
			blocInfo.appendChild(description);
			blocInfo.appendChild(tagsList);
			presentation.appendChild(imageContainer);
			imageContainer.appendChild(image);
		}
	}
}

function createAMedia(id, photographerId, link, tags, likes, date, price, alt){
	if (link.split('.').pop() == 'jpg') {
		return {
		id : id, 
		photographerId : photographerId, 
		link : link,
		tags : tags, 
		likes : likes, 
		date : new Date(date), 
		price : price, 
		title :  link.replace('.jpg', '').replaceAll('_', ' '),
		type: 'img', 
		alt: alt
		}
	} else if (link.split('.').pop() == 'mp4') {
		return {
			id : id, 
			photographerId : photographerId, 
			link : link,
			tags : tags, 
			likes : likes, 
			date : new Date(date), 
			price : price, 
			title :  link.replace('.mp4', '').replaceAll('_', ' '),
			type: 'video',
			alt: alt
		}
	}
}

function showMedia(data){
	gallery = [];
	const filters = document.querySelectorAll(".filter__list__item");
	const filterList = document.querySelector(".filter__list");

	var media = data['media'];

	for(var i = 0; i < media.length; i++){
		if(media[i].photographerId == url.get('id')){
			newMedia = createAMedia(media[i].id, media[i].photographerId, media[i].image || media[i].video, media[i].tags, media[i].likes, media[i].date, media[i].price, media[i].alt);
			gallery.push(newMedia);
		}
	}
	
	filters.forEach(function(filter) {
		filter.addEventListener('click', function(e) {
			if(filter.classList.contains('selected')) {
				if(filterList.classList.contains('open')){
					filterList.classList.remove('open');
				} else {
					filterList.classList.add('open');
				}				
			} else {
				filterList.classList.remove('open');
				filters.forEach(filter => filter.classList.remove('selected'));
				this.classList.add('selected');
				orderBy(filter.getAttribute('name'));
			}
		})
	})

	createDOMGallery(gallery);
}

function orderBy(filter){

	if(filter === 'popularity') {
		gallery.sort((a, b) => b.likes - a.likes);
	}

	if(filter === 'date') {
		gallery.sort((a, b) => b.date - a.date);
	}

	if(filter === 'title') {
		gallery.sort(function(a, b) {
		return a.title.localeCompare(b.title)
		})
	}

	clearDOMGallery();
	createDOMGallery(gallery);
}

function createDOMGallery(gallery){
	var mediaSection = document.querySelector('#media');
	var totalLikes = document.querySelector('.info__likes');
	var sumLikes = 0;

	for(var i = 0; i < gallery.length; i++){
		
		var card = document.createElement('div');
		var mediaContainer = document.createElement('div');
		var media = document.createElement(gallery[i].type);
		var details = document.createElement('div');
		var title = document.createElement('p');
		var price = document.createElement('p');
		var likes = document.createElement('p');

		card.classList.add("media__card");

		mediaContainer.classList.add("media__card__container");
		
		media.src = 'Sample Photos/' + gallery[i].photographerId + "/" + gallery[i].link;
		media.classList.add("media__card__media");
		media.setAttribute("data-id", gallery[i].id);
		media.setAttribute("alt", gallery[i].alt);

		details.classList.add("media__card__details");

		title.textContent = gallery[i].title;
		title.classList.add("media__card__details__title");

		price.textContent = gallery[i].price + '€';
		price.classList.add("media__card__details__price");

		likes.textContent = gallery[i].likes;
		likes.classList.add("media__card__details__likes");
		likes.setAttribute("data-id", gallery[i].id);
		
		mediaSection.appendChild(card);
		card.appendChild(mediaContainer);
		mediaContainer.appendChild(media);
		card.appendChild(details);
		details.appendChild(title);
		details.appendChild(price); 
		details.appendChild(likes);

		sumLikes += gallery[i].likes;
	}

	totalLikes.textContent = sumLikes;

	Lightbox.init();
	toggleLike(gallery, sumLikes);
}

function clearDOMGallery(){
	var mediaSection = document.querySelector('#media');
	mediaSection.innerHTML = '';
}

function toggleLike(gallery, sumLikes) {

	const likes = document.querySelectorAll(".media__card__details__likes");
	let totalLikes = document.querySelector('.info__likes');

	likes.forEach(function(like) {
		like.addEventListener('click', function(e) {
		
			for(var i = 0; i < gallery.length; i++){
				if(gallery[i].id == like.getAttribute('data-id')){
					if(like.classList.contains('fill')){
						gallery[i].likes--;
						sumLikes--;
						like.classList.remove('fill');
					} else {
						gallery[i].likes++;
						sumLikes++;
						like.classList.add('fill');
					}
					like.innerHTML = gallery[i].likes;
					totalLikes.innerHTML = sumLikes;
				}
			}
		})
	})
}