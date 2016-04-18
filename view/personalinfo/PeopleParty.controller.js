sap.ui.controller("com.zhenergy.hr.view.personalinfo.PeopleParty", {
	back:function(evt){
	    idPersonalInfoSplitApp.app.backToPage("idPeopleInfo")
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
		var sEntityPath ="/EE_PARTY_SET?$filter=Usrid eq '"+usrid+"'";
		var list = this.getView().byId("list");
		if (listclone != null) {
			list.bindItems(sEntityPath, listclone);
		}
	},
});