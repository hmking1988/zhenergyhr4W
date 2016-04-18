sap.ui.controller("com.zhenergy.hr.view.personalinfo.addAddress", {
    back:function(){
        idPersonalInfoSplitApp.app.backToPage("idPeopleAddrInfo");
    },
    initializeData : function() {
        if (window.cordova && appContext && !window.sap_webide_companion) {
			var usrid = appContext.registrationContext.user.toUpperCase();
		} else {
			var usrid = "AC-SHENFT";
		}
        this.getView().getModel("newAddress").setData({
            Detail: {
                DiscontinuedFlag: false,
                Usrid:usrid,
                JieShuRiQi:"99991231"
            }
        });
    },
    onInit: function() {
        this.getView().setModel(new sap.ui.model.json.JSONModel(), "newAddress");
        this.initializeData();
	},
	onSave : function(){
        var newAddress = this.getView().getModel("newAddress").getData().Detail;
        if(newAddress.Subty==undefined||newAddress.KaiShiRiQi==undefined||newAddress.JieShuRiQi==undefined){
            sap.m.MessageToast.show("填写所有必须输入字段");
            return;
        }
        var mPayload = {
            Usrid: newAddress.Usrid,
            Subty: newAddress.Subty,
            PostalCode: newAddress.PostalCode,
            State: newAddress.Sheng,
            Begda: newAddress.KaiShiRiQi,
            Endda: newAddress.JieShuRiQi,
            Ort01: newAddress.ChengShi,
            Ort02: newAddress.Xian,
            Locat: newAddress.XiangXiDiZhi,
            Stras: newAddress.JieDao,
            Hsnmr: newAddress.Zhuang,
            Posta: newAddress.FangJianHao
        };
        var oModel = this.getView().getModel();
        oModel.create("/EE_ADDRESS_SET", mPayload, {
            success : jQuery.proxy(function() {
                this.initializeData();      
					idPersonalInfoSplitApp.app.backToPage("idPeopleAddrInfo");
					jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("新增地址信息提交成功");
            }, this),
            error : jQuery.proxy(function() {
                sap.m.MessageToast.show("新增地址信息提交失败");
            }, this)                         
        });
    },
    

});