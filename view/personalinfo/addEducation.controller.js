sap.ui.controller("com.zhenergy.hr.view.personalinfo.addEducation", {

	back: function() {
		idPersonalInfoSplitApp.app.backToPage("idEducationInfo");
	},
    initializeData : function() {
       if (window.cordova && appContext && !window.sap_webide_companion) {
			var usrid = appContext.registrationContext.user.toUpperCase();
		} else {
			var usrid = "AC-SHENFT";
		}
        this.getView().getModel("newEducation").setData({
            Detail: {
                DiscontinuedFlag: false,
                usrid:usrid,
                xueLiBiaoZhi:0
            }
        });
    },
    onInit: function() {
        this.getView().setModel(new sap.ui.model.json.JSONModel(), "newEducation");
        this.initializeData();
	},
    onSave : function(){
        var newEducation = this.getView().getModel("newEducation").getData().Detail;
        if(newEducation.jiaoYuLeiXing==undefined||newEducation.yuanXiao==undefined||newEducation.kaiShiRiQi==undefined||newEducation.jieShuRiQi==undefined){
            sap.m.MessageToast.show("填写所有必须输入字段");
            return;
        }
        console.log(newEducation);
        var mPayload = {
            Usrid: newEducation.usrid,
            Slart: newEducation.jiaoYuLeiXing,
            Insti: newEducation.yuanXiao,
            StartDate: newEducation.kaiShiRiQi,
            EndDate: newEducation.jieShuRiQi,
            Anzkl: newEducation.xueZhi1,
            Anzeh: newEducation.xueZhi2,
            Acaqu: newEducation.xueLi,
            Zzxw1: newEducation.xueWei,
            Zzxw2: newEducation.zhuanYeLeiBie,
            Majar2: newEducation.zhuanYeMingCheng,
            Bfwkq: newEducation.xueLiBiaoZhi
            //封装参数
        };
        console.log(mPayload);
        var oModel = this.getView().getModel();
        oModel.create("/EE_EDUCATION_SET", mPayload, {
            success : jQuery.proxy(function() {
                this.initializeData();
    //             if (window.cordova && appContext && !window.sap_webide_companion) {
				// 	busyDialog = new sap.m.BusyDialog();
				// 	busyDialog.open();
				// 	clearStore.call(window,'idEducationInfo');
					
				// } else {
					idPersonalInfoSplitApp.app.backToPage("idEducationInfo");
					jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("新增教育申请提交成功");
				// }
            }, this),
            error : jQuery.proxy(function() {
                jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show("新增教育申请提交失败");
            }, this)                         
        });
    },

});