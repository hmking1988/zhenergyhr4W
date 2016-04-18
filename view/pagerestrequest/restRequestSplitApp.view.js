sap.ui.jsview("com.zhenergy.hr.view.pagerestrequest.restRequestSplitApp", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zhenergyhr.view.pagerestrequest.restRequestSplitApp
	*/ 
	getControllerName : function() {
		return "com.zhenergy.hr.view.pagerestrequest.restRequestSplitApp";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zhenergyhr.view.pagerestrequest.restRequestSplitApp
	*/ 
	createContent : function(oController) {
		this.app = new sap.m.SplitApp({
			
		});
		var restRequestMasterPage = sap.ui.view({
			id: "idrestRequestMaster",
			viewName: "com.zhenergy.hr.view.pagerestrequest.restRequestMaster",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(restRequestMasterPage);
		//流程图
// 		var flowChartDetailPage = sap.ui.view({
// 			id: "idflowChartDetail",
// 			viewName: "com.zhenergy.hr.view.pagerestrequest.flowChartDetail",
// 			type: sap.ui.core.mvc.ViewType.XML
// 		});
// 		this.app.addPage(flowChartDetailPage);
// 		//发起申请
// 		var applicationDetailPage = sap.ui.view({
// 			id: "idapplicationDetail",
// 			viewName: "com.zhenergy.hr.view.pagerestrequest.applicationDetail",
// 			type: sap.ui.core.mvc.ViewType.XML
// 		});
// 		this.app.addDetailPage(applicationDetailPage);
// 		//待审批列表
// 		var approvalListDetailPage = sap.ui.view({
// 			id: "idapprovalListDetail",
// 			viewName: "com.zhenergy.hr.view.pagerestrequest.approvalListDetail",
// 			type: sap.ui.core.mvc.ViewType.XML
// 		});
// 		this.app.addMasterPage(approvalListDetailPage);
		
// 		//待审批内容
// 		var approvalcontentPage = sap.ui.view({
// 			id: "idapprovalcontent",
// 			viewName: "com.zhenergy.hr.view.pagerestrequest.approvalcontent",
// 			type: sap.ui.core.mvc.ViewType.XML
// 		});
// 		this.app.addDetailPage(approvalcontentPage);
		
// 		this.app.toDetail("idapplicationDetail");
        this.app.toMaster("idrestRequestMaster");  
		return this.app;
	}

});