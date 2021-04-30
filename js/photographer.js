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
			var blocInfo = document.querySelector('.presentation__info');
			var name = document.createElement('h1');
			var location = document.createElement('p');
			var description = document.createElement('p');
			var tagsList = document.createElement('ul');
			var imageContainer = document.createElement('div');
			var image = document.createElement('img');
			const contactBtn = document.querySelector("#btnContact");

			photographerPrice.textContent = photographers[i].price + "€ / jour";
	
			name.textContent = photographers[i].name;
			name.classList.add("presentation__info__name");

			contactBtn.setAttribute("data-name", photographers[i].name);
	
			location.textContent = photographers[i].city + ", " + photographers[i].country;
			location.classList.add("presentation__info__location");
	
			description.textContent = photographers[i].tagline;
			description.classList.add("presentation__info__description"); 
	
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
				listItemContainer.classList.add("presentation__info__tag");
				listItemLink.href = 'index.html?tag=' + tags[j];
				tagsList.appendChild(listItemContainer);
				listItemContainer.appendChild(listItemLink);
				listItemLink.appendChild(listItem);
				listItemLink.appendChild(listItemSr);
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

var gallery = [];

function showMedia(data){
	const filters = document.querySelectorAll(".filter__list__item");
	const filterList = document.querySelector(".filter__list");

	var media = data['media'];

	for(var i = 0; i < media.length; i++){
		if(media[i].photographerId == url.get('id')){
			var newMedia = createAMedia(media[i].id, media[i].photographerId, media[i].image || media[i].video, media[i].tags, media[i].likes, media[i].date, media[i].price, media[i].alt);
			gallery.push(newMedia);
		}
	}
	
	filters.forEach(function(filter) {
		filter.addEventListener('click', function() {
			if(filter.classList.contains('selected')) {
				if(filterList.classList.contains('open')){
					filterList.classList.remove('open');
				} else {
					filterList.classList.add('open');
					filters.forEach(filter => filter.setAttribute('tabindex', '0'));
				}				
			} else {
				filterList.classList.remove('open');
				filters.forEach(function(filter){
					filter.classList.remove('selected');
					filter.setAttribute('aria-selected', 'false');
					filter.setAttribute('tabindex', '-1');
				});
				this.classList.add('selected');
				this.setAttribute('aria-selected', 'true');
				this.setAttribute('tabindex', '0');
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
		
		var card = document.createElement('figure');
		var mediaContainer = document.createElement('a');
		var media = document.createElement(gallery[i].type);
		var details = document.createElement('figcaption');
		var title = document.createElement('p');
		var price = document.createElement('p');
		var likes = document.createElement('button');

		card.classList.add("media__card");

		mediaContainer.setAttribute('href', '#');

		mediaContainer.classList.add("media__card__container");
		
		media.src = 'Sample Photos/' + gallery[i].photographerId + "/" + gallery[i].link;
		media.classList.add("media__card__media");
		mediaContainer.setAttribute("data-id", gallery[i].id);
		media.setAttribute("alt", gallery[i].alt);

		details.classList.add("media__card__details");

		title.textContent = gallery[i].title;
		title.classList.add("media__card__details__title");

		price.textContent = gallery[i].price + '€';
		price.classList.add("media__card__details__price");

		likes.textContent = gallery[i].likes;
		likes.classList.add("media__card__details__likes");
		likes.setAttribute("data-id", gallery[i].id);
		likes.setAttribute('aria-label', 'likes');
		
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
		like.addEventListener('click', function() {
		
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

class Lightbox {
		
	static init () {
		const links = Array.from(document.querySelectorAll(".media__card__container"));
		links.forEach(function(link) {
			link.addEventListener('click', function(e) {
						e.preventDefault();
				for(var i = 0; i < gallery.length; i++){
					if(gallery[i].id == e.currentTarget.getAttribute('data-id')){
						var currentMedia = gallery[i];
					}
				}
				new Lightbox(currentMedia, gallery);
			})
		})
	}

	constructor(url, gallery) {
		this.element = this.buildDOM(url);
		this.loadImage(url);
		this.gallery = gallery;
		this.onKeyUp = this.onKeyUp.bind(this);
		document.body.appendChild(this.element);

		const lightboxBg = document.querySelector('#lightbox');
		const focusableElements = lightboxBg.querySelectorAll('button:not([disabled])');
		const firstFocusableElement = focusableElements[0];
		const lastFocusableElement = focusableElements[focusableElements.length - 1];
		firstFocusableElement.focus();
		focusableElements.forEach((focusableElement) => {
			if (focusableElement.addEventListener) {
				focusableElement.addEventListener('keydown', (event) => {
		
					if (event.shiftKey && event.keyCode === 9) {
						if (event.target === firstFocusableElement) { // shift + tab
							event.preventDefault();
		
							lastFocusableElement.focus();
						}
					} else if (event.target === lastFocusableElement && event.keyCode === 9) { // tab
						event.preventDefault();
		
						firstFocusableElement.focus();
					}
				});
			}
		});
		document.addEventListener('keyup', this.onKeyUp);
	}

	onKeyUp(e) {
		if( e.key == 'Escape') {
			this.close(e);
		} else if ( e.key == 'ArrowLeft') {
			this.prev(e);
		} else if (e.key == 'ArrowRight') {
			this.next(e);
		}
	}

	close(e) {
		e.preventDefault();
		document.body.classList.remove('modalOpen');
		document.querySelector("#main-wrapper").setAttribute('aria-hidden', 'false');
		this.element.remove();
		document.removeEventListener('keyup', this.onKeyUp);
	}

	next(e) {
		e.preventDefault(); 
		let i = this.gallery.findIndex(media => media === this.currentMedia);
		if (i === this.gallery.length - 1) {
			i = -1;
		}
		this.loadImage(this.gallery[i + 1]);
	}

	prev(e) {
		e.preventDefault();
		let i = this.gallery.findIndex(media => media === this.currentMedia);
		if (i == 0) {
			i = this.gallery.length;
		}
		this.loadImage(this.gallery[i - 1]);
	}

	loadImage(currentMedia) {
		this.currentMedia = null;
		const container = this.element.querySelector('.lightbox__container figure');
		const media = document.createElement(currentMedia.type);

		if(currentMedia.type === "video"){
			media.setAttribute('controls', true);
		}
		const title = document.createElement('figcaption');
		title.textContent = currentMedia.title;
		container.innerHTML = '';
		container.appendChild(media);
		container.appendChild(title);
		media.src = 'Sample Photos/' + currentMedia.photographerId + "/" + currentMedia.link;
		this.currentMedia = currentMedia;
	}

	buildDOM() {
		document.body.classList.add('modalOpen');
		document.querySelector('#main-wrapper').setAttribute('aria-hidden', 'true');
		const dom = document.createElement('div');
		dom.classList.add('lightbox');
		dom.setAttribute('id', 'lightbox');
		dom.innerHTML = '<button class="lightbox__close" id="lightboxClose">Fermer</button> <button class="lightbox__next">Suivant</button> <button class="lightbox__prev">Précédent</button> <div class="lightbox__container"><figure></figure></figure></div>'
		dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this));
		dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this));
		dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this));
		return dom;
	}
}