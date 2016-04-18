sap.ui.controller("com.zhenergy.hr.view.launchpad", {

	onInit: function() {
		var Pernr = [];
		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
			for (var i in sRes.results) {
				Pernr.push(sRes.results[i].Pernr);
			}
// 			if (Pernr.length == 0) {
// 				this.getView().byId('myTeam').destroy(true);
// 			}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("网络未连接");
		}, this);
// 		if (usrid == "HUANGJF") {
			sap.ui.getCore().getModel().read("/ER_GROUP2_SET?$filter=(Usrid eq '" + usrid + "')", mParameters);
// 		} else {
// 			this.getView().byId('myTeam').destroy(true);
// 		} //this.getView().bindElement("/EE_PERSONPHOTO_SET('" + usrid + "')");
	},

	handlePressConfiguration: function(oEvent) {
		var oItem = oEvent.getSource();
		var oShell = this.getView().byId("myShell");
		var bState = oShell.getShowPane();
		oShell.setShowPane(!bState);
		oItem.setShowMarker(!bState);
		oItem.setSelected(!bState);
	},

	handleLogoffPress: function(oEvent) {
		doDeleteRegistration();

	},

	handleUserItemPressed: function(oEvent) {
		app.to("idlogout", "show");
		// 		var oButton = oEvent.getSource();

		//         // create action sheet only once
		//         if (!this._actionSheet) {
		//           this._actionSheet = sap.ui.xmlfragment(
		//             "com.zhenergy.hr.view.ActionSheet",
		//             this
		//           );
		//           this.getView().addDependent(this._actionSheet);
		//         }

		//         this._actionSheet.openBy(oButton);
	},

	handleSearchItemSelect: function(oEvent) {
		sap.m.MessageToast.show("Search Entry Selected: " + oEvent.getSource().getTitle());
	},

	handleShellOverlayClosed: function() {
		sap.m.MessageToast.show("Overlay closed");
	},
	handlePressSetting: function(evt) {
		// app.to("idpageSettingSplitApp");
	},
	handleNavOnSelect1: function() {
		sap.m.MessageToast.show("更多功能，敬请期待！");
	},
	handleRosterSelect: function() {
		// app.to("idrosterSplitApp");
	},

	handlequestSelect: function() {
		// app.to("idrestRequestSplitApp");
	},

	handleNavOnSelect: function(event) {

		var context = event.getSource().getCustomData()[0].getValue();
		// var context2 = event.getSource().getCustomData()[1].getValue();
		app.to(context);
		// app.toDetail(context2) ;
		// app.setMode(sap.m.SplitAppMode.ShowHideMode);
		//navigate to detail page
		// 		var context = event.getSource().getCustomData()[0].getValue();
		// 		//initial content master app
		// 		if (context == "pageCreateTicketBasic") {
		// 			appDetail.to(context, "slide", {
		// 				"type": "create",
		// 				"passingvalue": ""
		// 			});
		// 		} else if (context == "pageTicketOverview") {
		// 			appDetail.to(context, "slide", {
		// 				"type": "new",
		// 				"passingvalue": 1,
		// 				"status": 2
		// 			});
		// 		} else {
		// 			appDetail.to(context, "slide");
		// 		}
		//hide btn
		//rescenterapp.util.handlerHelper.onAfterNavigateFromHomepage(context);
		//appDetail.attachAfterDetailNavigate(context,sap.ui.controller("rescenterapp.views.ticket.create").onAfterNavigateFromHomePage, this);

	}

});