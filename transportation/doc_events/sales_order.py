import frappe


def generate_remaining_quantities(doc, method):
    for i in doc.items:
        i.load_tracking_qty = i.qty
        # if check_existing(i.item_code, i.rate, doc):
        #
        #     doc.append("remaining_quantities",{
        #         "item": i.item_code,
        #         "item_name": frappe.db.get_value("Item", i.item_code, "item_name"),
        #         "rate": i.rate,
        #         "qty": i.qty
        #     })
    doc.load_tracking_available = 1

@frappe.whitelist()
def generate_load_tracking(doc):
    import json
    data = json.loads(doc)
    print(data)
    print(data['source_location'])


