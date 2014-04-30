Form Validation - v2.0
===

Standard front end validation for html forms!

Features
---

This custom front end form validation disableds HTML5 validation and allows for a more customised approach to form validation, features include:

* Styleable tooltips and error classes applied directly to the field and their wrapper.
* Fireable methods that allow form validation without the submission of the form.
* The code finds and compares fields against one another and cross validated them, e.g Email and Confrim Email fields.
* Checks Validity of Email addresses and phone numbers.
* Cross references radio buttons and validates accordingly.

Basic Implementation
---

	$(document).ready(function() {

		$('form').formValidation();

	});

	<input type="text" required="required" />

You can use any selector not just form, 'form' will fire on every form on the site, however if the form doesn't contain any fields with 'required="required"' on them then it won't run!

Options
---

	wrapper: '.form__field', 	// This is the main wrapper for each of your fields, change it to whatever class you like!
	tooltip: true				// Choose whether to enable or disable tooltips, setting to false will disable

Styling
--

There are a couple of key classes to style up, here's some example SASS below.

	.error-tooltip {

		// The tooltips!

		&.active {

			// An active tooltip.

		}

	}

	.field-error {

		// The class that gets added to the fields.

	}

Methods
---

There is only currently one method that you can fire which is the validate method, see below:

	$('form').FV('validate');	// Validate the selected form, in this case it will be all forms on the page, it WILL NOT submit the form for you.

That's everything. Keep an eye out for updates.