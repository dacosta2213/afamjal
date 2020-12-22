$(document).ready(function() {
	//CARGAR LOS TEMPLATES para el header
	$('header').prepend(frappe.render_template("logo"));
	$('header .navbar .container').prepend(frappe.render_template("sidebar-toggle"));

	//
	if (frappe.user.has_role('Mapas')) {
	$('.main-section').append(frappe.render_template("mapas"));
	} else {
		$('.main-section').append(frappe.render_template("totall"));
	}

	$('#help-links').parent().append(frappe.render_template("ayuda"));
	$(".js-modal-btn").modalVideo();

	//PERSONALIZACION DEL HEADER
	$('header').addClass('main-header');
	$('header .navbar').removeClass('navbar-fixed-top');
	$('body').addClass('skin-blue sidebar-mini sidebar-collapse');
	$('#body_div').addClass('content-wrapper');

	// RG-Pa borrar los items del help menu
	// $("#navbar-search").hide();
	$("[data-link-type=documentation]").hide();
	$("[data-link-type=forum]").hide();
	$("[href='https://gitter.im/frappe/erpnext']").hide();
	$("[href='#background_jobs']").hide();
	$("[href='https://github.com/frappe/erpnext/issues']").hide();
	$("[onclick='return frappe.ui.toolbar.show_about();']").hide()
	$("[rel='noopener noreferrer']").hide();

	// RG- Borrar el icono de explore
	$("[data-name='Explore']").hide();
	$("[href='https://erpnext.com?source=website_footer']").hide();

	// $('.navbar-nav > li > .dropdown-menu').append(frappe.render_template("ayuda"));


	// RG- IConos para cuando no hay resultados y otros eventos
	robot = "/assets/totall/images/robot1.svg";
	$('.no-result').prepend('<img class="message-page-image" src=robot width="20%">');

	// posix.set_user_background();

	// FORMATTERS   - ejemplos - https://frappe.io/docs/user/en/guides/desk/formatter_for_link_fields
	frappe.form.link_formatters['Patient'] = function(value, doc) {
		if(doc && doc.patient_name && doc.patient_name !== value) {
			return value? value + ': ' + doc.patient_name: doc.patient_name;
		} else {
			return value;
		}
	}
});

	// crisp.io
	//window.$crisp=[];window.CRISP_WEBSITE_ID="20268af8-fa31-405d-9563-70e22826a2e6";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
	window.$crisp=[];window.CRISP_WEBSITE_ID="b442aa50-6807-41aa-a973-eba7112ffc7d";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
frappe.provide("totall");

frappe.templates["logo"] = '<div data-toggle="offcanvas" role="button">'
+'<a href="/desk#List/Patient Appointment/Calendar" class="logo">'
+'<span class="logo-mini"><b>bd</b></span>'
+'<span class="logo-lg"><b>bdoop</b></span>'
+'</a></div>';

frappe.templates["sidebar-toggle"] = '';

frappe.templates["ayuda"] = '<li><a></a></li>'
+'<li class="divider documentation-links"></li>'
// +'<li><a href="https://www.youtube.com/playlist?list=PLnzRJvOjHWWI7DgtvB1t5Xxa2J3n1Zwcv" target="_blank">Videos de Ayuda</a></li>'
+'<li><a href="http://totall.mx">Enviar Mail a Soporte</a></li>'
+'<li><a href="http://totall.mx" target="_blank">Abrir Ticket de Soporte</a></li>'
+ '<li class="divider documentation-links"></li>'
// + '<li><a href="https://api.whatsapp.com/send?phone=526868411224&text=Necesito%20ayuda!" target="_blank">Ayuda por WhatsApp</a></li>'
// +'<li><a href="https://appear.in/posix" target="_blank">Soporte Remoto (Usar Chrome)</a></li>'
+ '<li class="divider documentation-links"></li>'
+'<li><a href="http://totall.mx">Desarrollado por TOTALL.MX</a><a>Horario de Soporte de 8 AM a 5 PM</a></li>'
;



frappe.templates["totall"] = '<aside class="main-sidebar">'
+'	<section class="sidebar">'
+'      <ul class="sidebar-menu">'
+'        <li class="header">NAV. PRINCIPAL</li>'
+'        <li><a href="#"><i class="fas fa-home"></i></a></li>'



//+'        <li class="treeview">'
//+'          <a href="#">'
//+'            <i class="far fa-money-bill-alt"></i>'
//+'            <span>INGRESOS</span>'
//+'            <span class="pull-right-container">'
//+'              <i class="fa fa-angle-left pull-right"></i>'
//+'            </span>'
//+'          </a>'
//+'          <ul class="treeview-menu">'
// +'            <li><a href="#List/Turno/List"><i class="fas fa-flag"></i>  Turnos</a></li>'
//+'            <li><a href="#pos"><i class="far fa-money-bill-alt"></i>  Punto de Venta</a></li>'
// +'            <li><a href="#Form/Sales Invoice/Nuevo Factura de venta 1"><i class="fas fa-plus-circle"></i>  Nueva Venta</a></li>'
//+'            <li><a href="#List/Sales Invoice/List"><i class="fas fa-chart-bar"></i>  Historial de Venta</a></li>'
//  +'            <li><a href="#List/Sales Order/List"><i class="fas fa-birthday-cake"></i>  Apartados</a></li>'
//+'          </ul>'
//  +'        </li>'


+'        <li class="treeview">'
+'          <a href="#">'
+'            <i class="fas fa-file-contract"></i>'
+'            <span>Contratos</span>'
+'            <span class="pull-right-container">'
+'              <i class="fa fa-angle-left pull-right"></i>'
+'            </span>'
+'          </a>'
+'          <ul class="treeview-menu">'
+'            <li><a href="#List/Sales Order/List"><i class="fas fa-file-invoice-dollar"></i>      Contratos</a></li>'
+'            <li><a href="#List/Tipo Evento/List"><i class="fas fa-undo-alt"></i>   Tipo de Evento</a></li>'
+'            <li><a href="#List/Tipo Descuento/List"><i class="fas fa-undo-alt"></i>   Tipo de Descuento</a></li>'
+'            <li><a href="#List/Lugares/List"><i class="fas fa-boxes"></i>  Lugares</a></li>'
+'            <li><a href="#List/Banco/List"><i class="fas fa-hand-holding-usd"></i>   Bancos</a></li>'
+'            <li><a href="#List/Item?item_group=Eventos"><i class="far fa-envelope"></i>  Articulos de Eventos</a></li>'
+'          </ul>'
+'        </li>'

+'        <li class="treeview">'
+'          <a href="#">'
+'            <i class="fas fa-money-check-alt"></i>'
+'            <span>VENTAS</span>'
+'            <span class="pull-right-container">'
+'              <i class="fa fa-angle-left pull-right"></i>'
+'            </span>'
+'          </a>'
+'          <ul class="treeview-menu">'
+'            <li><a href="#List/Sales%20Invoice/List"><i class="fas fa-file-invoice-dollar"></i>      Factura de Venta</a></li>'
+'            <li><a href="#List/CFDI%20Nota%20de%20Credito/List"><i class="fas fa-undo-alt"></i>   Nota de credito</a></li>'
+'            <li><a href="#List/CFDI/List"><i class="fas fa-boxes"></i>  Factura Global</a></li>'
+'            <li><a href="#List/Payment%20Entry/List"><i class="fas fa-hand-holding-usd"></i>   Pagos</a></li>'
+'            <li><a href="#List/Sales Order/List"><i class="far fa-envelope"></i>  Orden de Venta</a></li>'
+'            <li><a href="#List/Delivery%20Note/List"><i class="fas fa-truck-loading"></i>  Entrega de Material</a></li>'
//+'            <li><a href="#List/CFDI Clave Producto/List"><i class="octicon octicon-plus"></i>  Clave Producto</a></li>'
//+'            <li><a href="#List/CFDI Clave Unidad/List"><i class="fas fa-plus-circle"></i>  Clave Unidad</a></li>'
//+'            <li><a href="#Form/Configuracion CFDI/Cliente"><i class="fa fa-cog"></i>  Configurar</a></li>'
+'          </ul>'
+'        </li>'



+'        <li class="treeview">'
+'          <a href="#">'
+'            <i class="fas fa-clipboard-list"></i>'
+'            <span>CATALOGOS</span>'
+'            <span class="pull-right-container">'
+'              <i class="fa fa-angle-left pull-right"></i>'
+'            </span>'
+'          </a>'
+'          <ul class="treeview-menu">'
+'            <li><a href="#List/Item/List"><i class="fas fa-list"></i>  Articulos</a></li>'
+'            <li><a href="#List/Supplier/List"><i class="fas fa-people-carry"></i>  Proveedores</a></li>'
+'            <li><a href="#List/Customer/List"><i class="far fa-address-card"></i>  Clientes</a></li>'
+'            <li><a href="#List/User/List"><i class="fas fa-user-edit"></i>  Usuarios</a></li>'
+'          </ul>'
+'        </li>'


+'        <li class="treeview">'
+'          <a href="#">'
+'            <i class="fas fa-cubes"></i>'
+'            <span>INVENTARIO</span>'
+'            <span class="pull-right-container">'
+'              <i class="fa fa-angle-left pull-right"></i>'
+'            </span>'
+'          </a>'
+'          <ul class="treeview-menu">'
+'            <li><a href="#Tree/Warehouse"><i class="fas fa-warehouse"></i>  Almacenes</a></li>'
+'            <li><a href="#List/Stock Reconciliation/List"><i class="fas fa-sync-alt"></i>  Ajustes</a></li>'
+'            <li><a href="#List/Stock Entry/List"><i class="fas fa-exchange-alt"></i>  Movimientos</a></li>'
//+'            <li><a href="#stock-balance"><i class="octicon octicon-screen-full"></i>  Estatus/Producto</a></li>'
//+'            <li><a href="#List/BOM"><i class="octicon octicon-screen-full"></i>  BOM</a></li>'

// +'            <li><a href="#List/Captura Inventario/List"><i class="octicon octicon-screen-normal"></i> Captura Lector</a></li>'
+'          </ul>'
+'        </li>'




 +'        <li class="treeview">'
 +'          <a href="#">'
 +'            <i class="fas fa-users"></i>'
 +'            <span>CRM</span>'
 +'            <span class="pull-right-container">'
 +'              <i class="fa fa-angle-left pull-right"></i>'
 +'            </span>'
 +'          </a>'
 +'          <ul class="treeview-menu">'
 +'            <li><a href="#List/Lead/List"><i class="fas fa-user-cog"></i>  Prospecto</a></li>'
 +'            <li><a href="#List/Opportunity/Kanban/Oportunidades%20por%20Estado"><i class="far fa-handshake"></i>  Oportunidad</a></li>'
 +'            <li><a href="#List/Quotation/List"><i class="fa fa-table"></i>  Cotizaciones</a></li>'
 +'          </ul>'
 +'        </li>'



 +'        <li class="treeview">'
 +'          <a href="#">'
 +'            <i class="fas fa-map-marked-alt"></i>'
 +'            <span>Ruta</span>'
 +'            <span class="pull-right-container">'
 +'              <i class="fa fa-angle-left pull-right"></i>'
 +'            </span>'
 +'          </a>'
 +'          <ul class="treeview-menu">'
 +'            <li><a href="#Form/RecorridoMapa"><i class="fas fa-search-location"></i>  Tiempo real</a></li>'
 +'            <li><a href="#Form/Monitormapa"><i class="fas fa-map"></i>  Monitor Mapa</a></li>'
 +'            <li><a href="#List/Ruta/List"><i class="fas fa-map-marker-alt"></i>  Rutas</a></li>'
 +'          </ul>'
 +'        </li>'



 +'        <li class="treeview">'
	+'          <a href="#">'
	+'            <i class="fas fa-briefcase"></i>'
	+'            <span>PROYECTOS</span>'
	+'            <span class="pull-right-container">'
	+'              <i class="fa fa-angle-left pull-right"></i>'
	+'            </span>'
	+'          </a>'
	+'          <ul class="treeview-menu">'
	+'            <li><a href="#List/Project/List"><i class="fas fa-briefcase"></i>  Proyecto</a></li>'
	+'            <li><a href="#List/Task/Gantt"><i class="fas fa-bell"></i>  Tarea</a></li>'
	+'            <li><a href="#List/Project%20Type/List"><i class="fas fa-tasks"></i>  Tipo de Proyecto</a></li>'
//	+'            <li><a href="#List/Activity%20Type/List"><i class="fa fa-cog"></i>  Tipo de Actividad</a></li>'
	+'            <li><a href="#List/Issue/List"><i class="fas fa-headset"></i>  Incidencia</a></li>'
	+'          </ul>'
	+'        </li>'


+'        <li class="treeview">'
+'          <a href="#">'
+'            <i class="fas fa-shopping-cart"></i>'
+'            <span>COMPRAS</span>'
+'            <span class="pull-right-container">'
+'              <i class="fa fa-angle-left pull-right"></i>'
+'            </span>'
+'          </a>'
+'          <ul class="treeview-menu">'
+'            <li><a href="#List/Purchase%20Invoice/List"><i class="fas fa-file-invoice-dollar"></i>  Factura de Proveedor</a></li>'
+'            <li><a href="#List/Purchase%20Order/List"><i class="far fa-envelope"></i>  Orden de Compra</a></li>'
+'            <li><a href="#List/Supplier%20Quotation/List"><i class="fa fa-table"></i>  Cotizacion Proveedor</a></li>'
+'            <li><a href="#List/Request%20for%20Quotation/List"><i class="fas fa-bell"></i>  Solicitud Cotizacion</a></li>'
//+'            <li><a href="#Form/Buying%20Settings"><i class="fa fa-cog"></i>  Config. Compras</a></li>'
+'          </ul>'
+'        </li>'


+'        <li class="treeview">'
+'          <a href="#">'
+'            <i class="fas fa-chart-line"></i>'
+'            <span>Reportes</span>'
+'            <span class="pull-right-container">'
+'              <i class="fa fa-angle-left pull-right"></i>'
+'            </span>'
+'          </a>'
+'          <ul class="treeview-menu">'
+'            <li><a href="#query-report/Ventas%20Diarias"><i class="fas fa-funnel-dollar"></i> Ventas Diarias</a></li>'
+'            <li><a href="#query-report/Ventas%20x%20Dia%20x%20Unidad"><i class="fas fa-funnel-dollar"></i> Ventas x Dia x Unidad</a></li>'
+'            <li><a href="#query-report/Ventas%20x%20Dia%20x%20Unidad%20USD"><i class="fas fa-funnel-dollar"></i> Ventas x Dia x Unidad USD</a></li>'
+'            <li><a href="#query-report/Acumulado De Ventas x Cliente"><i class="fas fa-funnel-dollar"></i> Acumulado Ventas x Cliente</a></li>'
+'            <li><a href="#query-report/Ventas y Utilidad por Cliente"><i class="fas fa-funnel-dollar"></i>  Ventas x Cliente</a></li>'
+'            <li><a href="#query-report/Ventas%20y%20Utilidad%20por%20vendedor"><i class="fas fa-funnel-dollar"></i>  Ventas x Vendedor</a></li>'
+'            <li><a href="#query-report/Ventas%20y%20Utilidad%20por%20Telemarketing"><i class="fas fa-funnel-dollar"></i>  Ventas x Telemarketing</a></li>'
+'            <li><a href="#query-report/Cuentas Por Cobrar Multimoneda"><i class="fas fa-search-dollar"></i> CXC Multimoneda</a></li>'
+'            <li><a href="#query-report/Cuentas por Cobrar 35 60 90"><i class="fas fa-search-dollar"></i> CXC 35 60 90</a></li>'
+'            <li><a href="#query-report/Accounts%20Receivable"><i class="fas fa-search-dollar"></i> Cuentas por Cobrar</a></li>'
+'            <li><a href="#query-report/Accounts%20Payable"><i class="fab fa-creative-commons-nc"></i> Cuentas por Pagar</a></li>'
+'            <li><a href="#query-report/Productos Mas Vendidos Con Existencia"><i class="fas fa-boxes"></i>  Productos Vendidos</a></li>'
+'            <li><a href="#query-report/Stock%20Total"><i class="fas fa-sort-amount-up"></i>  Stock Total</a></li>'
+'            <li><a href="#Form/Estadisticas"><i class="far fa-chart-bar"></i>  Estadistica</a></li>'
+'            <li><a href="#query-report/VENTAS%20X%20VENDEDOR"><i class="fa fa-table"></i>  Ventas x vendedor</a></li>'
+'          </ul>'
+'        </li>'


	// +'        <li class="treeview">'
	// +'          <a href="#">'
	// +'            <i class="fas fa-barcode"></i>'
	// +'            <span>MANUFACTURA</span>'
	// +'            <span class="pull-right-container">'
	// +'              <i class="fa fa-angle-left pull-right"></i>'
	// +'            </span>'
	// +'          </a>'
	// +'          <ul class="treeview-menu">'
//
	//  +'            <li><a href="#List/Production%20Order/List"><i class="octicon octicon-screen-full"></i> Orden Produccion</a></li>'
	//  +'            <li><a href="#List/BOM/List"><i class="fas fa-barcode"></i> Bill de Materiales</a></li>'
	//  +'            <li><a href="#Form/BOM%20Update%20Tool"> <i class="octicon octicon-screen-normal"></i>Actualizar BOM</a></li>'
 // +'            <li><a href="#List/Manufacturer/List"><i class="fas fa-briefcase"></i>  Manufacturadores</a></li>'
	// +'          </ul>'
	// +'        </li>'



+'        <li class="treeview">'
+'          <a href="#">'
+'            <i class="fa fa-cog"></i>'
+'            <span>Configuracion</span>'
+'            <span class="pull-right-container">'
+'              <i class="fa fa-angle-left pull-right"></i>'
+'            </span>'
+'          </a>'
+'          <ul class="treeview-menu">'
+'            <li><a href="#List/Currency%20Exchange/List"><i class="fas fa-flag"></i>  Tipo de Cambio</a></li>'
//+'            <li><a href="#List/Mode of Payment/List"><i class="far fa-money-bill"></i>  Metodo de Pago</a></li>'
//+'            <li><a href="#List/POS Profile/List"><i class="octicon octicon-person"></i>  Perfil de Venta</a></li>'
// +'            <li><a href="#Form/Item Attribute/Talla"><i class="octicon octicon-tasklist"></i>  Tallas</a></li>'
// +'            <li><a href="#List/Caja/List"><i class="far fa-money-bill-alt"></i>  Caja</a></li>'
+'            <li><a href="#List/Poliza%20Contpaq/List"><i class="octicon octicon-diff"></i>  Poliza Contpaq</a></li>'
+'            <li><a href="#List/Letter Head/List"><i class="octicon octicon-diff"></i>  Membrete</a></li>'
//+'            <li><a href="#List/Print Heading/List"><i class="octicon octicon-eye"></i>  Encabezado Ticket</a></li>'
//+'            <li><a href="#List/Terms and Conditions/List"><i class="octicon octicon-eye"></i>  Pol. Devoluciones</a></li>'
//+'            <li><a href="#List/Company/List"><i class="octicon octicon-eye"></i>  Compañia</a></li>'
+'            <li><a href="#List/Email%20Account/List"><i class="fas fa-envelope-square"></i>  Email</a></li>'
//+'            <li><a href="#Form/Customize%20Form/Customize%20Form"><i class="octicon octicon-eye"></i>  Personalizar Form.</a></li>'
+'            <li><a href="#List/Seguimiento"><i class="fas fa-user-tie"></i>  Seguimiento</a></li>'
+'            <li><a href="#List/Actualizar%20Precio/List"><i class="fas fa-edit"></i>  Actualizar Precios</a></li>'
+'            <li><a href="#permission-manager"><i class="octicon octicon-organization"></i>  Privilegios</a></li>'
+'          </ul>'
+'        </li>'


+'        <li class="treeview">'
+'          <a href="http://totall.mx">'
+'            <i class="far fa-question-circle" style="color:Tomato"></i>'
+'            <span>Ayuda</span>'
+'            <span class="pull-right-container">'
+'              <i class="fa fa-angle-left pull-right"></i>'
+'            </span>'
+'          </a>'
+'        </li>'
+'    </ul>'
+'    </section>'
+'  </aside>'
+'<div class="overlay"><div>' ;

 frappe.templates["mapas2"] = '<aside class="main-sidebar">'
  +'	<section class="sidebar">'
  +'      <ul class="sidebar-menu">'
  +'        <li class="header">NAV. PRINCIPAL</li>'
  +'        <li><a href="#Form/User/alguien%40gmail.com"><i class="fas fa-home"></i></a></li>'
	+'    </ul>'
  +'    </section>'
  +'  </aside>'
  +'<div class="overlay"><div>' ;


 frappe.templates["mapas"] = '<aside class="main-sidebar">'
  +'	<section class="sidebar">'
  +'      <ul class="sidebar-menu">'
  +'        <li class="header">NAV. PRINCIPAL</li>'
  +'        <li><a href="#"><i class="fas fa-home"></i></a></li>'



  //+'        <li class="treeview">'
  //+'          <a href="#">'
  //+'            <i class="far fa-money-bill-alt"></i>'
  //+'            <span>INGRESOS</span>'
  //+'            <span class="pull-right-container">'
  //+'              <i class="fa fa-angle-left pull-right"></i>'
  //+'            </span>'
  //+'          </a>'
  //+'          <ul class="treeview-menu">'
  // +'            <li><a href="#List/Turno/List"><i class="fas fa-flag"></i>  Turnos</a></li>'
  //+'            <li><a href="#pos"><i class="far fa-money-bill-alt"></i>  Punto de Venta</a></li>'
  // +'            <li><a href="#Form/Sales Invoice/Nuevo Factura de venta 1"><i class="fas fa-plus-circle"></i>  Nueva Venta</a></li>'
  //+'            <li><a href="#List/Sales Invoice/List"><i class="fas fa-chart-bar"></i>  Historial de Venta</a></li>'
//  +'            <li><a href="#List/Sales Order/List"><i class="fas fa-birthday-cake"></i>  Apartados</a></li>'
  //+'          </ul>'
//  +'        </li>'



	+'        <li class="treeview">'
	+'          <a href="#">'
	+'            <i class="fas fa-chart-line"></i>'
	+'            <span>Reportes</span>'
	+'            <span class="pull-right-container">'
	+'              <i class="fa fa-angle-left pull-right"></i>'
	+'            </span>'
	+'          </a>'
	+'          <ul class="treeview-menu">'
	+'            <li><a href="#query-report/Stock%20Total"><i class="octicon octicon-package"></i>  Stock Total</a></li>'
	+'            <li><a href="#query-report/VENTAS%20X%20VENDEDOR"><i class="fa fa-table"></i>  Ventas x vendedor</a></li>'
	+'          </ul>'
	+'        </li>'


 	+'        <li class="treeview">'
 	 +'          <a href="#">'
 	 +'            <i class="far fa-address-card"></i>'
 	 +'            <span>CRM</span>'
 	 +'            <span class="pull-right-container">'
 	 +'              <i class="fa fa-angle-left pull-right"></i>'
 	 +'            </span>'
 	 +'          </a>'
 	 +'          <ul class="treeview-menu">'
 	 +'            <li><a href="#List/Lead/Kanban/Prospecto"><i class="fas fa-female"></i>  Prospecto</a></li>'
 	 +'            <li><a href="#List/Opportunity/List"><i class="far fa-envelope"></i>  Oportunidad</a></li>'
	 +'            <li><a href="#List/Quotation/List"><i class="fa fa-table"></i>  Cotizaciones</a></li>'
	 +'            <li><a href="#List/Ruta/List"><i class="octicon octicon-location"></i>  Rutas</a></li>'
 	 +'          </ul>'
 	 +'        </li>'

	 +'        <li class="treeview">'
		+'          <a href="#">'
		+'            <i class="fas fa-briefcase"></i>'
		+'            <span>PROYECTOS</span>'
		+'            <span class="pull-right-container">'
		+'              <i class="fa fa-angle-left pull-right"></i>'
		+'            </span>'
		+'          </a>'
		+'          <ul class="treeview-menu">'
		+'            <li><a href="#List/Issue/List"><i class="fas fa-headset"></i>  Incidencia</a></li>'
		+'          </ul>'
		+'        </li>'


  	// +'        <li class="treeview">'
  	// +'          <a href="#">'
  	// +'            <i class="fas fa-barcode"></i>'
  	// +'            <span>MANUFACTURA</span>'
  	// +'            <span class="pull-right-container">'
  	// +'              <i class="fa fa-angle-left pull-right"></i>'
  	// +'            </span>'
  	// +'          </a>'
  	// +'          <ul class="treeview-menu">'
 	//
  	//  +'            <li><a href="#List/Production%20Order/List"><i class="octicon octicon-screen-full"></i> Orden Produccion</a></li>'
  	//  +'            <li><a href="#List/BOM/List"><i class="fas fa-barcode"></i> Bill de Materiales</a></li>'
  	//  +'            <li><a href="#Form/BOM%20Update%20Tool"> <i class="octicon octicon-screen-normal"></i>Actualizar BOM</a></li>'
   // +'            <li><a href="#List/Manufacturer/List"><i class="fas fa-briefcase"></i>  Manufacturadores</a></li>'
  	// +'          </ul>'
  	// +'        </li>'



  +'        <li class="treeview">'
  +'          <a href="http://totall.mx">'
  +'            <i class="far fa-question-circle" style="color:Tomato"></i>'
  +'            <span>Ayuda</span>'
  +'            <span class="pull-right-container">'
  +'              <i class="fa fa-angle-left pull-right"></i>'
  +'            </span>'
  +'          </a>'
  +'        </li>'
  +'    </ul>'
  +'    </section>'
  +'  </aside>'
  +'<div class="overlay"><div>' ;

 // }
