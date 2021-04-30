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
const focusableElementsArray = [
	'button:not([disabled])',
	'input:not([disabled])',
	'textarea:not([disabled])',
  ];

const focusableElements = contactBg.querySelectorAll(focusableElementsArray);
const firstFocusableElement = focusableElements[0];
const lastFocusableElement = focusableElements[focusableElements.length - 1];

contactBtn.addEventListener("click", function () {
	document.body.classList.add('modalOpen');
	contactName.textContent = "Contactez-moi " + contactBtn.getAttribute('data-name');
	contactBg.style.display = "block";
	mainWrapper.setAttribute('aria-hidden', 'true');
	contactBg.setAttribute('aria-hidden', 'false');
	firstFocusableElement.focus();
	
	focusableElements.forEach((focusableElement) => {
		if (focusableElement.addEventListener) {
			focusableElement.addEventListener('keydown', (event) => {
						
				if (event.shiftKey) {
					if (event.target === firstFocusableElement && event.keyCode == 9) { // shift + tab
						event.preventDefault();
	
						lastFocusableElement.focus();
					}
				} else if (event.target === lastFocusableElement && event.keyCode == 9) { // tab
					event.preventDefault();
	
					firstFocusableElement.focus();
				}
			});
		}
	});
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