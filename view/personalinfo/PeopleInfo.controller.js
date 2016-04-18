sap.ui.controller("com.zhenergy.hr.view.personalinfo.PeopleInfo", {
    onInit: function() {
	   // this.getView().bindElement("/EE_INFO_SET?$filter=Pernr eq '"+usrid+"'");
	},
    back : function (evt) {
		idPersonalInfoSplitApp.app.backToPage("idPersonalInfoMaster");
	},
	handlepeopledetailListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idPeopleDetailInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idPeopleDetailInfo");
		page.setBindingContext(context);
	},
	handlepeopledetailListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idPeopleDetailInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idPeopleDetailInfo");
		page.setBindingContext(context);
	},
	handlepeopleaddrListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idPeopleAddrInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idPeopleAddrInfo");
		page.setBindingContext(context);
	},
	handlepeopleaddrListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idPeopleAddrInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idPeopleAddrInfo");
		page.setBindingContext(context);
	},
	handlepeopledataListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idPeopleDataInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idPeopleDataInfo");
		page.setBindingContext(context);
	},
	handlepeopledataListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idPeopleDataInfo", context);
		var page = idPersonalInfoSplitApp.app.getPage("idPeopleDataInfo");
		page.setBindingContext(context);
	},
	handlepeopleidListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idPeopleID", context);
		var page = idPersonalInfoSplitApp.app.getPage("idPeopleID");
		page.setBindingContext(context);
	},
	handlepeopleidListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idPeopleID", context);
		var page = idPersonalInfoSplitApp.app.getPage("idPeopleID");
		page.setBindingContext(context);
	},
	handlepeoplepartyListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		idPersonalInfoSplitApp.app.to("idPeopleParty", context);
		var page = idPersonalInfoSplitApp.app.getPage("idPeopleParty");
		page.setBindingContext(context);
	},
	handlepeoplepartyListItemSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		idPersonalInfoSplitApp.app.to("idPeopleParty", context);
		var page = idPersonalInfoSplitApp.app.getPage("idPeopleParty");
		page.setBindingContext(context);
	},
 	back1: function(){
        app.backToTop();
    }
    
});