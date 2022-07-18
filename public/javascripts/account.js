///////////////////////////////////////////////////////////
// Account Page Javascript
//
// Javascript functions that are specific to this page
//

//
// Check whether both passwords match
// 
// - Triggered on each keypress in the field
//
function checkPasswordsMatch(field) {

	// Get reference to password fields
	let fieldPassword1 = document.forms[0].password;
	let fieldPassword2 = document.forms[0].password_confirmation;

	// Get current text in the fields
	let password1 = fieldPassword1.value;
	let password2 = fieldPassword2.value;

	// Set the validation message if the passwords are different
	if (password1 != password2) {
		field.setCustomValidity("Both passwords must match");
	}
	else {
		// Clear the validation message if both passwords match
		field.setCustomValidity("");
	}

	// Show the validation message
	field.reportValidity();
}