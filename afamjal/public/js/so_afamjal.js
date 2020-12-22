frappe.ui.form.on("Payment Schedule", "iniciar_pago", function(frm, cdt, cdn) {
	let row = locals[cdt][cdn]
  console.log(row.name)
	// frappe.model.set_value(cdt, cdn, "monto", row.qty * row.precio_de_venta)
	frappe.call({
    method: 'afamjal.api.crear_pago',
    args:{
      item: row.name,
      customer: frm.doc.customer
    },
		callback: function (r) {
			console.log(r)
      frappe.model.set_value(cdt, cdn, "payment_entry", r.message)
		}
	})
})

frappe.ui.form.on('Sales Order', {
  cargar_lineas: function(frm) {
       frappe.call({
         method: 'afamjal.api.add_lineas',
         args:{
           name: frm.doc.name
         },
         callback: function(r){
           console.log(r)
           cur_frm.reload_doc()
         }
       })
 },
	validate: function(frm) {
		// frappe.errprint('En validei')
		// if (!cur_frm.doc.__islocal) {
		// 	frappe.errprint('no es local')
		// 		frappe.call({
		// 	      method: 'afamjal.api.validaciones_so',
		// 	      args:{
		// 	        name: frm.doc.name
		// 	      }
		// 		})
		// }
	},
	refresh: function(frm) {
			if (frm.doc.tipo_cliente === 'SOCIO'){
					if (frm.doc.cantidad_certificados > 0){
							frm.set_query('descuento', () => {
				          return {
				              filters: {
				                  parent: frm.doc.tipo_evento,
				                  tipo_descuento: 'Socio con Certificado'
				              }
				          }
				      })
					}

					if (frm.doc.cantidad_certificados_participacion > 0){
							frm.set_query('descuento', () => {
				          return {
				              filters: {
				                  parent: frm.doc.tipo_evento,
				                  tipo_descuento: 'Socio con Certificado de Participación'
				              }
				          }
				      })
					}

					if (frm.doc.cantidad_certificados_participacion == 0 && frm.doc.cantidad_certificados == 0){
							frm.set_query('descuento', () => {
				          return {
				              filters: {
				                  parent: frm.doc.tipo_evento,
				                  tipo_descuento: 'Socio(Sin Certificado)'
				              }
				          }
				      })
					}
			}

			if (frm.doc.tipo_cliente === 'GENERAL'){
					if (frm.doc.cantidad_certificados > 0){
							frm.set_query('descuento', () => {
				          return {
				              filters: {
				                  parent: frm.doc.tipo_evento,
				                  tipo_descuento: 'General con Certificado'
				              }
				          }
				      })
					}

					if (frm.doc.cantidad_certificados_participacion > 0){
							frm.set_query('descuento', () => {
				          return {
				              filters: {
				                  parent: frm.doc.tipo_evento,
				                  tipo_descuento: 'General con Certificado de Participación'
				              }
				          }
				      })
					}

					if (frm.doc.cantidad_certificados_participacion == 0 && frm.doc.cantidad_certificados == 0){
							frm.set_query('descuento', () => {
				          return {
				              filters: {
				                  parent: frm.doc.tipo_evento,
				                  tipo_descuento: 'General(No es socio y No tiene Certificado)'
				              }
				          }
				      })
					}
			}

	},
  tipo_cliente: function(frm) {
		frm.set_value('taxes_and_charges',frm.doc.tipo_cliente)
		frm.save()
	},
  descuento: function(frm) {
    frappe.call({
      method: 'afamjal.api.descuento',
      args:{
        name: frm.doc.name,
        descuento: frm.doc.descuento
      },
      callback: function(r){
        console.log(r.message[0].cantidad)
        frm.set_value('additional_discount_percentage', r.message[0].cantidad)
        // cur_frm.reload_doc()
      }
    })



  }
})
