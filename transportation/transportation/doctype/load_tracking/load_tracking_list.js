frappe.listview_settings['Load Tracking'] = {
	add_fields: ["status"],
	get_indicator: function (doc) {
		if ([
			"Collecting",
			"Collected",
			"In Transit",
			"Under Clearance",
			"Cleared",
			"Waiting for Bayan",
			"Bayan Received",
			"Ready to Pay",
			"Shipment Cleared"].includes(doc.status)) {
			// Closed
			return [__(doc.status), "orange", "status,=," + doc.status];
		} else if (doc.status === "Delivered") {
			// Closed
			return [__(doc.status), "green", "status,=,Delivered"];
		}

	},
};
