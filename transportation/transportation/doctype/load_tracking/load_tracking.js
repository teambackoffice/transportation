// Copyright (c) 2020, jan and contributors
// For license information, please see license.txt
cur_frm.cscript.send_whatsapp_notification = function (frm, cdt, cdn) {
    var d = locals[cdt][cdn]


      cur_frm.call({
        doc: cur_frm.doc,
        method: 'send_message',
          args: {status: d.status, description: d.description, location: d.location, time: d.location_time},
         async: false,
          freeze: true,
          freeze_message: "Changing Status...",
        callback: (r) => {
            cur_frm.save_or_update()
        }
    })

}
cur_frm.cscript.qtys = function (frm, cdt, cdn) {
    console.log("aha")
    console.log("NAA MAN DIRI QTY")

    var row = locals[cdt][cdn]
     frappe.db.get_doc('Sales Order', cur_frm.doc.sales_order)
                .then(doc => {
                    for(var i=0;i<doc.items.length;i+=1){
                        if(doc.items[i].load_tracking_qty < row.qtys){
                            var temp_qty = row.qtys
                            row.qtys = doc.items[i].load_tracking_qty
                            cur_frm.refresh_field("items")
                             cur_frm.doc.total = cur_frm.doc.items.reduce((a, b) => a + (b['amount'] || 0), 0)
    cur_frm.refresh_field("total")
                            frappe.msgprint("Qty(" + temp_qty.toString() +  ") exceeded the maximum allowed qty(" + doc.items[i].load_tracking_qty.toString() + ")")

                        } else {
                            row.amount = row.qtys * row.rate
                            cur_frm.refresh_field("items")
                             cur_frm.doc.total = cur_frm.doc.items.reduce((a, b) => a + (b['amount'] || 0), 0)
    cur_frm.refresh_field("total")

                        }
                    }

                })


}
frappe.ui.form.on('Load Tracking', {
	sales_order: function(frm) {
	    if(cur_frm.doc.sales_order){
	        var exclude_fields = ["doctype","docstatus","modified","modified_by","creation","name","owner","parent","parenttype","parentfield"]
            frappe.db.get_doc('Sales Order', cur_frm.doc.sales_order)
                .then(doc => {
                    var final_objects = []
                    for(var i=0;i < doc.items.length;i+=1){
                        if(doc.items[i].load_tracking_qty > 0){
                            for(var ii=0;ii<exclude_fields.length;ii+=1){
                                delete doc.items[i][exclude_fields[ii]]
                            }

                            doc.items[i]['qtys'] = doc.items[i].load_tracking_qty
                            doc.items[i]['amount'] = doc.items[i].load_tracking_qty * doc.items[i].rate


                            cur_frm.add_child('items', doc.items[i]);

                                cur_frm.refresh_field('items');
                        }
                    }

            cur_frm.doc.total = cur_frm.doc.items.reduce((a, b) => a + (b['amount'] || 0), 0)
            cur_frm.refresh_field("total")

                })
        }

	},
	refresh: function(frm) {
    console.log("NAA MAN DIRI REFRESH")

        cur_frm.get_field("load_tracking_locations").grid.cannot_add_rows = true;
        cur_frm.get_field("load_tracking_locations").grid.only_sortable();
        cur_frm.refresh_field("load_tracking_locations")


	  frm.set_query('sales_order', () => {
            return {
                filters: {
                    docstatus: 1,
                    load_tracking_available:1
                }
            }

        })
        if(cur_frm.doc.docstatus){
	      var status = cur_frm.doc.status === "Collecting" ? "Collected" :
                        cur_frm.doc.status === "Collected" ? "In Transit":
                        cur_frm.doc.status === "In Transit" ? "Under Clearance" :
                        cur_frm.doc.status === "Under Clearance" ? "Cleared" :
                        cur_frm.doc.status === "Cleared" ? "Under Clearance" :
                        cur_frm.doc.status === "Under Clearance" ? "Waiting for Bayan" :
                        cur_frm.doc.status === "Waiting for Bayan" ? "Bayan Received" :
                        cur_frm.doc.status === "Bayan Received" ? "Ready to pay" :
                        cur_frm.doc.status === "Ready to pay" ? "Shipment Cleared" :
                        cur_frm.doc.status === "Shipment Cleared" ? "Delivered" : ""

        if(status){
	          console.log(cur_frm.doc.status)
	          console.log(status)
	      frm.add_custom_button(__(status), () => {

              cur_frm.call({
                    doc: cur_frm.doc,
                    method: 'update_status',
                      args: {status: status},
                     async: false,
                      freeze: true,
                      freeze_message: "Changing Status...",
                    callback: (r) => {
cur_frm.reload_doc()

                 }
                })

          });
        }

        }



	}
});

cur_frm.cscript.form_render = function (frm, cdt, cdn) {
        console.log("NAA MAN DIRI RENDER")

 $.getScript("https://cdn.jsdelivr.net/npm/places.js@1.19.0", function () {
              var placesAutocomplete = places({
                appId: 'plAZSGZU5TP8',
                apiKey: '7e4ad27c79270c079fd22a9bbd7dd9fe',
                container: document.querySelectorAll('[data-fieldname = "location"]')[3]
              });

          var $address = document.querySelectorAll('[data-fieldname = "location"]')[3]
          placesAutocomplete.on('change', function(e) {
            $address.textContent = e.suggestion.value
          });

          placesAutocomplete.on('clear', function() {
            $address.textContent = 'none';
          });
        })

}



