frappe.listview_settings['Pre Invoice'] = {
	add_fields: ["pre_invoice_status"],
	get_indicator: function (doc) {
		if (doc.pre_invoice_status === "In Progress") {
			// Closed
			return [__(doc.pre_invoice_status), "orange", "pre_invoice_status,=,In Progress"];
		} else if (doc.pre_invoice_status === "Completed") {
			// Closed
			return [__(doc.pre_invoice_status), "green", "pre_invoice_status,=,Completed"];
		}

	},
};
