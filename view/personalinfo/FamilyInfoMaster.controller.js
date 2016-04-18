sap.ui.controller("com.zhenergy.hr.view.personalinfo.FamilyInfoMaster", {
    onInit: function() {
	    var list = this.getView().byId("list");
		if (list.getItems().length != 0) {
			listclone = list.getItems()[0].clone();
		}
		list.removeAllItems();
		var sEntityPath ="/EE_FAMILY_SET?$filter=Usrid eq '"+usrid+"'";
		var list = this.getView().byId("list");
		if (listclone != null) {
			list.bindItems(sEntityPath, listclone);
		}
	},
    back : function (evt) {
		idPersonalInfoSplitApp.app.backToPage("idPersonalInfoMaster");
	},
	handlefamilydetailListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idFamilyDetail", context);
		var page = idPersonalInfoSplitApp.app.getPage("idFamilyDetail");
		page.setBindingContext(context);
	},
	handlefamilydetailListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idFamilyDetail", context);
		var page = idPersonalInfoSplitApp.app.getPage("idFamilyDetail");
		page.setBindingContext(context);
	},
 	back1: function(){
        app.backToTop();
    },
    download : function(){
        idPersonalInfoSplitApp.app.to("idaddFamily");
    }
});