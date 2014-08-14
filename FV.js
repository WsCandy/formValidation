;(function() {

	'use strict';

	var version = '2.1',
		pluginName = 'Form Validation';

	$.fn.formValidation = function(options, param) {
		
		var results = [];

		for(var i = 0; i < this.length; i++) {

			var self = $(this[i]);

			if(self.data('instance') == undefined && typeof options != 'string') {

				var instance = new plugin(self, options);
				self.data('instance', instance);
				instance.private_methods.initialise();

			} else {

				var instance = self.data('instance');

				if(instance == undefined) {

					console.log('['+pluginName+' '+version+'] - You\'re trying to fire a method on an element with no instance!');

				} else if(instance.public_methods[options]) {

					if (this.length > 1) {

						results.push(instance.public_methods[options](param));

					} else {

						return instance.public_methods[options](param);
						
					}
						
				} else {

					instance.private_methods.error(options + ' is not a defined method!');

				}

			}

		}

		return results;

	}

	function plugin(self, options, param) {

		var instance = this;

		instance.defaults = {

			wrapper : '.form__field',
			tooltip : true,
			compare : true,
			ajax : false

		}

		var settings = $.extend(instance.defaults, options);

		var requiredElements = self.find('*[required="required"]');

		instance.private_methods = {
			
			error: function(error) {

				console.log('['+pluginName+' '+version+'] - ' + error);

			},

			initialise: function() {

				// Turn off HTML5 Validation

				self.attr('novalidate', 'true');

				if(settings.ajax) instance.private_methods['ajax'].setUp();

				self.submit(function() {

					if(instance.public_methods.validate() == false) {

						return false;
						
					} else {

						self.children('.error-text').remove();

					}

				});

			},

			ajax: {

				setUp: function() {



				}

			},

			deriveFieldType: function(element) {

				var name = element.attr('name');

				if(name.indexOf('email') > -1) {

					return 'email';

				} else if(name.indexOf('password') > -1) {

					return 'password';

				} else if(name.indexOf('name') > -1) {

					return 'name';

				} else {

					return name;

				}

			},

			fieldLength: function(data) {

				switch(data) {

					case 'email':

						return 3;

					break;

					case 'password':

						return 6;

					break;

					case 'name':

						return 1;

					break;

					case 'phone':

						return 5;

					break;

					default: 

						return 0;

					break;

				}

			},

			errorFields: function(element, type, error) {

				if(type == 'SELECT') {

					element.next('span').addClass('field-error');

				} else if(type == 'checkbox' || type == 'radio') {

					element.parent().next('label').addClass('field-error');

				} else {

					element.addClass('field-error');
					
				}

				if(settings.tooltip) {

					switch(error) {

						case 'compare' :

							var message = 'These fields need to match';

						break;

						case 'email' :

							var message = 'Please enter a valid email address';

						break;

						case 'check' : 

							var message = 'Please check this field to continue';

						break;

						case 'radio' :

							var message = 'Please check one of the marked fields';

						break;

						default : 

							var message = 'Please enter a valid value';

						break;

					}

					var parent = type != 'radio' ? element.closest(settings.wrapper) : element.closest(settings.wrapper).parent();
					var tooltip = parent.find('.error-tooltip');

					if(tooltip.size() <= 0) {

						$('<div />', {

							'class' : 'error-tooltip',
							'text' : message

						}).appendTo(parent);

						tooltip = parent.find('.error-tooltip');

						setTimeout(function() {

							tooltip.addClass('active');

						}, 100);

					} else {

						tooltip.text(message);
						tooltip.addClass('active');

					}

					element.focus(function() {

						tooltip.removeClass('active');

					});

					tooltip.click(function() {

						element.focus();

					});				
					
				}



			},

			validFields: function(element, type) {

				if(type == 'SELECT') {

					element.next('span').removeClass('field-error');

				}  else if(type == 'checkbox') {

					element.parent().next('label').removeClass('field-error');

				} else {

					element.removeClass('field-error');
					
				}

				element.parent().find('.error-tooltip').remove();

			},

			validateEmail: function(email) {

				var validate = /^([^\s\\]+)@((\[[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

			    if (validate.test(email)) {
			        return true;
			    } else {
			        return false;
			    }

			},

			findFields: function(fields, search) {	

				var compare = [];

				for(var i = 0; i < fields.length; i++) {

					var field = $(fields[i]);
						type = instance.private_methods.deriveFieldType(field);

					if(type == search) {

						compare.push(field.attr('name'));
						
					}

				}

				return compare;

			},

			compareFields: function(element, type, fields) {

				if(self.find('*[name="'+fields[0]+'"]').val() != self.find('*[name="'+fields[1]+'"]').val()) {

					instance.private_methods.errorFields(element, type, 'compare');

				} else {

					instance.private_methods.validFields(element, type);

				}
			}

		}

		instance.public_methods = {

			validate: function() {

				for(var i = 0; i < requiredElements.length; i++) {

					var type = requiredElements[i].nodeName,
						requiredElement = $(requiredElements[i]),
						data = instance.private_methods.deriveFieldType(requiredElement);

					if(requiredElement.is(':visible') && requiredElement.attr('disabled') != 'disabled' ) {

						if(requiredElement.val().length <= instance.private_methods.fieldLength(data)) {

							instance.private_methods.errorFields(requiredElement, type);

						} else if(data == 'email') {

							if(instance.private_methods.validateEmail(requiredElement.val()) == false) {

								instance.private_methods.errorFields(requiredElement, type, data);
								
							} else if(instance.private_methods.findFields(requiredElements, data).length > 1 && settings.compare == true) {

								instance.private_methods.compareFields(requiredElement, type, instance.private_methods.findFields(requiredElements, data));

							} else {

								instance.private_methods.validFields(requiredElement, type);

							}

						} else if(data == 'password') {

							if(instance.private_methods.findFields(requiredElements, data).length > 1) {

								instance.private_methods.compareFields(requiredElement, type, instance.private_methods.findFields(requiredElements, data));

							} else {

								instance.private_methods.validFields(requiredElement, type);

							}

						} else if(requiredElement.attr('type') == 'checkbox' || requiredElement.attr('type') == 'radio') {

							switch(requiredElement.attr('type')) {

								case 'checkbox':

									if(!(requiredElement.is(':checked'))) {

										instance.private_methods.errorFields(requiredElement, 'checkbox', 'check');

									} else {

										instance.private_methods.validFields(requiredElement, 'checkbox');								

									}									

								break;

								case 'radio': 

									var radioSet = $('*[name="' + requiredElement.attr('name') + '"]');

									if(!(radioSet.is(':checked'))) {
										
										instance.private_methods.errorFields(radioSet, 'radio', 'radio');
										
									} else {

										instance.private_methods.validFields(radioSet, 'checkbox');	

									}

								break;

							}

						} else {

							instance.private_methods.validFields(requiredElement, type);

						}

					} else {

						requiredElement.removeClass('field-error');

					}

				}

				return self.find('.field-error').size() > 0 ? false : true;

			},

			updateSettings: function(updates) {

				$.extend(settings, updates);

			}

		}

	}
	
})();

$(document).ready(function() {

	$('form').formValidation({

		ajax : true

	});

});