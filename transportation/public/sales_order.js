

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
//
// cur_frm.cscript.before_submit = function () {
//     frappe.confirm('Do you want to generate Load Tracking?',
//     () => {
//         frappe.call({
//             method: "transportation.doc_events.sales_order.generate_load_tracking",
//             args: {doc: cur_frm.doc},
//             callback: function () {}
//         })
//     }, () => {
//         // action to perform if No is selected
//     })
// }
cur_frm.cscript.onload_post_render = function () {
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
}