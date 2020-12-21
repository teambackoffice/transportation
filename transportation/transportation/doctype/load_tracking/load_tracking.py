# -*- coding: utf-8 -*-
# Copyright (c) 2020, jan and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import cstr
from frappe.core.doctype.sms_settings.sms_settings import send_sms
from iwhatsapp.iwhatsapp.doctype.iwhatsapp_settings.iwhatsapp_settings import send_whatsapp
from datetime import datetime
class LoadTracking(Document):
    def validate(self):
        name_ = self.name.split("-")
        year = datetime.now().date().year
        print("YEAR")
        print(year)
        self.shipment_number = "3EX-" + str(year) +"-" + name_[2]
    def on_submit(self):
        frappe.get_doc({
            "doctype": "Load Tracking Locations",
            "parent": self.name,
            "parentfield": "load_tracking_locations",
            "parenttype": "Load Tracking",
            "status": "Collecting",
            "location_time": datetime.now(),
            "idx": 5
        }).insert()
        self.reload()
    def update_status(self, status):
        print("===========================================")
        print("Your shipment " + cstr(self.shipment_number) + " " + cstr(status) + " from " + cstr(self.source_location))
        frappe.db.sql(""" UPDATE `tabLoad Tracking` SET status=%s WHERE name=%s""", (status, self.name))
        frappe.db.commit()
        get_idx = frappe.db.sql(""" SELECT COUNT(*) as idx_count FROM `tabLoad Tracking Locations` WHERE parent=%s """, self.name, as_dict=1)
        frappe.get_doc({
            "doctype": "Load Tracking Locations",
            "parent": self.name,
            "parentfield": "load_tracking_locations",
            "parenttype": "Load Tracking",
            "status": status,
            "location_time": datetime.now(),
            "idx": 5 - get_idx[0].idx_count
        }).insert()
        receiver_list = [self.mobile_number]
        send_whatsapp(receiver_list, "Your shipment " + cstr(self.shipment_number) + " " + cstr(status) + " from " + cstr(self.source_location))


    def on_cancel(self):
        frappe.db.sql(""" UPDATE `tabLoad Tracking` SET status=%s WHERE name=%s""", ("Cancelled", self.name))
        frappe.db.commit()