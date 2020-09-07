

$.getScript("https://cdn.jsdelivr.net/npm/places.js@1.19.0", function () {
	  var placesAutocomplete = places({
		appId: 'plAZSGZU5TP8',
		apiKey: '7e4ad27c79270c079fd22a9bbd7dd9fe',
		container: document.querySelectorAll('[data-fieldname = "source_location"]')[1]
	  });

	  var $address = document.querySelectorAll('[data-fieldname = "source_location"]')[1]
	  placesAutocomplete.on('change', function(e) {
		$address.textContent = e.suggestion.value
	  });

	  placesAutocomplete.on('clear', function() {
		$address.textContent = 'none';
	  });
})
$.getScript("https://cdn.jsdelivr.net/npm/places.js@1.19.0", function () {
	  var placesAutocomplete = places({
		appId: 'plAZSGZU5TP8',
		apiKey: '7e4ad27c79270c079fd22a9bbd7dd9fe',
		container: document.querySelectorAll('[data-fieldname = "destination_location"]')[1]
	  });

	  var $address = document.querySelectorAll('[data-fieldname = "destination_location"]')[1]
	  placesAutocomplete.on('change', function(e) {
		$address.textContent = e.suggestion.value
	  });

	  placesAutocomplete.on('clear', function() {
		$address.textContent = 'none';
	  });
})