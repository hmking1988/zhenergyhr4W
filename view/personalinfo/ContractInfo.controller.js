sap.ui.controller("com.zhenergy.hr.view.personalinfo.ContractInfo", {
    back : function (evt) {
		idPersonalInfoSplitApp.app.backToPage("idPersonalInfoMaster");
	},
	handlecontractdetailListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idContractDetail", context);
		var page = idPersonalInfoSplitApp.app.getPage("idContractDetail");
		page.setBindingContext(context);
	},
	handlecontractdetailListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idContractDetail", context);
		var page = idPersonalInfoSplitApp.app.getPage("idContractDetail");
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
		var sEntityPath ="/EE_CONTRACT_SET?$filter=Usrid eq '"+usrid+"'";
			var list = this.getView().byId("list");
			if (listclone != null) {
				list.bindItems(sEntityPath, listclone);
		}
	},
	
	
});