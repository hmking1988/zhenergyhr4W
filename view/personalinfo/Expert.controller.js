sap.ui.controller("com.zhenergy.hr.view.personalinfo.Expert", {
   back:function(){
        idPersonalInfoSplitApp.app.backToPage("idPersonalInfoMaster");
    },
    handleexpertdetailListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idExpertDetail", context);
		var page = idPersonalInfoSplitApp.app.getPage("idExpertDetail");
		page.setBindingContext(context);
	},
	handleexpertdetailListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idExpertDetail", context);
		var page = idPersonalInfoSplitApp.app.getPage("idExpertDetail");
		page.setBindingContext(context);
	},
	back1: function(){
        app.backToTop();
    },
    onInit: function() {
		var list = this.getView().byId("list");
		if (list.getItems().length != 0) {
			listclone = list.getItems()[0].clone();
		}
		list.removeAllItems();
		var sEntityPath ="/EE_SPECIALIST_SET?$filter=Usrid eq '"+usrid+"'";
			var list = this.getView().byId("list");
			if (listclone != null) {
				list.bindItems(sEntityPath, listclone);
		}
	},
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.zhenergy.hr.view.personalinfo.Expert
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf com.zhenergy.hr.view.personalinfo.Expert
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.zhenergy.hr.view.personalinfo.Expert
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.zhenergy.hr.view.personalinfo.Expert
*/
//	onExit: function() {
//
//	}

});