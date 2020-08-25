# -*- coding: utf-8 -*-
# Copyright (c) 2020, jan and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from erpnext.stock.stock_ledger import get_previous_sle

from datetime import datetime

class PreInvoice(Document):
	def generate_si(self):
		doc_si = {
			"doctype": "Sales Invoice",
			"customer": self.customer,
			"items": self.get_si_items(),
		}
		si = frappe.get_doc(doc_si)
		si.insert(ignore_permissions=1)
		return si.name

	def get_si_items(self):
		obj = {
			'item_code': self.item_code,
			'item_name': self.get_item_value("item_name"),
			'description': self.get_item_value("description"),
			'qty': self.qty,
			'uom': "Nos",
			'rate': self.rate,
			'cost_center': self.cost_center,
			'income_account': self.income_account
		}

		return [obj]

	def get_item_value(self, field):
		items = frappe.db.sql(""" SELECT * FROM `tabItem` WHERE name=%s """, self.item_code, as_dict=1)
		return items[0][field]
@frappe.whitelist()
def get_rate(item_code, warehouse, based_on,price_list):
	time = datetime.now().time()
	date = datetime.now().date()
	balance = 0
	if warehouse:
		previous_sle = get_previous_sle({
			"item_code": item_code,
			"warehouse": warehouse,
			"posting_date": date,
			"posting_time": time
		})
		# get actual stock at source warehouse
		balance = previous_sle.get("qty_after_transaction") or 0

	condition = ""
	if price_list == "Standard Buying":
		condition += " and buying = 1 "
	elif price_list == "Standard Selling":
		condition += " and selling = 1 "

	query = """ SELECT * FROM `tabItem Price` WHERE item_code=%s {0} ORDER BY valid_from DESC LIMIT 1""".format(condition)

	item_price = frappe.db.sql(query,item_code, as_dict=1)
	rate = item_price[0].price_list_rate if len(item_price) > 0 else 0
	print(based_on)
	if based_on == "Valuation Rate":
		print("WALA DIR")
		item_price = frappe.db.sql(
			""" SELECT * FROM `tabItem` WHERE item_code=%s""",
			item_code, as_dict=1)
		rate = item_price[0].valuation_rate if len(item_price) > 0 else 0

	return rate, balance
