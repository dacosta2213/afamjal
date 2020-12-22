# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "afamjal"
app_title = "Afamjal"
app_publisher = "Kire Informatica"
app_description = "Desarrollo para AFAMJAL"
app_icon = "octicon octicon-file-directory"
app_color = "brown"
app_email = "soporte@kireinformatica.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/afamjal/css/afamjal.css"
app_include_js = "/assets/afamjal/js/afamjal.js"

# include js, css files in header of web template
# web_include_css = "/assets/afamjal/css/afamjal.css"
# web_include_js = "/assets/afamjal/js/afamjal.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {
    "Sales Order" : "public/js/so_afamjal.js",
    "Payment Entry" : "public/js/pe_afamjal.js",
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
# get_website_user_home_page = "afamjal.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "afamjal.install.before_install"
# after_install = "afamjal.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "afamjal.notifications.get_notification_config"

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
	"Payment Entry": {
		"on_submit": "afamjal.api.finalizar_pago",
		"on_cancel": "afamjal.api.cancelar_pago",
		"on_update": "afamjal.api.update_pe",
	},
	"Sales Order": {
		"on_submit": "afamjal.api.finalizar_so",
		"before_save": "afamjal.api.update_so"
	}
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"afamjal.tasks.all"
# 	],
# 	"daily": [
# 		"afamjal.tasks.daily"
# 	],
# 	"hourly": [
# 		"afamjal.tasks.hourly"
# 	],
# 	"weekly": [
# 		"afamjal.tasks.weekly"
# 	]
# 	"monthly": [
# 		"afamjal.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "afamjal.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "afamjal.event.get_events"
# }
