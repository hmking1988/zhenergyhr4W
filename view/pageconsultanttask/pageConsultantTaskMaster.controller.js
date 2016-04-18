sap.ui.controller("com.zhenergy.hr.view.pageconsultanttask.pageConsultantTaskMaster", {

	onInit: function() {
		this.getView().addEventDelegate({

			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function() {
				this.onBeforeShow();
			}, this)
		});

	},
	onBeforeShow: function() {
		var oFilters = [];
		var Begda = this.getView().byId('searchstart').getValue();
		var Endda = this.getView().byId('searchend').getValue();
		if (Begda != "" && Endda != "" && Begda > Endda) {
			var temp = Begda;
			Begda = Endda;
			Endda = temp;
		}

		if (usrid != "") {
			var oFilter = new sap.ui.model.Filter("Usrid", sap.ui.model.FilterOperator.EQ, usrid);
			oFilters.push(oFilter);
		}
		if (Begda != "") {
			Begda = Begda + "01";
			var oFilter1 = new sap.ui.model.Filter("Begda", sap.ui.model.FilterOperator.GE, Begda);
			oFilters.push(oFilter1);
		}
		if (Endda != "") {
			Endda = Endda + "31";
			var oFilter2 = new sap.ui.model.Filter("Endda", sap.ui.model.FilterOperator.LE, Endda);
			oFilters.push(oFilter2);
		}
		this.getView().byId("test").getBinding("items").filter(oFilters);

	},
	handleListSelect: function(evt) {
		var context = jQuery.device.is.phone ? evt.getSource().getBindingContext() : evt.getParameter("listItem").getBindingContext();
		consultanttaskContext = context;
		if(evt.getSource().getTitle()!=null){
		payDetailTitle=evt.getSource().getTitle();
		}else{
		    payDetailTitle="";
		}
		pageConsultantTask.app.to("notfound", "show");
		pageConsultantTask.app.to("idpageConsultantTaskDetail", context);
		var page = pageConsultantTask.app.getPage("idpageConsultantTaskDetail");
		page.setBindingContext(context);
	},
	back: function() {
		app.backToTop();
	},
	handlePressHome: function() {
		app.backToTop();
	},
	searchtap: function() {
		var oFilters = [];
		var Begda = this.getView().byId('searchstart').getValue();
		var Endda = this.getView().byId('searchend').getValue();
		if (Begda != "" && Endda != "" && Begda > Endda) {
			var temp = Begda;
			Begda = Endda;
			Endda = temp;
		}

		if (usrid != "") {
			var oFilter = new sap.ui.model.Filter("Usrid", sap.ui.model.FilterOperator.EQ, usrid);
			oFilters.push(oFilter);
		}
		if (Begda != "") {
			Begda = Begda + "01";
			var oFilter1 = new sap.ui.model.Filter("Begda", sap.ui.model.FilterOperator.GE, Begda);
			oFilters.push(oFilter1);
		}
		if (Endda != "") {
			Endda = Endda + "31";
			var oFilter2 = new sap.ui.model.Filter("Endda", sap.ui.model.FilterOperator.LE, Endda);
			oFilters.push(oFilter2);
		}
		this.getView().byId("test").getBinding("items").filter(oFilters);
	},
	myglobalFormatter: function(sDate) {
		if (sDate != "" && sDate != null) {
			return sDate.substring(0, 4) + '-' + sDate.substring(4, 6) + '-' + sDate.substring(6, 8);
		} else {
			return "";
		}
	}
});