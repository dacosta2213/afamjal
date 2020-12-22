frappe.ui.form.on('Payment Entry', {
	cargar_lineas: function(frm) {
       frappe.call({
         method: 'afamjal.api.add_pe_lineas',
         args:{
           name: frm.doc.name
         },
         callback: function(r){
           console.log(r)
           cur_frm.reload_doc()
         }
       })
 },
 refresh: function(frm) {
		 $(frm.doc.pagos_contrato).each(function(index){
			 console.log(this.payment_amount)
			 console.log(this.abonar)
			 if (this.abonar > this.payment_amount) {
				 	frappe.throw('Se esta abonando un monto mayor al requerido.')
			 }

		 })
    console.log('refresh')
      // frm.set_query('payment_schedule', () => {
			//
      //     return {
      //         filters: {
      //             parent: frm.doc.sales_order,
      //             parenttype: 'Sales Order'
      //         }
      //     }
      // })
	},
	on_submit: function() {
		console.log('sumiteado')
	},
	after_cancel: function() {
		console.log('cancelado')
	}
})
