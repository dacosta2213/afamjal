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
  aplicar_cuota: function(frm) {
       frappe.call({
         method: 'afamjal.api.cuotas',
         args:{
           name: frm.doc.name
         },
         callback: function(r){
           console.log(r)
           frm.reload_doc()
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
	setup: function(frm) {
			if (frm.doc.tipo_cliente === 'SOCIO'){
					console.log('es cliente SOCIO')
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
				console.log('es cliente general')
					if (frm.doc.cantidad_certificados > 0){
							console.log('cantidad_certificados > 0')
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
							console.log('cantidad_certificados_participacion > 0')
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
							console.log('Ningun Cert')
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
					  console.log(r.message)
					frm.set_value('discount_amount', r.message)

        // frm.set_value('additional_discount_percentage', r.message[0].cantidad)

        // cur_frm.reload_doc()
      }
    })



  }
})

frappe.ui.form.on('Sales Order', {
	refresh: function(frm) {
		frm.set_value("total_contratado", frm.doc.grand_total*1);
	}
});


//frappe.ui.form.on("Sales Order", "before_submit", function(frm, cdt, cdn) {
//if (frm.doc.suma_total != frm.doc.total_contratado) {
//frappe.throw("La cantidad de la suma total es diferente al total contratado");
//return false;
//} });
