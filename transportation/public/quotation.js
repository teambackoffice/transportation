cur_frm.cscript.refresh = function () {
    $('input[data-fieldname="source_location"]').autocomplete({
			source: function (request, response) {
				console.log("NAA MAN")
				var g_address = $('input[data-fieldname="source_location"]').val();
				var desc = []
				$.ajax({
					url: 'https://corsanywhere-jqogydb25a-uc.a.run.app/' + "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + g_address + "&key=AIzaSyAFso5WNRELV-7xzSxV5FdHr1BCwqn4hD8",
					type: 'POST',
					dataType: 'json',
					beforeSend: function (request) {
						request.setRequestHeader('Access-Control-Allow-Origin', '*');
						request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
						request.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept");
					},
					crossDomain: true,
					success: function (data, textStatus, xhr) {
						console.log("SUCCESS")
						//frappe.msgprint(__("Success!!"));
						for (var i = 0; i < data.predictions.length; i++) {
							desc.push(data.predictions[i].description)
						}
						console.log(desc)
						response($.grep(desc, function (item) {
							console.log(item)
							return item;
						}));
						//$('input[data-fieldname="google_address"]').autocomplete({source:desc});
					},
					error: function (data, textStatus, xhr) {
						//frappe.msgprint(__("Please make sure you are using recommended browsers(opera & Firefox) with CSR extension"));
						//$('input[data-fieldname="google_address"]').autocomplete("destroy");
					}
				});
			}, select: function (event, ui) {
				//var g_address=$('input[data-fieldname="address_line1"]').val();
				var g_address = ui.item.value
				var componentForm = {
					street_number: 'short_name',
					route: 'long_name',
					locality: 'long_name',
					administrative_area_level_1: 'long_name',

					country: 'long_name',
					postal_code: 'short_name',

				}; //
				var componentForm1 = {
					'street_number': 'address_line1',
					'route': 'address_line2',
					'locality': 'city',
					'administrative_area_level_1': 'state',
					'country': 'country',
					'postal_code': 'pincode',

				};
				$.ajax({
					url: 'https://corsanywhere-jqogydb25a-uc.a.run.app/' + "https://maps.googleapis.com/maps/api/geocode/json?address=" + g_address + "&key=AIzaSyAFso5WNRELV-7xzSxV5FdHr1BCwqn4hD8",
					type: 'POST',
					dataType: 'json',

					success: function (data, textStatus, xhr) {
						console.log(data)
						//console.log(data.results[0].address_components.length)
						var add_compo = data.results[0].address_components
						for (var i = 0; i < add_compo.length; i++) {
							var addressType = add_compo[i].types[0];
							if (componentForm[addressType]) {
								var val = add_compo[i][componentForm[addressType]];
								var temp_val = add_compo[i];
								// console.log(componentForm1[addressType])
								// console.log(temp_val)
								if (componentForm1[addressType] == "state") {
									frappe.model.set_value(frm.doc.doctype, frm.doc.name, "abb", temp_val.short_name);
									cur_frm.refresh_field("abb");
								}
								//		frappe.msgprint(__("addressType="+componentForm1[addressType]+",val="+val));
								cur_frm.set_value(componentForm1[addressType], val).then(function () {
									frappe.model.set_value(frm.doc.doctype, frm.doc.name, "address_line1", frm.doc.address_line1 + " " + frm.doc.address_line2);
									cur_frm.refresh_field("address_line1");
									frappe.model.set_value(frm.doc.doctype, frm.doc.name, "address_line2", "");
									cur_frm.refresh_field("address_line2");
								})

								//document.getElementById(addressType).value = val;
								//frappe.msgprint(__(val));
							}
						}
						//frappe.msgprint(__("Success!!"));
					},
					error: function (data, textStatus, xhr) {
						frappe.msgprint(__("Failure!!"));
					}
				});
			}
		})


}