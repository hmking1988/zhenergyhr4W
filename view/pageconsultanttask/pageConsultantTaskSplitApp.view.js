sap.ui.jsview("com.zhenergy.hr.view.pageconsultanttask.pageConsultantTaskSplitApp", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf com.zhenergy.hr.view.time.LeaveRequestSplitApp
	 */
	getControllerName: function() {
		return "com.zhenergy.hr.view.pageconsultanttask.pageConsultantTaskSplitApp";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf com.zhenergy.hr.view.time.LeaveRequestSplitApp
	 */
	createContent: function(oController) {
		this.app = new sap.m.SplitApp({
			
		});
		var pageConsultantTaskMasterPage = sap.ui.view({
			id: "idpageConsultantTaskMaster",
			viewName: "com.zhenergy.hr.view.pageconsultanttask.pageConsultantTaskMaster",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(pageConsultantTaskMasterPage);
		var pageConsultantTaskDetailPage = sap.ui.view({
			id: "idpageConsultantTaskDetail",
			viewName: "com.zhenergy.hr.view.pageconsultanttask.pageConsultantTaskDetail",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(pageConsultantTaskDetailPage);
		var notfound = sap.ui.view({
			id: "notfound",
			viewName: "com.zhenergy.hr.view.pageconsultanttask.NotFound",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(notfound);


		
		this.app.toDetail("notfound");
        this.app.toMaster("idpageConsultantTaskMaster");  
		return this.app;
	}

});