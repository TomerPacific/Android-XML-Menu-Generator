function sendMail(e) {
	e.preventDefault();
	let mailInput = document.getElementById(EMAIL_ELEMENT_ID);
	if (!mailInput.value || !emailNotValid(mailInput.value) || !xml.value) {
		mailInput.value = "";
		return;
	} else {
		Email.send({
			    SecureToken : "0a44347d-fa93-486b-8ede-d98a744f0526",
			    To : mailInput.value,
			    From : OWN_EMAIL,
			    Subject : APP_TITLE,
			    Body : xml.innerHTML.toString()
			}).then(
		  		function(message) {
					alert(EMAIL_SENT_MESSAGE);
		  			location.reload();
		  		}
			);
	}
	
}

function emailNotValid(email) {
	var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return email.match(emailRegex);
}