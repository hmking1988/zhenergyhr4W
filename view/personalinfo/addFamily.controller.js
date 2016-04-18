sap.ui.controller("com.zhenergy.hr.view.personalinfo.addFamily", {
    back : function(){
        idPersonalInfoSplitApp.app.backToPage("idFamilyInfoMaster");
        
    },
    onSave : function(){
        
    },
    initializeData : function() {
        if (window.cordova && appContext && !window.sap_webide_companion) {
			var usrid = appContext.registrationContext.user.toUpperCase();
		} else {
			var usrid = "AC-SHENFT";
		}
        this.getView().getModel("newFamily").setData({
            Detail: {
                DiscontinuedFlag: false,
                Usrid:usrid,
                xingBie:0,
                Endda:"99991231",
                biaoZhi:0
            }
        });
    },
    onInit: function() {
        this.getView().setModel(new sap.ui.model.json.JSONModel(), "newFamily");
        this.initializeData();
        var newFamily = this.getView().getModel("newFamily").getData().Detail;
	},
	onSave : function(){
        var newFamily = this.getView().getModel("newFamily").getData().Detail;
        if(newFamily.Begda==undefined||newFamily.Endda==undefined||newFamily.ChuShengRiQi==undefined||newFamily.Subty==undefined||newFamily.danWei==undefined){
            sap.m.MessageToast.show("填写所有必须输入字段");
            return;
        }
        var dateNow = new Date();
        var dateNows = Date.parse(dateNow);
        var styear=newFamily.ChuShengRiQi.substring(0,4);  
        var stmonth=newFamily.ChuShengRiQi.substring(4,6);  
        var stday=newFamily.ChuShengRiQi.substring(6,8); 
        var chuShengDate = new Date(styear+"/"+"/"+stmonth+"/"+stday);
        var dateBir = Date.parse(chuShengDate);
        if(dateBir>dateNows){
            sap.m.MessageToast.show("请输入合法的出生日期");
            return;
        }
        //console.log(newFamily);
        var mPayload = {
            Usrid: newFamily.Usrid,
            Subty: newFamily.Subty,
            Name: newFamily.Name,
            Fasex: newFamily.xingBie,
            Birthday: newFamily.ChuShengRiQi,
            Cellphone: newFamily.Telphone,
            Address: newFamily.detailAddress,
            PostalCode: newFamily.PostCode,
            Status: newFamily.zhuangTai,
            Pstat: newFamily.zhengZhiMianMao,
            Company: newFamily.danWei,
            Position: newFamily.zhiWu,
            Eduction: newFamily.xueLi,
            Begda: newFamily.Begda,
            Endda: newFamily.Endda,
            Zzgatqbs: newFamily.biaoZhi
        };
        //console.log(mPayload);
        var oModel = this.getView().getModel();
        oModel.create("/EE_FAMILY_SET", mPayload, {
            success : jQuery.proxy(function() {
                this.initializeData();
    //             if (window.cordova && appContext && !window.sap_webide_companion) {
				// 	busyDialog = new sap.m.BusyDialog();
				// 	busyDialog.open();
				// 	clearStore.call(window,'idFamilyInfoMaster');
					
				// } else {
					idPersonalInfoSplitApp.app.backToPage("idFamilyInfoMaster");
					jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("新增家庭及社会关系提交成功");
				// }
            }, this),
            error : jQuery.proxy(function() {
                this.showErrorAlert("新增家庭及社会关系提交失败");
            }, this)                         
        });
    },
    

});