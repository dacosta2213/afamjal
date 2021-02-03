from __future__ import unicode_literals
import frappe
import json
from frappe import _
from frappe.utils import get_fullname, get_link_to_form, get_url_to_form
from datetime import date,datetime,timedelta
import jwt
import time


# RG - Procesos Update PE - 8Dic 2020
@frappe.whitelist()
def update_pe(doc,method):
    frappe.errprint('update_pe')
    if len(doc.references) > 1 and doc.naming_series == "PAGO CONTRATO-":
        frappe.throw('En documentos con referencia PAGO CONTRATO no puede haber mas de 1 documento relacionado.')

    # if doc.naming_series == "PAGO CONTRATO-" and doc.pagos_contrato:
    #     for p in doc.pagos_contrato:
    #         if int(p.abonar) > int(p.payment_amount):
    #             frappe.throw('Se esta abonando un monto mayor al requerido.')

# RG - Procesos Submit SO- 9Dic 2020
@frappe.whitelist()
def finalizar_so(doc,method):
    frappe.errprint(method)
    # if len(doc.items) > 1:
    #     frappe.throw('Hay mas de 1 concepto en el contrato.')

# RG - Procesos Update SO- 9Dic 2020
@frappe.whitelist()
def update_so(doc,method):
    frappe.errprint(method)
    # doc = frappe.get_doc('Sales Order', name)
    clave = frappe.db.get_value('Customer', doc.customer, doc.naming_series)
    doc.referencia = str(doc.naming_series) + str(doc.clave) + str(clave)
    #
    # if len(doc.items) > 1:
    #     frappe.throw('Hay mas de 1 concepto en el contrato.')

    for p in doc.payment_schedule:
        if doc.delivery_date < p.due_date:
            frappe.throw('Alguna de las fechas de pago es mayor a la fecha de validacion: ' +  str(p.due_date))

    doc.notify_update()


# RG -8Dic2020- Cargar lineas de SO al PE
@frappe.whitelist()
def add_pe_lineas(name):
    doc = frappe.get_doc('Payment Entry', name)
    # frappe.errprint(doc.references[0].reference_name)
    existe =  frappe.db.sql(""" SELECT name from `tabPagos Contrato` WHERE parent=%s""", (doc.name), as_dict=1)
    if existe:
        frappe.throw('Ya existen lineas de pago. Para volver a cargar, borre las lineas existentes.')
        # return
    lineas = frappe.db.sql(""" SELECT payment_term,description,due_date,invoice_portion,payment_amount,status from `tabPayment Schedule` WHERE parenttype="Sales Invoice" AND parent=%s ORDER BY due_date ASC""", (doc.references[0].reference_name), as_dict=1)
    # frappe.errprint(lineas)
    for l in lineas:
        frappe.errprint(l.payment_term)
        if l.status != "PAGADO":
            doc.append("pagos_contrato", {
    			"payment_term": l.payment_term,
    			"description": l.description,
    			"due_date": l.due_date,
    			"invoice_portion": l.invoice_portion,
    			"payment_amount": l.payment_amount
    		})

    doc.save()
    # doc.reload()
    return ('dato actualizado')

# RG - Procesos posteriores al submit del payment entry - 27nov 2020
@frappe.whitelist()
def finalizar_pago(pe,method):
    if pe.naming_series == "PAGO CONTRATO-":
        abonos = 0
        for p in pe.pagos_contrato:
            abonos = abonos + p.abonar
            # if p.abonar > p.payment_amount:
            #     frappe.throw('Se esta abonando un monto mayor al requerido.')
            if p.abonar == p.payment_amount:
                frappe.db.sql("UPDATE `tabPayment Schedule` SET status= 'PAGADO', payment_entry =%s WHERE  payment_term= %s AND parent= %s", ( pe.name,p.payment_term,pe.references[0].reference_name) )
            if p.abonar > 0 and p.abonar < p.payment_amount:
                saldo = p.payment_amount - p.abonar
                frappe.db.sql("UPDATE `tabPayment Schedule` SET payment_entry =%s, payment_amount=%s WHERE  payment_term= %s AND parent= %s", ( pe.name,saldo,p.payment_term,pe.references[0].reference_name) )
            frappe.db.commit()
        frappe.errprint(abonos)
        frappe.errprint(pe.paid_amount)

        if abonos == 0:
            frappe.throw('Es necesario ingresar al menos un abono en la seccion DISPERSION DE PAGOS DEL CONTRATO.')

        if abonos != pe.paid_amount:
            frappe.throw('El valor de los abonos es distinto al valor abonado.')
    pe.reload()


# RG - Procesos posteriores al CANCELAR payment entry - 27NOV 2020
@frappe.whitelist()
def cancelar_pago(pe,method):
    if pe.payment_schedule:
        frappe.db.sql("UPDATE `tabPayment Schedule` SET status= 'CANCELADO', payment_entry =%s WHERE  name= %s AND parent= %s", (pe.name,pe.payment_schedule,pe.sales_order) )
        frappe.db.commit()
        frappe.errprint('finaliza cancelacion')


# RG-Generar pago express desde Fees - NO USAR - 26Nov2020
@frappe.whitelist()
def crear_pago(item,customer):
    frappe.errprint(item)
    new_pe = frappe.new_doc("Payment Entry")
    new_pe.contrato = item
    new_pe.party = customer

    new_pe.flags.ignore_mandatory = True
    new_pe.flags.ignore_links=True
    new_pe.flags.ignore_validate = True
    new_pe.insert()
    return new_pe.name


@frappe.whitelist()
def descuento(name,descuento=None):
    if not descuento:
        return
    doc = frappe.get_doc('Sales Order', name)
    frappe.errprint(doc.descuento)
    existe =  frappe.db.sql(""" SELECT cantidad from `tabTipo Evento Descuento` WHERE parent=%s AND name=%s""", (doc.tipo_evento,descuento), as_dict=1)
    frappe.errprint(existe[0].cantidad)
    factor = existe[0].cantidad * 0.01
    # descuento = (doc.items[0].price_list_rate * doc.items[0].qty ) / existe[0].cantidad
    descuento = doc.items[0].amount *  factor
    frappe.errprint(descuento)
    return descuento
    # if existe:
    #     frappe.errprint('ya existen lineas')
    #     return
#
# @frappe.whitelist()
# def validaciones_so(name):


@frappe.whitelist()
def cuotas(name='I00010'):
    doc = frappe.get_doc('Sales Order', name)
    if len(doc.items) == 0:
        frappe.throw('No existen conceptos en el contrato. Cargar 1 concepto antes de aplicar la cuota')
    doc.append("items", {
			"item_code": "CUOTA Contratos" ,
			"qty": 1,
			"rate": doc.cuota * -1
		})
    doc.append("taxes", {
			"charge_type": "Actual" ,
			"account_head": "2202011001 - Cuotas Por Devengar - ERP",
			"description": "Cuota",
            "tax_amount": doc.cuota
		})
    doc.aplicar_cuota = 1
    doc.save()
    frappe.msgprint('Cuota Aplicada')
    return



# RG -NOV242020- Traer todas las lineas
# On validate - get items from Tipo Evento Item del parent frm.doc.tipo_evento
#  append al self.items
#  cantidad 1
#  rate desde (get value de precio_base de DT  Periodos de Venta del parent item WHERE item and delivery_date BETWEEN fecha_inicio AND fecha_fin


@frappe.whitelist()
def add_lineas(name='I00010'):
    doc = frappe.get_doc('Sales Order', name)
    # if not doc.tipo_cliente:
    #     frappe.throw('Es necesario establecer el Tipo Cliente')
    existe =  frappe.db.sql(""" SELECT name from `tabSales Order Item` WHERE parent=%s""", (doc.name), as_dict=1)
    if existe:
        frappe.errprint('ya existen lineas')
        return

    # if doc.tipo_cliente == "GENERAL":
    #     item_code = "NO ES SOCIO"
    #     p_base = frappe.db.sql(""" SELECT precio_base from `tabPeriodos de Venta` WHERE parent=%s AND %s BETWEEN fecha_inicio AND fecha_fin""", (item_code,doc.delivery_date), as_dict=1)
    #     if p_base:
    #         rate = p_base[0].precio_base
    #     else:
    #         p_base = frappe.db.sql(""" SELECT precio_base from `tabPeriodos de Venta` WHERE parent=%s LIMIT 1""", (item_code), as_dict=1)
    #         if not p_base:
    #             frappe.throw("No existe ningun precio registrado en la tabla Periodos de Venta")
    #         rate = p_base[0].precio_base
    #     doc.append("items", {
	# 		"item_code": item_code ,
	# 		"qty": 1,
	# 		"rate": rate
	# 	})
    lineas = frappe.db.sql(""" SELECT item_code from `tabTipo Evento Item` WHERE parent=%s""", (doc.tipo_evento), as_dict=1)
    for l in lineas:
        p_base = frappe.db.sql(""" SELECT precio_base from `tabPeriodos de Venta` WHERE parent=%s AND %s BETWEEN fecha_inicio AND fecha_fin""", (l.item_code,doc.delivery_date), as_dict=1)
        if p_base:
            rate = p_base[0].precio_base
            frappe.errprint(p_base[0].precio_base)
        else:
            p_base = frappe.db.sql(""" SELECT precio_base from `tabPeriodos de Venta` WHERE parent=%s LIMIT 1""", (l.item_code), as_dict=1)
            if not p_base:
                frappe.throw("No existe ningun precio registrado en la tabla Periodos de Venta para alguna de las lineas")
            rate = p_base[0].precio_base
            frappe.errprint(l.item_code)
        doc.append("items", {
			"item_code": l.item_code,
			"qty": 1,
			"rate": rate
		})

    doc.save()
    return ('dato actualizado')

        # frappe.errprint(p_base.precio_base)
