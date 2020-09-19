# -*- coding: utf-8 -*-
# Copyright (c) 2020, jan and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import cstr
from frappe.core.doctype.sms_settings.sms_settings import send_sms
from iwhatsapp.iwhatsapp.doctype.iwhatsapp_settings.iwhatsapp_settings import send_whatsapp

from pygeocoder import Geocoder
import pandas as pd
import numpy as np

from geopy.geocoders import Nominatim

class LoadTracking(Document):
    def update_status(self, status):
        frappe.db.sql(""" UPDATE `tabLoad Tracking` SET status=%s WHERE name=%s""", (status, self.name))
        frappe.db.commit()
        receiver_list = [self.mobile_number]
        send_whatsapp(receiver_list, cstr(status))
        # geolocator = Nominatim(user_agent="transportation")
        # location = geolocator.reverse("8.163108, 125.123109")
        # print(location.address)

    def on_cancel(self):
        frappe.db.sql(""" UPDATE `tabLoad Tracking` SET status=%s WHERE name=%s""", ("Cancelled", self.name))
        frappe.db.commit()