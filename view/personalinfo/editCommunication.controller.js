sap.ui.define([
		'sap/m/MessageBox',
	])

sap.ui.controller("com.zhenergy.hr.view.personalinfo.editCommunication", {
	//按delete触发的事件
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
				//     if (window.cordova && appContext && !window.sap_webide_companion) {
				// 		busyDialog = new sap.m.BusyDialog();
				// 		busyDialog.open();
				// 		clearStore.call(window,'idPeopleDetailInfo');
				// 	} else{
					idPersonalInfoSplitApp.app.backToPage("idPeopleDetailInfo");
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
	//按保存按钮触发
	onSave: function(oEvent) {
		var context = oEvent.getSource().getBindingContext();
		var sPath = context.sPath;
		var ziLeiXing = this.getView().byId("ziLeiXing").getText();
		var miaoShu = this.getView().byId("miaoshu").getValue();
		var kaiShiRiQi2 = this.getView().byId("kaiShiRiQi").getValue();
		var jieShuRiQi = this.getView().byId("JieShuRiQi").getValue();
		if (window.cordova && appContext && !window.sap_webide_companion) {
			var usrid = appContext.registrationContext.user.toUpperCase();
		} else {
			var usrid = "AC-SHENFT";
		}
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(
			bundle.getText("确定修改？"),
			function(oAction) {
				if (sap.m.MessageBox.Action.OK === oAction) {
					edit_onSaveLoad(); //messageBox按确定触发
				}
			},
			bundle.getText("修改")
		);
		//messageBox按确定触发
		function edit_onSaveLoad(oEvent) {

			var mPayload = {
				Pernr: usrid,
				Name: ziLeiXing,
				Value: miaoShu,
				Begda: kaiShiRiQi2,
				Endda: jieShuRiQi
			};
			var oModel = sap.ui.getCore().getModel();
			oModel.update(sPath, mPayload, {
				success: jQuery.proxy(function(mResponse) {
					//setModel.call(window);
					
					idPersonalInfoSplitApp.app.backToPage("idPeopleDetailInfo");
					jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("修改联系信息提交成功");
					
				}, this),
				error: jQuery.proxy(function() {
					sap.m.MessageToast.show("修改联系信息提交失败");
				}, this)
			});

		}
	},
	//返回按钮
	back : function(){
	    idPersonalInfoSplitApp.app.backToPage("idPeopleDetailInfo");
	}

});