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
	
			name.textContent = photographers[i].name;
			name.classList.add("presentation__name");
	
			location.textContent = photographers[i].city + ", " + photographers[i].country;
			location.classList.add("presentation__location");
	
			description.textContent = photographers[i].tagline;
			description.classList.add("presentation__description"); 
	
			var tags = photographers[i].tags; 
			for (var j = 0; j < tags.length; j++){
				var listItem = document.createElement('li');
				listItem.textContent = "#" + tags[j];
				listItem.classList.add("presentation__tag") 
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

function createAMedia(id, photographerId, link, tags, likes, date, price){
	if (link.split('.').pop() == 'jpg') {
		return {
		id : id, 
		photographerId : photographerId, 
		link : link,
		tags : tags, 
		likes : likes, 
		date : date, 
		price : price, 
		title :  link.replace('.jpg', '').replaceAll('_', ' '),
		type: 'img'
		}
	} else if (link.split('.').pop() == 'mp4') {
		return {
			id : id, 
			photographerId : photographerId, 
			link : link,
			tags : tags, 
			likes : likes, 
			date : date, 
			price : price, 
			title :  link.replace('.mp4', '').replaceAll('_', ' '),
			type: 'video'
		}
	}
}

mediaList = [];
gallery = [];

function showMedia(data){
	var mediaSection = document.querySelector('#media');

	var media = data['media'];

	for(var i = 0; i < media.length; i++){
		newMedia = createAMedia(media[i].id, media[i].photographerId, media[i].image || media[i].video, media[i].tags, media[i].likes, media[i].date, media[i].price);
		mediaList.push(newMedia);
	}

	for(var i = 0; i < mediaList.length; i++){

		if(mediaList[i].photographerId == url.get('id')){
			var card = document.createElement('div');
			var mediaContainer = document.createElement('div');
			var media = document.createElement(mediaList[i].type);
			var details = document.createElement('div');
			var title = document.createElement('p');
			var price = document.createElement('p');
			var likes = document.createElement('p');

			card.classList.add("media__card");

			mediaContainer.classList.add("media__card__container");
			
			media.src = 'Sample Photos/' + mediaList[i].photographerId + "/" + mediaList[i].link;
			media.classList.add("media__card__media");
			media.setAttribute("data-id", mediaList[i].id);

			details.classList.add("media__card__details");

			title.textContent = mediaList[i].title;

			price.textContent = mediaList[i].price + ' €';

			likes.textContent = mediaList[i].likes;
			
			mediaSection.appendChild(card);
			card.appendChild(mediaContainer);
			mediaContainer.appendChild(media);
			card.appendChild(details);
			details.appendChild(title);
			details.appendChild(price); 
			details.appendChild(likes);

			gallery.push(mediaList[i]);
		}
	}

	class Lightbox {
		
		static init () {
			const links = Array.from(document.querySelectorAll(".media__card__media"));
			links.forEach(function(link) {
				link.addEventListener('click', function(e) {
					e.preventDefault();
					for(var i = 0; i < mediaList.length; i++){
						if(mediaList[i].id == e.currentTarget.getAttribute('data-id')){
							var currentMedia = mediaList[i];
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
			this.element.remove();
			document.removeEventListener('keyup', this.onKeyUp);
		}
	
		next(e) {
			e.preventDefault; 
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
			const container = this.element.querySelector('.lightbox__container')
			media = document.createElement(currentMedia.type);
			title = document.createElement('p');
			title.textContent = currentMedia.title;
			container.innerHTML = '';
			container.appendChild(media);
			container.appendChild(title);
			media.src = 'Sample Photos/' + currentMedia.photographerId + "/" + currentMedia.link;
			this.currentMedia = currentMedia;
		}
	
		buildDOM() {
			const dom = document.createElement('div');
			dom.classList.add('lightbox');
			dom.innerHTML = '<button class="lightbox__close">Fermer</button> <button class="lightbox__next">Suivant</button> <button class="lightbox__prev">Précédent</button> <div class="lightbox__container"></div>'
			dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this));
			dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this));
			dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this));
			return dom;
		}
	}
	
	Lightbox.init();
}

