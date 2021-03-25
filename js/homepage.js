const jsonFile = './FishEyeDataFR.json'

var myInit = {
	mode: 'no-cors',
	headers: {
		'Content-Type' : 'application/json'
	}
};

fetch(jsonFile, myInit)
.then(function(response) {
	return response.json(); 
})
.then(function(data) {
	console.log(data);
})