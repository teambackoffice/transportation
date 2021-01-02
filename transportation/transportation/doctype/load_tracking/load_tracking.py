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
        for i in self.items:
            remaining_q = frappe.db.sql(""" 
                                SELECT * FROM `tabSales Order Item` 
                                WHERE parent=%s and item_code=%s and rate=%s""",(self.sales_order, i.item_code,i.rate),as_dict=1)
            if len(remaining_q) > 0:
                frappe.db.sql(""" 
                        UPDATE `tabSales Order Item` SET load_tracking_qty=%s 
                        WHERE parent=%s and item_code=%s and rate=%s""", (remaining_q[0].load_tracking_qty - i.qtys,self.sales_order,i.item_code,i.rate))
                frappe.db.commit()
        remaining_quantities_check = frappe.db.sql(""" SELECT COUNT(*) as count FROM `tabSales Order Item` WHERE parent=%s and load_tracking_qty > 0""", self.sales_order,as_dict=1)
        if remaining_quantities_check[0].count == 0:
            frappe.db.sql(""" UPDATE `tabSales Order` SET load_tracking_available=0 WHERE name=%s""", self.sales_order)
            frappe.db.commit()
        self.reload()

    def update_status(self, status):
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

    def send_message(self, status, description, location, time):
        receiver_list = [self.mobile_number]
        message = "Your Shipment " + cstr(self.shipment_number) + " " + cstr(status) + "\n\n" +\
                  "Time : " + time +"\n" +\
                  "Location : " + location + "\n" +\
                  "Remarks : " + description +"\n" +\
                  "From location : " + self.source_location +"\n" +\
                  "To Location : " + self.destination_location

        send_whatsapp(receiver_list,message)

    def on_cancel(self):
        frappe.db.sql(""" UPDATE `tabLoad Tracking` SET status=%s WHERE name=%s""", ("Cancelled", self.name))
        frappe.db.sql(""" UPDATE `tabSales Order` SET load_tracking_available=0 WHERE name=%s""", (self.sales_order))
        frappe.db.commit()