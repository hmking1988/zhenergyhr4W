sap.ui.controller("com.zhenergy.hr.view.roster.rosterMasterPage", {
	back: function() {
		app.backToTop();
	},

	toDeatil: function(evt) {
		var context = evt.getSource().getBindingContext();
		pernrid = evt.getSource().getCustomData()[0].getValue();
		listuserid = evt.getSource().getCustomData()[1].getValue();
		roster.app.to("idrosterDetail", context);
		var page = roster.app.getPage("idrosterDetail");
		page.setBindingContext(context);
	}

});