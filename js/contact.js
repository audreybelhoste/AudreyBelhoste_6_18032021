const contactBg = document.querySelector("#contact");
const contactBtn = document.querySelectorAll(".presentation__info__contact");
const contactCloseBtn = document.querySelectorAll(".contact__content__close");
const form = document.getElementById("form");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const meassage = document.getElementById("message");

contactBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  contactBg.style.display = "block";
}

contactCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));

function closeModal() {
	contactBg.style.display = "none";
}

window.addEventListener('keydown', function (event) {
	if (event.key === 'Escape') {
	  closeModal();
	}

	if (event.key === 'Enter') {
		submitForm();
	}
})

form.addEventListener("submit", function(event){
	event.preventDefault();
	submitForm();
})

function submitForm() {
	console.log("Nom: " + firstname.value + ", prénom: " + lastname.value + ", email: " + email.value + ", message: " + message.value);						
}