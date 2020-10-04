import frappe

def get_context(context):
    context['url'] = frappe.utils.get_url()
    context['url_login'] = frappe.utils.get_url() + "/login"