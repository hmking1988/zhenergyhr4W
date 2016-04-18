sap.ui.jsview("com.zhenergy.hr.view.myNewTeam.myNewTeam", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf com.zhenergy.hr.view.myNewTeam.myNewTeam
	*/ 
	getControllerName : function() {
		return "com.zhenergy.hr.view.myNewTeam.myNewTeam";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf com.zhenergy.hr.view.myNewTeam.myNewTeam
	*/ 
	createContent : function(oController) {
		this.app = new sap.m.SplitApp({
			
		});
		
		var myNewTeamMaster = sap.ui.view({
			id: "idmyNewTeamMaster",
			viewName: "com.zhenergy.hr.view.myNewTeam.myNewTeamMaster",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(myNewTeamMaster);
		
		var myNewTeamDetail = sap.ui.view({
			id: "idmyNewTeamDetail",
			viewName: "com.zhenergy.hr.view.myNewTeam.myNewTeamDetail",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(myNewTeamDetail);
		
		var myNewTeamHtml = sap.ui.view({
			id: "idmyNewTeamHtml",
			viewName: "com.zhenergy.hr.view.myNewTeam.myNewTeamHtml",
			type: sap.ui.core.mvc.ViewType.HTML
		});
		this.app.addDetailPage(myNewTeamHtml);
		
		//this.app.toDetail("idmyTeamDetail"); 
		this.app.toMaster("idmyNewTeamMaster");
         
		return this.app;
	}
	


});
