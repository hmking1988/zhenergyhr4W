sap.ui.jsview("com.zhenergy.hr.view.roster.rosterSplitApp", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.zhenergy.hr.view.roster.rosterSplitApp
	*/ 
	getControllerName : function() {
		return "com.zhenergy.hr.view.roster.rosterSplitApp";
	},
	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf com.zhenergy.hr.view.time.LeaveRequestSplitApp
	 */
	createContent: function(oController) {
		this.app = new sap.m.SplitApp({
			
		});
		var rosterMasterPage = sap.ui.view({
			id: "idrosterMasterPage",
			viewName: "com.zhenergy.hr.view.roster.rosterMasterPage",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(rosterMasterPage);
		
		var rosterDetail = sap.ui.view({
			id: "idrosterDetail",
			viewName: "com.zhenergy.hr.view.roster.rosterDetail",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(rosterDetail);
		
		var rosterDownload = sap.ui.view({
			id: "idrosterDownload",
			viewName: "com.zhenergy.hr.view.roster.rosterDownload",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(rosterDownload);
		
		var rosterDownload01 = sap.ui.view({
			id: "idrosterDownload01",
			viewName: "com.zhenergy.hr.view.roster.rosterDownload01",
			type: sap.ui.core.mvc.ViewType.HTML
		});
		this.app.addMasterPage(rosterDownload01);
		
		//this.app.toDetail("idwelcomePage");
        this.app.toMaster("idrosterMasterPage");  
		return this.app;
	}

});
