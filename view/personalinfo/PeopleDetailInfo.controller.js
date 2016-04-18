sap.ui.controller("com.zhenergy.hr.view.personalinfo.PeopleDetailInfo", {
    back : function (evt) {
		idPersonalInfoSplitApp.app.backToPage("idPeopleInfo");
	},
 	back1: function(){
        app.backToTop();
    },
    download : function(){
        idPersonalInfoSplitApp.app.toDetail("idaddCommunication");
    },
    updataSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("ideditCommunication", context);
		var page = idPersonalInfoSplitApp.app.getPage("ideditCommunication");
		page.setBindingContext(context);
	},
	updataPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("ideditCommunication", context);
		var page = idPersonalInfoSplitApp.app.getPage("ideditCommunication");
 		page.setBindingContext(context);
	},
    onInit: function() {
		var list = this.getView().byId("list");
		if (list.getItems().length != 0) {
			listclone = list.getItems()[0].clone();
		}
		list.removeAllItems();
		var sEntityPath ="/EE_COMMUNICATION_SET?$filter=Usrid eq '"+usrid+"'";
		var list = this.getView().byId("list");
		if (listclone != null) {
			list.bindItems(sEntityPath, listclone);
		}
	},
	
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.zhenergy.hr.view.personalinfo.PeopleDetailInfo.view.personalinfo.PeopleDetailInfo
*/
//     onInit: function() {
//     this.oProductModel = new sap.ui.model.odata.ODataModel("/EE_COMMUNICATION_SET", true);
//     this.getView().setModel(this.oProductModel);
// 	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf com.zhenergy.hr.view.personalinfo.PeopleDetailInfo.view.personalinfo.PeopleDetailInfo
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.zhenergy.hr.view.personalinfo.PeopleDetailInfo.view.personalinfo.PeopleDetailInfo
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.zhenergy.hr.view.personalinfo.PeopleDetailInfo.view.personalinfo.PeopleDetailInfo
*/
//	onExit: function() {
//
//	}

});