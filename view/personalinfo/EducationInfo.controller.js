sap.ui.controller("com.zhenergy.hr.view.personalinfo.EducationInfo", {
    back : function (evt) {
		idPersonalInfoSplitApp.app.backToPage("idPersonalInfoMaster");
	},
	handleeducationdetailListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idEducationDetail", context);
		var page = idPersonalInfoSplitApp.app.getPage("idEducationDetail");
		page.setBindingContext(context);
	},
	handleeducationdetailListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idEducationDetail", context);
		var page = idPersonalInfoSplitApp.app.getPage("idEducationDetail");
		page.setBindingContext(context);
	},
	back1: function(){
        app.backToTop();
    },
    download : function(){
        idPersonalInfoSplitApp.app.to("idaddEducation");
    },
    onInit: function() {
		var list = this.getView().byId("list");
		if (list.getItems().length != 0) {
			listclone = list.getItems()[0].clone();
		}
		list.removeAllItems();
		var sEntityPath ="/EE_EDUCATION_SET?$filter=Usrid eq '"+usrid+"'";
			var list = this.getView().byId("list");
			if (listclone != null) {
				list.bindItems(sEntityPath, listclone);
		}
	},
});