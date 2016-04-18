sap.ui.controller("com.zhenergy.hr.view.logout.logout", {
	onInit: function() {
		this.getView().addEventDelegate({

			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function() {
				this.onAfterLoadShow();
			}, this)
		});
	},
	onAfterLoadShow: function() {
		var item = this.getView().byId('appInfolist').getItems()[0];
	//	this.getView().byId('appInfolist').getItems()[1].setDescription(new Date().Format('yyyy年MM月dd日'));
		navigator.appInfo.getAppInfo(function(appInfo) {
			item.setDescription(appInfo.version);

		}, function(err) {
			sap.m.MessageToast.show(err);
		});
	},
	logout: function() {
		sap.m.MessageBox.show(
			"确认登出?", {
				icon: sap.m.MessageBox.Icon.NONE,
				title: "确认",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function(oAction) {
					if (oAction == "YES") {
						doDeleteRegistration();
					}
				}
			}
		);
	},
	back: function() {
		app.back();
	}
});