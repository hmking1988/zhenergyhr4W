sap.ui.controller("com.zhenergy.hr.view.personalinfo.PeopleAddrInfo", {
    back : function (evt) {
		idPersonalInfoSplitApp.app.backToPage("idPeopleInfo");
	},
 	back1: function(){
        app.backToTop();
    },
    download : function(){
        idPersonalInfoSplitApp.app.to("idaddAddress");
    },
    updataPress : function(evt){
        var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("ideditAddress", context);
		var page = idPersonalInfoSplitApp.app.getPage("ideditAddress");
 		page.setBindingContext(context);
        
    },
    onInit: function() {
		var list = this.getView().byId("list");
		if (list.getItems().length != 0) {
			listclone = list.getItems()[0].clone();
		}
		list.removeAllItems();
		var sEntityPath ="/EE_ADDRESS_SET?$filter=Usrid eq '"+usrid+"'";
			var list = this.getView().byId("list");
			if (listclone != null) {
				list.bindItems(sEntityPath, listclone);
		}
	},
    

});