class Lightbox {
		
	static init () {
		const links = Array.from(document.querySelectorAll(".media__card__media"));
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
		const dom = document.createElement('div');
		dom.classList.add('lightbox');
		dom.innerHTML = '<button class="lightbox__close">Fermer</button> <button class="lightbox__next">Suivant</button> <button class="lightbox__prev">Précédent</button> <div class="lightbox__container"><figure></figure></figure></div>'
		dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this));
		dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this));
		dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this));
		return dom;
	}
}