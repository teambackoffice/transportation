# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "transportation"
app_title = "Transportation"
app_publisher = "jan"
app_description = "Transportation"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "janlloydangeles@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css_custom files in header of desk.html
# app_include_css = {
#     "assets/transportation/css/bootstrap.css",
#     "assets/transportation/css/style.css",
#     "assets/transportation/css/fonts.css"
# }
# include js, css files in header of web template
# web_include_css = "/assets/transportation/css/transportation.css"
# web_include_js = "/assets/transportation/js/transportation.js"

# include js, css_custom files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}
# include js in page
# page_js = {"page" : "public/js/file.js"}
# include js in doctype views
doctype_js = {
    "Quotation" : "public/quotation.js",
    "Sales Order" : "public/sales_order.js"
}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "transportation.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "transportation.install.before_install"
# after_install = "transportation.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "transportation.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	"Sales Order": {
		"validate": "transportation.doc_events.sales_order.generate_remaining_quantities",
	}
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"transportation.tasks.all"
# 	],
# 	"daily": [
# 		"transportation.tasks.daily"
# 	],
# 	"hourly": [
# 		"transportation.tasks.hourly"
# 	],
# 	"weekly": [
# 		"transportation.tasks.weekly"
# 	]
# 	"monthly": [
# 		"transportation.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "transportation.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "transportation.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "transportation.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]


fixtures = [
    {
        "doctype": "Custom Field",
        "filters": [
            [
                "name",
                "in",
                [
                    "Sales Order-destination_location",
                    "Sales Order-source_location",
                    "Customer-user_id",
                    "Sales Order Item-load_tracking_qty",
                    "Sales Order-load_tracking_available",
                ]
            ]
        ]
    }
]