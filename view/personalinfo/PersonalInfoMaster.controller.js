jQuery.sap.require("com.zhenergy.hr.js.formatter");



sap.ui.controller("com.zhenergy.hr.view.personalinfo.PersonalInfoMaster", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.zhenergy.hr.view.time.LeaveRequestMaster
*/  onInit: function() {
		this.getView().bindElement("/EE_PERSONPHOTO_SET('" + usrid + "')");
	    var list = this.getView().byId("list");
		if (list.getItems().length != 0) {
			listclone = list.getItems()[0].clone();
		}
		list.removeAllItems();
		var sEntityPath ="/EE_INFO_SET?$filter=Usrid eq '"+usrid+"'";
		var list = this.getView().byId("list");
		if (listclone != null) {
			list.bindItems(sEntityPath, listclone);
		}
	},

	
    handlepeopleListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.toMaster("idPeopleInfo", context);
// 		if(!jQuery.device.is.phone){
// 		    idPersonalInfoSplitApp.app.toDetail("idPeopleID", context);
// 		}
// 		var page = idPersonalInfoSplitApp.app.getPage("idPeopleInfo");
// 		page.setBindingContext(context);
	},
	handlepeopleListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idPeopleInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idPeopleInfo");
		page.setBindingContext(context);
	},
	handlefamilyListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idFamilyInfoMaster", context);
		var page = idPersonalInfoSplitApp.app.getPage("idFamilyInfoMaster");
// 		page.setBindingContext(context);
	},
	handlefamilyListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idFamilyInfoMaster", context);
		var page = idPersonalInfoSplitApp.app.getPage("idFamilyInfoMaster");
		page.setBindingContext(context);
	},
	handleeducationListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idEducationInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idEducationInfo");
// 		page.setBindingContext(context);
	},
	handleeducationListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idEducationInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idEducationInfo");
		page.setBindingContext(context);
	},
	handleConfirmationMessageBoxPress: function(oEvent) {
	    sap.m.MessageToast.show("更多功能，敬请期待！");
    // var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
    // sap.m.MessageBox.alert(
    //   "功能正在开发中，敬请期待！", {
    //     styleClass: bCompact? "sapUiSizeCompact" : ""
    //   }
    // );
  },
	handlecontractListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idContractInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idContractInfo");
// 		page.setBindingContext(context);
	},
	handlecontractListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idContractInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idContractInfo");
		page.setBindingContext(context);
	},
	handleworkListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idWorkInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idWorkInfo");
// 		page.setBindingContext(context);
	},
	handleworkListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idWorkInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idWorkInfo");
		page.setBindingContext(context);
	},
	handletechnologyListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idTechnology", context);
		var page = idPersonalInfoSplitApp.app.getPage("idTechnology");
// 		page.setBindingContext(context);
	},
	handletechnologyListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idTechnology", context);
		var page = idPersonalInfoSplitApp.app.getPage("idTechnology");
		page.setBindingContext(context);
	},
	handleoccupationListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idOccupation", context);
		var page = idPersonalInfoSplitApp.app.getPage("idOccupation");
// 		page.setBindingContext(context);
	},
	handleoccupationListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idOccupation", context);
		var page = idPersonalInfoSplitApp.app.getPage("idOccupation");
		page.setBindingContext(context);
	},
	handleskillsidentificationListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idSkillsIdentification", context);
		var page = idPersonalInfoSplitApp.app.getPage("idSkillsIdentification");
// 		page.setBindingContext(context);
	},
	handleskillsidentificationListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idSkillsIdentification", context);
		var page = idPersonalInfoSplitApp.app.getPage("idSkillsIdentification");
		page.setBindingContext(context);
	},
// // 	handleexpertListItemPress : function (evt) {
// // 	    var context = evt.getSource().getBindingContext();
// // 	    this.showDetail();
// // 	    context.removeSelectons();
// // 	}
// // 	showDetail : function() {
// // 	    var bReplace = jQuery.device.is.phone ? false : true;
// // 		this.getRouter().navTo("idExpert", {
// // 			entity: oItem.getBindingContext().getPath().substr(1)
// // 		}, bReplace);
// // 	}
	handleexpertListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idExpert", context);
		var page = idPersonalInfoSplitApp.app.getPage("idExpert");
// 		page.setBindingContext(context);
	},
	handleexpertListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idExpert", context);
		var page = idPersonalInfoSplitApp.app.getPage("idExpert");
		page.setBindingContext(context);
	},
    back: function(){
        app.back("idlaunchpad");
    }

});