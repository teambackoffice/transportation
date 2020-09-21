import frappe

@frappe.whitelist()
def get_customer_transportation_list(customer_email,role, name):
    condition = ""
    selected_load_tracking = []
    selected = ""

    if not role:
        customer = frappe.db.sql(""" SELECT * FROM `tabCustomer` WHERE user_id=%s """, customer_email, as_dict=1)

        if len(customer) > 0:
            load_tracking = frappe.db.sql(""" SELECT * FROM `tabLoad Tracking` WHERE customer=%s and docstatus = 1""", customer[0].name, as_dict=1)
            if len(load_tracking) > 0:
                for i in load_tracking:
                    print(frappe.utils.get_url())
                    print('href="' + frappe.utils.get_url() + "/desk#Form/Load%20Tracking/" + i.name + '"')
                    i['view'] = '''onclick="view('{0}')"'''.format(i.name),
                    i['href'] = 'href="' + frappe.utils.get_url() + "/desk#Form/Load%20Tracking/" + i.name + '"'
                    if i.status in ["Collecting", "Collected", "In Transit", "Bay Bill"]:
                        i["status_color"] = 'style="margin-right: 8px;color: orange"'
                    elif i.status in ["Delivered"]:
                        i["status_color"] = 'style="margin-right: 8px;color: #98d85b"'
                    elif i.status in ["Cancelled"]:
                        i["status_color"] = 'style="margin-right: 8px;color: #ff5858"'


                if name:
                    selected = name
                    selected_load_tracking = frappe.db.sql(""" SELECT * FROM `tabLoad Tracking` WHERE customer=%s and name=%s""",
                                                           (customer[0].name, name), as_dict=1)
                else:
                    selected = load_tracking[0].name
                    selected_load_tracking.append(load_tracking[0])

                selected_load_tracking[0]['foreground'] = 'style="width: calc((100% - 140px) * 0.00); background: rgb(45, 194, 88);"' if selected_load_tracking[0].status == "Collecting" \
                                                            else 'style="width: calc((100% - 140px) * 0.25); background: rgb(45, 194, 88);"' if selected_load_tracking[0].status == "Collected" \
                                                            else 'style="width: calc((100% - 140px) * 0.50); background: rgb(45, 194, 88);"' if selected_load_tracking[0].status == "In Transit" \
                                                            else 'style="width: calc((100% - 140px) * 0.75); background: rgb(45, 194, 88);"' if selected_load_tracking[0].status == "Bay Bill" \
                                                            else 'style="width: calc((100% - 140px) * 1); background: rgb(45, 194, 88);"'

                selected_load_tracking[0][
                    'collecting_image'] = '<img src="files/check3.png" height="55" width="55" />' if \
                selected_load_tracking[0].status == "Collecting" \
                    else '<img src="files/check2.png" height="55" width="55" />' if selected_load_tracking[
                                                                                        0].status in ["Collected",
                                                                                                      "In Transit",
                                                                                                      "Bay Bill",
                                                                                                      "Delivered"] \
                    else '<img src="files/check4.jpg" height="55" width="55" />'
                selected_load_tracking[0][
                    'collected_image'] = '<img src="files/check3.png" height="55" width="55" />' if \
                selected_load_tracking[0].status == "Collected" \
                    else '<img src="files/check2.png" height="55" width="55" />' if selected_load_tracking[
                                                                                        0].status in ["In Transit",
                                                                                                      "Bay Bill",
                                                                                                      "Delivered"] \
                    else '<img src="files/check4.jpg" height="55" width="55" />'
                selected_load_tracking[0][
                    'in_transit_image'] = '<img src="files/check3.png" height="55" width="55" />' if \
                selected_load_tracking[0].status == "In Transit" \
                    else '<img src="files/check2.png" height="55" width="55" />' if selected_load_tracking[
                                                                                        0].status in ["Bay Bill",
                                                                                                      "Delivered"] \
                    else '<img src="files/check4.jpg" height="55" width="55" />'
                selected_load_tracking[0]['bay_bill_image'] = '<img src="files/check3.png" height="55" width="55" />' if \
                selected_load_tracking[0].status == "Bay Bill" \
                    else '<img src="files/check2.png" height="55" width="55" />' if selected_load_tracking[
                                                                                        0].status in ["Delivered"] \
                    else '<img src="files/check4.jpg" height="55" width="55" />'
                selected_load_tracking[0][
                    'delivered_image'] = '<img src="files/check3.png" height="55" width="55" />' if \
                selected_load_tracking[0].status == "Delivered" \
                    else '<img src="files/check4.jpg" height="55" width="55" />'
                return {
                   "load_tracking_list":  load_tracking,
                    "length": len(load_tracking),
                    "selected_load_tracking": selected_load_tracking,
                    "selected_load_tracking_length": len(selected_load_tracking),
                    "selected": selected
                }
            else:
                return {}
        else:
            frappe.throw("User is not a Customer")

    load_tracking = frappe.db.sql(""" SELECT * FROM `tabLoad Tracking` where docstatus = 1""",
                                  as_dict=1)
    for i in load_tracking:
        print(frappe.utils.get_url())
        print('href="' + frappe.utils.get_url() + "/desk#Form/Load%20Tracking/" + i.name + '"')
        i['view'] = '''onclick="view('{0}')"'''.format(i.name),
        i['href'] = 'href="' + frappe.utils.get_url() + "/desk#Form/Load%20Tracking/" + i.name + '"'
        if i.status in ["Collecting", "Collected", "In Transit", "Bay Bill"]:
            i["status_color"] = 'style="margin-right: 8px;color: orange"'
        elif i.status in ["Delivered"]:
            i["status_color"] = 'style="margin-right: 8px;color: #98d85b"'

        elif i.status in ["Cancelled"]:
            i["status_color"] = 'style="margin-right: 8px;color: #ff5858"'
    if name:
        selected = name

        selected_load_tracking = frappe.db.sql(""" SELECT * FROM `tabLoad Tracking` WHERE name=%s and docstatus = 1""",name, as_dict=1)
    else:
        selected = load_tracking[0].name

        selected_load_tracking.append(load_tracking[0])

    selected_load_tracking[0][
        'foreground'] = 'style="width: calc((100% - 140px) * 0.00); background: rgb(45, 194, 88);"' if \
    selected_load_tracking[0].status == "Collecting" \
        else 'style="width: calc((100% - 140px) * 0.25); background: rgb(45, 194, 88);"' if selected_load_tracking[
                                                                                                0].status == "Collected" \
        else 'style="width: calc((100% - 140px) * 0.50); background: rgb(45, 194, 88);"' if selected_load_tracking[
                                                                                                0].status == "In Transit" \
        else 'style="width: calc((100% - 140px) * 0.75); background: rgb(45, 194, 88);"' if selected_load_tracking[
                                                                                                0].status == "Bay Bill" \
        else 'style="width: calc((100% - 140px) * 1); background: rgb(45, 194, 88);"'

    selected_load_tracking[0]['collecting_image'] = '<img src="files/check3.png" height="55" width="55" />' if selected_load_tracking[0].status == "Collecting" \
                                                    else '<img src="files/check2.png" height="55" width="55" />' if selected_load_tracking[0].status in ["Collected", "In Transit", "Bay Bill", "Delivered"] \
                                                    else '<img src="files/check4.jpg" height="55" width="55" />'
    selected_load_tracking[0]['collected_image'] = '<img src="files/check3.png" height="55" width="55" />' if selected_load_tracking[0].status == "Collected" \
                                                    else '<img src="files/check2.png" height="55" width="55" />' if selected_load_tracking[0].status in ["In Transit", "Bay Bill", "Delivered"] \
                                                    else '<img src="files/check4.jpg" height="55" width="55" />'
    selected_load_tracking[0]['in_transit_image'] = '<img src="files/check3.png" height="55" width="55" />' if selected_load_tracking[0].status == "In Transit" \
                                                    else '<img src="files/check2.png" height="55" width="55" />' if selected_load_tracking[0].status in ["Bay Bill", "Delivered"] \
                                                    else '<img src="files/check4.jpg" height="55" width="55" />'
    selected_load_tracking[0]['bay_bill_image'] = '<img src="files/check3.png" height="55" width="55" />' if selected_load_tracking[0].status == "Bay Bill" \
                                                    else '<img src="files/check2.png" height="55" width="55" />' if selected_load_tracking[0].status in [ "Delivered"] \
                                                    else '<img src="files/check4.jpg" height="55" width="55" />'
    selected_load_tracking[0]['delivered_image'] = '<img src="files/check3.png" height="55" width="55" />' if selected_load_tracking[0].status == "Delivered" \
                                                    else '<img src="files/check4.jpg" height="55" width="55" />'
    return {
        "load_tracking_list": load_tracking,
        "length": len(load_tracking),
        "selected_load_tracking": selected_load_tracking,
        "selected_load_tracking_length": len(selected_load_tracking),
        "selected": selected
    }