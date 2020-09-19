var page = ""
frappe.pages['customer-transportat'].on_page_load = function(wrapper) {
	page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Customer Transportation List',
		single_column: false
	});
	page.set_title('Customer View')
	console.log("PAGGGGGE")
	console.log(page)
	if(frappe.boot.user.roles.includes("Customer")){
		frappe.call({
			method: "transportation.transportation.page.customer_transportat.customer_transportat.get_customer_transportation_list",
			args: {
				customer_email: frappe.boot.user.email,
				role: frappe.boot.user.roles.includes("System Manager"),
				name: ""
			},
			freeze: true,
			freeze_message: "Fetching Customer Transportation List...",
			async: false,
			callback: function(resp) {
				console.log(resp.message)
				page.main.html(frappe.render_template("customer_transportat", { 'doc': resp.message }));
			}
		});
	}

}

function view(name) {
	if(frappe.boot.user.roles.includes("Customer")){
		frappe.call({
			method: "transportation.transportation.page.customer_transportat.customer_transportat.get_customer_transportation_list",
			args: {
				customer_email: frappe.boot.user.email,
				role: frappe.boot.user.roles.includes("System Manager"),
				name: name
			},
			freeze: true,
			freeze_message: "Fetching Customer Transportation List...",
			async: false,
			callback: function(resp) {
				console.log(resp.message)
				page.main.html(frappe.render_template("customer_transportat", { 'doc': resp.message }));
			}
		});
	}
}