## Afamjal

Desarrollo para AFAMJAL

## Change Log
#### 22-Dic-2020
Quitar los espacios en blanco  - Listo.
Referencia no aparece - Listo y Corregido. Habia una validación equivocada en el print format.
Imagen (logo)  no aparece en PDF - Parece ser un problema debido a que la instancia no tiene un certificado SSL valido...Le podrias aplicar un cert para que genera la imagen?
Aplicar cuota - Crear checkmark para que el usuario tenga control sobre la aplicacion de cuotas. En base a esto se aplicara la cuota
Proceso de aplicacion de Cuotas - Cuando no es socio, aplicamos la cuota en base a esta regla:
Aplicación de pagos - Debido a que crean un SINV vs el SO antes de aplicar los pagos, requerimos mover la aplicacion de pagos a sales invoice (los cambios en payment entry para identificar y ligar contra los terminos de pago)….Aclaracion: nunca se paga vs el sales order, siempre vs el SINV

#### 10-Dic-2020
PAYMENT ENTRY
- [x] Mostrar tabla de pagos NO PAGADOS en payment entry para que el usuario seleccione y asigne la dispersion de montos a aplicar.
- [x] Validar que solo se muestren los pagos que no están saldados (“los no pagados”)
- [x] Mandatorio que llenen la tabla
- [x] Restringir el pago a 1 sola linea según la  SECUENCIA PAGO CONTRATO

EN CONTRATO (SALES ORDER)
- [x] Al validar - Generar la referencia
- [x] Al validar (submit)  el Sales Order - Validar que ninguna de las fechas de vencimiento de los pagos nunca debe de ser mayor doc.delivery_date
- [x] Restringir la lista dinámica de los descuentos en base a las variables CANTIDAD CERTIFICADOS y  CANTIDAD CERTIFICADOS PARTICIPACION descritas en el contrato.
- [x] Mostrar el nombre (descripción)  del descuento - debajo de la selección de descuentos
- [x] Cambiar códigos bancarios a Select del 0 al 9  (quitar decimales en codigo bancario) del perfil del Customer
- [x] Crear Sales and Taxes charges templates para la autoseleccion de Cuota de cliente cuando el tipo de cliente sea GENERAL. Cuando el cliente es socio, solo se aplicara el template de IVA sin agregar la cuota.
- [x] Importante Dany - Agregar los campos K y de M a W descritos en el contrato al Sales Order para integrarlos a la impresion


#### License

MIT
