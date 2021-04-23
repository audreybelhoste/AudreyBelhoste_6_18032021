const contactBg = document.querySelector("#contact");
const contactBtn = document.querySelector("#btnContact");
const contactName = document.querySelector("#contactName");
const contactCloseBtn = document.querySelector("#contactClose");
const form = document.getElementById("form");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const message = document.getElementById("message");
const mainWrapper = document.querySelector("#main-wrapper");

contactBtn.addEventListener("click", function () {
	document.body.classList.add('modalOpen');
	contactName.textContent = "Contactez-moi " + contactBtn.getAttribute('data-name');
	contactBg.style.display = "block";
	mainWrapper.setAttribute('aria-hidden', 'true');
	contactBg.setAttribute('aria-hidden', 'false');
	contactCloseBtn.focus();
});

contactCloseBtn.addEventListener("click", closeModal);

function closeModal() {
	document.body.classList.remove('modalOpen');
	contactBg.style.display = "none";
	mainWrapper.setAttribute('aria-hidden', 'false');
	contactBg.setAttribute('arria-hidden', 'true');
}

window.addEventListener('keydown', function (event) {
	if (event.key === 'Escape') {
		closeModal();
	}
})

form.addEventListener("submit", function(event){
	event.preventDefault();
	submitForm();
})

function submitForm() {
	console.log("Nom: " + firstname.value + ", prénom: " + lastname.value + ", email: " + email.value + ", message: " + message.value);						
}