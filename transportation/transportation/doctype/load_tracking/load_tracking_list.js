frappe.listview_settings['Load Tracking'] = {
	add_fields: ["status"],
	get_indicator: function (doc) {
		if (doc.status === "Collecting") {
			// Closed
			return [__(doc.status), "orange", "status,=,Collecting"];
		} else if (doc.status === "Collected") {
			// Closed
			return [__(doc.status), "orange", "status,=,Collected"];
		} else if (doc.status === "In Transit") {
			// Closed
			return [__(doc.status), "orange", "status,=,In Transit"];
		} else if (doc.status === "Bay Bill") {
			// Closed
			return [__(doc.status), "orange", "status,=,Bay Bill"];
		} else if (doc.status === "Delivered") {
			// Closed
			return [__(doc.status), "green", "status,=,Delivered"];
		}

	},
};
