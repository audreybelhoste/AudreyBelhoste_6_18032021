const jsonFile = 'https://audreybelhoste.github.io/AudreyBelhoste_6_18032021/FishEyeDataFR.json'
const url = new URLSearchParams(window.location.search);

fetch(jsonFile)
.then(function(response) {
	return response.json(); 
})
.then(function(data) {
	showInformations(data);
})

function showInformations(data){
	var main = document.querySelector('main');

	var photographers = data['photographers'];

	for(var i = 0; i < photographers.length; i++){

		if(photographers[i].id == url.get('id')){
			var blocInfo = document.createElement('div');
			var name = document.createElement('h1');
			var location = document.createElement('p');
			var description = document.createElement('p');
			var tagsList = document.createElement('ul');
	
			name.textContent = photographers[i].name;
	
			location.textContent = photographers[i].city + ", " + photographers[i].country;
	
			description.textContent = photographers[i].tagline;
	
			var tags = photographers[i].tags; 
			for (var j = 0; j < tags.length; j++){
				var listItem = document.createElement('li');
				listItem.textContent = "#" + tags[j];
				tagsList.appendChild(listItem);
			}
	
			main.appendChild(blocInfo);
			blocInfo.appendChild(name);
			blocInfo.appendChild(location);
			blocInfo.appendChild(description);
			blocInfo.appendChild(tagsList);
		}
	}
}