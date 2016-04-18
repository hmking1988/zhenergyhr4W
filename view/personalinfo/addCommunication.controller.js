sap.ui.controller("com.zhenergy.hr.view.personalinfo.addCommunication", {
	initializeData: function() {
		if (window.cordova && appContext && !window.sap_webide_companion) {
			var usrid = appContext.registrationContext.user.toUpperCase();
		} else {
			var usrid = "AC-SHENFT";
		}
		var daytime = new Date();
		var year = daytime.getFullYear();
		var month = daytime.getMonth();
		var day = daytime.getDate();
		var month_true;
		if (month > 8) {
			month_true = month + 1;
		} else {
			month = month + 1;
			month_true = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}
		this.getView().getModel("newCommucation").setData({
			Detail: {
				DiscontinuedFlag: false,
				Usrid: usrid,
				Begda: "" + year + month_true + day,
				Endda: "99991231"
			}
		});
	},
	onInit: function() {
		this.getView().setModel(new sap.ui.model.json.JSONModel(), "newCommucation");
		this.initializeData();
	},
	onSave: function() {
		var newCommucation = this.getView().getModel("newCommucation").getData().Detail;
		if (newCommucation.Name == undefined || newCommucation.Value == undefined) {
			sap.m.MessageToast.show("填写所有必须输入字段");
			return;
		}
		var mPayload = {
			Usrid: newCommucation.Usrid,
			Name: newCommucation.Name,
			Value: newCommucation.Value,
			Begda: newCommucation.Begda,
			Endda: newCommucation.Endda
		};
		var oModel = this.getView().getModel();

		oModel.create("/EE_COMMUNICATION_SET", mPayload, {
			success: jQuery.proxy(function(mResponse) {
				this.initializeData();
					idPersonalInfoSplitApp.app.backToPage("idPeopleDetailInfo");
					jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("新建联系信息提交成功");
			}, this),
			error: jQuery.proxy(function() {
			    jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show("新建联系信息提交失败");
			}, this)
		});
	},
	back: function() {
		idPersonalInfoSplitApp.app.backToPage("idPeopleDetailInfo");
	}

});