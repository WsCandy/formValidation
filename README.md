Form Validation - v2.1
===

2.1 Update
---

Added in an updateSettings method, for update the settings of a particular form. This is useful if you're firing the plugin on every form on the site and want to update the settings of a specific form! e.g.

	$('.nocompare').formValidation('updateSettings', { compare: false });

This update also added in the setting to disable the comparison of fields, it can be invoked by setting the 'compare' option to either true or false.

Features
---

Standard front end validation for html forms!

This custom front end form validation disabled HTML5 validation and allows for a more customised approach to form validation, features include:

* Style-able tooltips and error classes applied directly to the field and their wrapper.
* Fireable methods that allow form validation without the submission of the form.
* The code finds and compares fields against one another and cross validated them, e.g email and confirm Email fields.
* Checks Validity of Email addresses and phone numbers.
* Cross references radio buttons and validates accordingly.
* Derives what type of field you're filling in, e.g e-mail, password, telephone number etc and validates accordingly.

Basic Implementation
---

	$(document).ready(function() {

		$('form').formValidation();

	});

	<form action="/submit.php">
		<div class="form__field">
			<input type="text" required="required" />
		</div>
	</form>

You can use any selector not just form, 'form' will fire on every form on the site, however if the form doesn't contain any fields with 'required="required"' on them then it won't run!

Options
---

	wrapper: '.form__field', 	// This is the main wrapper for each of your fields, change it to whatever class you like!
	tooltip: true				// Choose whether to enable or disable tool tips, setting to false will disable

Styling
--

There are a couple of key classes to style up, here's some example SASS below.

	.error-tooltip {

		// The tool tips!

		&.active {

			// An active tool tip.

		}

	}

	.field-error {

		// The class that gets added to the fields.

	}

Methods
---

See below for a list of methods:

	$('form').formValidation('validate');	// Validate the selected form, in this case it will be all forms on the page, it WILL NOT submit the form for you.
	$('.nocompare').formValidation('updateSettings', { compare: false }); // Will update all the forms with the class 'nocompare' with new settings.

That's everything. Keep an eye out for updates.