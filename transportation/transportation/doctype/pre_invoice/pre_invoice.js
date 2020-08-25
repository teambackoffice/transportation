// Copyright (c) 2020, jan and contributors
// For license information, please see license.txt

frappe.ui.form.on('Pre Invoice', {
	refresh: function(frm) {
	     cur_frm.set_query('income_account', () => {
            return {
                filters: {
                    is_group: 0,
                }
            }
        });
	     cur_frm.set_query('cost_center', () => {
            return {
                filters: {
                    is_group: 0,
                }
            }
        });
        if(cur_frm.doc.docstatus && cur_frm.doc.pre_invoice_status === "Completed"){
            cur_frm.set_df_property("pre_invoice_status", "read_only",1)
            frm.add_custom_button(__("Sales Invoice"), () => {
                    cur_frm.call({
                        doc: cur_frm.doc,
                        method: 'generate_si',
                        freeze: true,
                        freeze_message: "Generating Sales Invoice ...",
                        callback: (r) => {
                            cur_frm.reload_doc()
                            frappe.set_route("Form", "Sales Invoice", r.message);
                        }
                    })

            }, "Create")
        }
	}
});

cur_frm.cscript.cost = function () {
    compute_scoop_of_work(cur_frm)
    compute_pre_invoice_rate(cur_frm)
}
cur_frm.cscript.scoop_of_work_remove = function (frm,cdt,cdn) {
        compute_scoop_of_work(cur_frm)
    compute_pre_invoice_rate(cur_frm)
}
function compute_scoop_of_work(cur_frm) {
    var total = cur_frm.doc.scoop_of_work.reduce((a, b) => a + (b['cost'] || 0), 0)
    cur_frm.doc.sow_total = total
    cur_frm.refresh_field("sow_total")
}
function compute_raw_material(cur_frm) {
    var total = cur_frm.doc.raw_material.reduce((a, b) => a + (b['amount_raw'] || 0), 0)
    cur_frm.doc.raw_material_total = total
    cur_frm.refresh_field("raw_material_total")
}
function compute_pre_invoice_rate(cur_frm) {

    cur_frm.doc.rate = parseFloat(cur_frm.doc.sow_total) + parseFloat(cur_frm.doc.raw_material_total)
    cur_frm.doc.amount = (parseFloat(cur_frm.doc.sow_total) + parseFloat(cur_frm.doc.raw_material_total)) * cur_frm.doc.qty
    cur_frm.refresh_field("rate")
    cur_frm.refresh_field("amount")
}

cur_frm.cscript.qty = function (frm,cdt, cdn) {
compute_pre_invoice_rate(cur_frm)
}
cur_frm.cscript.item_code_raw = function (frm,cdt, cdn) {

    var d = locals[cdt][cdn]
    if(d.item_code_raw){


        frappe.call({
            method: "transportation.transportation.doctype.pre_invoice.pre_invoice.get_rate",
            args: {
                item_code: d.item_code_raw,
                warehouse: d.warehouse ? d.warehouse : "",
                based_on: cur_frm.doc.rate_of_materials_based_on ? cur_frm.doc.rate_of_materials_based_on : "",
                price_list: cur_frm.doc.price_list ? cur_frm.doc.price_list : ""

            },
            callback: function (r) {
                frappe.db.get_doc("Item", d.item_code_raw)
                    .then(doc => {
                       d.umo = doc.stock_uom
                        cur_frm.refresh_field("raw_material")
                    })
                d.rate_raw = r.message[0]
                d.amount_raw = r.message[0] * d.qty_raw
                d.available_qty_raw = r.message[1]
                cur_frm.refresh_field("raw_material")
                compute_raw_material(cur_frm)
                compute_pre_invoice_rate(cur_frm)
            }
        })
    }

}
cur_frm.cscript.warehouse = function (frm,cdt, cdn) {

    var d = locals[cdt][cdn]
    if(d.item_code_raw){


        frappe.call({
            method: "transportation.transportation.doctype.pre_invoice.pre_invoice.get_rate",
            args: {
                item_code: d.item_code_raw,
                warehouse: d.warehouse ? d.warehouse : "",
                based_on: cur_frm.doc.rate_of_materials_based_on ? cur_frm.doc.rate_of_materials_based_on : "",
                price_list: cur_frm.doc.price_list ? cur_frm.doc.price_list : ""

            },
            callback: function (r) {
                frappe.db.get_doc("Item", d.item_code_raw)
                    .then(doc => {
                       d.umo = doc.stock_uom
                        cur_frm.refresh_field("raw_material")
                    })
                d.rate_raw = r.message[0]
                d.amount_raw = r.message[0] * d.qty_raw
                d.available_qty_raw = r.message[1]
                cur_frm.refresh_field("raw_material")
                compute_raw_material(cur_frm)
                compute_pre_invoice_rate(cur_frm)
            }
        })
    }

}