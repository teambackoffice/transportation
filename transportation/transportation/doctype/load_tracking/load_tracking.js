// Copyright (c) 2020, jan and contributors
// For license information, please see license.txt

frappe.ui.form.on('Load Tracking', {
	quotation: function(frm) {
	    if(cur_frm.doc.quotation){
            frappe.db.get_doc('Quotation', cur_frm.doc.quotation)
                .then(doc => {
                    cur_frm.doc.items = doc.items
            cur_frm.doc.total = doc.items.reduce((a, b) => a + (b['amount'] || 0), 0)
            cur_frm.refresh_field("items")
            cur_frm.refresh_field("total")
                })
        }

	},
	refresh: function(frm) {
	  frm.set_query('quotation', () => {
            return {
                filters: {
                    docstatus: 1
                }
            }

        })
        if(cur_frm.doc.docstatus){
	      var status = cur_frm.doc.status === "Collecting" ? "Collected" :
                    cur_frm.doc.status === "Collected" ? "In Transit":
                        cur_frm.doc.status === "In Transit" ? "Bay Bill" :
                            cur_frm.doc.status === "Bay Bill" ? "Delivered" : ""
        if(status){
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
