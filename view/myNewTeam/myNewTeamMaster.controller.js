jQuery.sap.require("com.zhenergy.hr.js.formatter");


sap.ui.controller("com.zhenergy.hr.view.myNewTeam.myNewTeamMaster", {
    back : function(){
        app.back("idlaunchpad");
    },
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.zhenergy.hr.view.myNewTeam.myNewTeamMaster
*/
	onInit: function() {
	   // var usrid = "ZHR_TEST_014";
        var list = this.getView().byId("list");
		if (list.getItems().length != 0) {
			listclone = list.getItems()[0].clone();
		}
		list.removeAllItems();
		var sEntityPath ="/ER_GROUP2_SET?$filter=Usrid eq '"+usrid+"'";
			var list = this.getView().byId("list");
			if (listclone != null) {
				list.bindItems(sEntityPath, listclone);
		}
	},
	
	toDeatil: function(evt) {
		var context = evt.getSource().getBindingContext();
		PernrId_team = evt.getSource().getCustomData()[0].getValue();
		ListUserid_team = evt.getSource().getCustomData()[1].getValue();
		photo_team = evt.getSource().getCustomData()[2].getValue();
		myNewTeam.app.to("idmyNewTeamDetail", context);
		var page = myNewTeam.app.getPage("idmyNewTeamDetail");
		page.setBindingContext(context);
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf com.zhenergy.hr.view.myNewTeam.myNewTeamMaster
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.zhenergy.hr.view.myNewTeam.myNewTeamMaster
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.zhenergy.hr.view.myNewTeam.myNewTeamMaster
*/
//	onExit: function() {
//
//	}

});