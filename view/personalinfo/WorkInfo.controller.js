sap.ui.controller("com.zhenergy.hr.view.personalinfo.WorkInfo", {
    back : function (evt) {
		idPersonalInfoSplitApp.app.backToPage("idPersonalInfoMaster");
	},
	handleworkdetailListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idWorkDetailInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idWorkDetailInfo");
		page.setBindingContext(context);
	},
	handleworkdetailListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idWorkDetailInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idWorkDetailInfo");
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
		var sEntityPath ="/EE_WORKEXPERIENCE_SET?$filter=Usrid eq '"+usrid+"'";
		var list = this.getView().byId("list");
		if (listclone != null) {
			list.bindItems(sEntityPath, listclone);
		}
	},
});