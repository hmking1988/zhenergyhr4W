sap.ui.jsview("com.zhenergy.hr.view.leaveapproval.leaveApprovalSplitApp", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf com.zhenergy.hr.view.time.LeaveRequestSplitApp
	 */
	getControllerName: function() {
		return "com.zhenergy.hr.view.leaveapproval.leaveApprovalSplitApp";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf com.zhenergy.hr.view.time.LeaveRequestSplitApp
	 */
	createContent: function(oController) {
		this.app = new sap.m.SplitApp({

		});
		var leaveApprovalMasterPage = sap.ui.view({
			id: "idleaveApprovalMaster",
			viewName: "com.zhenergy.hr.view.leaveapproval.leaveApprovalMaster",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(leaveApprovalMasterPage);
		var leaveApprovalDetailPage = sap.ui.view({
			id: "idleaveApprovalDetail",
			viewName: "com.zhenergy.hr.view.leaveapproval.leaveApprovalDetail",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(leaveApprovalDetailPage);

		this.app.toDetail("idleaveApprovalDetail");
		this.app.toMaster("idleaveApprovalMaster");
		return this.app;
	}

});