sap.ui.define([
		'sap/m/MessageBox',
	])
sap.ui.controller("com.zhenergy.hr.view.personalinfo.editAddress", {

	back: function() {
		idPersonalInfoSplitApp.app.backToPage("idPeopleAddrInfo");
	},
	ondelete: function(oEvent) {
		var context = oEvent.getSource().getBindingContext();
		var sPath = context.sPath;
		var oModel = sap.ui.getCore().getModel();
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(
			bundle.getText("确定删除？"),
			function(oAction) {
				if (sap.m.MessageBox.Action.OK === oAction) {
					onDeleteLoad(); //删除申请
				}
			},
			bundle.getText("删除")
		);

		function onDeleteLoad(oEvent) {
			oModel.remove(sPath, {
				success: jQuery.proxy(function() {
				// 	if (window.cordova && appContext && !window.sap_webide_companion) {
				// 		busyDialog = new sap.m.BusyDialog();
				// 		busyDialog.open();
				// 		clearStore.call(window, 'idPeopleAddrInfo');
				// 	} else {
						idPersonalInfoSplitApp.app.backToPage("idPeopleAddrInfo");
						jQuery.sap.require("sap.m.MessageToast");
						sap.m.MessageToast.show("删除申请提交成功");
				// 	}
				}, this),
				error: jQuery.proxy(function() {
					sap.m.MessageToast.show("删除申请提交失败");
				}, this)
			});
		}
	},
	onSave: function(oEvent) {
		var context = oEvent.getSource().getBindingContext();
		var sPath = context.sPath;
		var juZhuLeiXing = this.getView().byId("juZhuLeiXing").getSelectedKey();
		var youZhengBianMa = this.getView().byId("youZhengBianMa").getValue();
		var shengFen = this.getView().byId("shengFen").getSelectedKey();
		var kaiShiRiQi = this.getView().byId("kaiShiRiQi").getValue();
		var jieShuRiQi = this.getView().byId("jieShuRiQi").getValue();
		var chengShi = this.getView().byId("chengShi").getValue();
		var xianDaiMa = this.getView().byId("xianDaiMa").getValue();
		var xiangXiDiZhi = this.getView().byId("xiangXiDiZhi").getValue();
		var jieDaoMenPaiHao = this.getView().byId("jieDaoMenPaiHao").getValue();
		var zhuang = this.getView().byId("zhuang").getValue();
		var fangJianHao = this.getView().byId("fangJianHao").getValue();
		// console.log(juZhuLeiXing+"="+youZhengBianMa+"="+shengFen+"="+kaiShiRiQi+"="+jieShuRiQi);
		// console.log(chengShi+"="+xianDaiMa+"="+xiangXiDiZhi+"="+jieDaoMenPaiHao+"="+zhuang+"="+fangJianHao);
		if (window.cordova && appContext && !window.sap_webide_companion) {
			var usrid = appContext.registrationContext.user.toUpperCase();
		} else {
			var usrid = "AC-SHENFT";
		}
		var mPayload = {
			Pernr: usrid,
			Subty: juZhuLeiXing,
			PostalCode: youZhengBianMa,
			State: shengFen,
			Begda: kaiShiRiQi,
			Endda: jieShuRiQi,
			Ort01: chengShi,
			Ort02: xianDaiMa,
			Locat: xiangXiDiZhi,
			Stras: jieDaoMenPaiHao,
			Hsnmr: zhuang,
			Posta: fangJianHao
		};
		var oModel = this.getView().getModel();
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(
			bundle.getText("确定修改？"),
			function(oAction) {
				if (sap.m.MessageBox.Action.OK === oAction) {
					onupdate(); //删除申请
				}
			},
			bundle.getText("修改")
		);

		function onupdate() {
			oModel.update(sPath, mPayload, {
				success: jQuery.proxy(function() {
				// 	if (window.cordova && appContext && !window.sap_webide_companion) {
				// 		busyDialog = new sap.m.BusyDialog();
				// 		busyDialog.open();
				// 		clearStore.call(window, 'idPeopleAddrInfo');
				// 	} else {
						idPersonalInfoSplitApp.app.backToPage("idPeopleAddrInfo");
						jQuery.sap.require("sap.m.MessageToast");
						sap.m.MessageToast.show("修改地址信息提交成功");
				// 	}
				}, this),
				error: jQuery.proxy(function() {
					sap.m.MessageToast.show("修改地址信息提交失败");
				}, this)
			});
		}
	},

});