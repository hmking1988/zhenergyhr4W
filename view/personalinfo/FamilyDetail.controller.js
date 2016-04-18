sap.ui.define([
		'sap/m/MessageBox',
	])
sap.ui.controller("com.zhenergy.hr.view.personalinfo.FamilyDetail", {
    onInit: function() {
	    this.getView().byId("familyOnSave").addStyleClass('FMNODisplay');
        this.getView().byId("familyOnDelete").addStyleClass('FMNODisplay');
	},
    back:function(evt){
        idPersonalInfoSplitApp.app.backToPage("idFamilyInfoMaster");
        this.changeEditable(false);
        this.getView().byId("familyOnSave").addStyleClass('FMNODisplay');
        this.getView().byId("familyOnDelete").addStyleClass('FMNODisplay');
    },
    download : function(){
        this.changeEditable(true);
        this.getView().byId("familyOnSave").removeStyleClass('FMNODisplay');
        this.getView().byId("familyOnDelete").removeStyleClass('FMNODisplay');
    },
    changeEditable : function(value){
        this.getView().byId("xingMing").setEditable(value);
        this.getView().byId("xingBie").setEditable(value);
        this.getView().byId("chuShengRiQi").setEditable(value);
        this.getView().byId("dianHuaHaoMa").setEditable(value);
        this.getView().byId("detailAddress").setEditable(value);
        this.getView().byId("youZhengBianMa").setEditable(value);
        this.getView().byId("zhuangTai").setEditable(value);
        this.getView().byId("zhengZhiMianMao").setEditable(value);
        this.getView().byId("gongZuoDanWei").setEditable(value);
        this.getView().byId("zhiWu").setEditable(value);
        this.getView().byId("xueLi").setEditable(value);
        this.getView().byId("kaiShiRiQi").setEditable(value);
        this.getView().byId("jieShuRiQi").setEditable(value);
        this.getView().byId("biaoZhi").setEditable(value);
    },
    onSave:function(oEvent){
        this.changeEditable(false);
        this.getView().byId("familyOnSave").addStyleClass('FMNODisplay');
        this.getView().byId("familyOnDelete").addStyleClass('FMNODisplay');
	    var context = oEvent.getSource().getBindingContext();
	    var sPath =context.sPath;
        var jiaTingGuanXi = this.getView().byId("familyGuanXi").getText();
        var xingMing = this.getView().byId("xingMing").getValue();
        var xingBie = this.getView().byId("xingBie").getSelectedIndex();
        var chuShengRiQi = this.getView().byId("chuShengRiQi").getValue();
        var dianHuaHaoMa = this.getView().byId("dianHuaHaoMa").getValue();
        var xiangxidizhi = this.getView().byId("detailAddress").getValue();
        var youZhengBianMa = this.getView().byId("youZhengBianMa").getValue();
        var zhuangTai = this.getView().byId("zhuangTai").getSelectedKey();
        var zhengZhiMianMao = this.getView().byId("zhengZhiMianMao").getSelectedKey();
        var gongZuoDanWei = this.getView().byId("gongZuoDanWei").getValue();
        var zhiWu = this.getView().byId("zhiWu").getValue();
        var xueLi = this.getView().byId("xueLi").getValue();
        var kaiShiRiQi = this.getView().byId("kaiShiRiQi").getValue();
        var jieShuRiQi = this.getView().byId("jieShuRiQi").getValue();
        var biaoZhi = this.getView().byId("biaoZhi").getSelectedIndex();
        // console.log(jiaTingGuanXi+"="+xingMing+"="+xingBie+"="+chuShengRiQi+"="+dianHuaHaoMa+"="+youZhengBianMa+"="+zhuangTai);
        // console.log(zhengZhiMianMao+"="+gongZuoDanWei+"="+zhiWu+"="+xueLi+"="+kaiShiRiQi+"="+jieShuRiQi+"="+biaoZhi);
        var dateNow = new Date();
        var dateNows = Date.parse(dateNow);
        var styear=chuShengRiQi.substring(0,4);  
        var stmonth=chuShengRiQi.substring(4,6);  
        var stday=chuShengRiQi.substring(6,8); 
        var chuShengDate = new Date(styear+"/"+"/"+stmonth+"/"+stday);
        var dateBir = Date.parse(chuShengDate);
        if(dateBir>dateNows){
            sap.m.MessageToast.show("请输入合法的出生日期");
            return;
        }
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
					onupdate(); //删除申请
				}
			},
			bundle.getText("修改")
		);
		function onupdate(){
		    var mPayload = {
                Pernr: usrid,
                Subty: jiaTingGuanXi,
                Name: xingMing,
                Fasex: xingBie,
                Birthday: chuShengRiQi,
                Cellphone: dianHuaHaoMa,
                Address: xiangxidizhi,
                PostalCode: youZhengBianMa,
                Status: zhuangTai,
                Pstat: zhengZhiMianMao,
                Company: gongZuoDanWei,
                Position: zhiWu,
                Eduction: xueLi,
                Begda: kaiShiRiQi,
                Endda: jieShuRiQi,
                Zzgatqbs: biaoZhi
    
            };
            var oModel = sap.ui.getCore().getModel();
             oModel.update(sPath, mPayload, {
                success : jQuery.proxy(function() {
    //                 if (window.cordova && appContext && !window.sap_webide_companion) {
				// 		busyDialog = new sap.m.BusyDialog();
				// 		busyDialog.open();
				// 		clearStore.call(window,'idFamilyInfoMaster');
				// 	} else{
					idPersonalInfoSplitApp.app.backToPage("idFamilyInfoMaster");
					jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("修改家庭及社会关系提交成功");
				// 	}
                }, this),
                error : jQuery.proxy(function() {
                    sap.m.MessageToast.show("修改家庭及社会关系提交失败");
                }, this)                         
            });
		}
	},
	ondelete: function(oEvent) {
	    this.changeEditable(false);
        this.getView().byId("familyOnSave").addStyleClass('FMNODisplay');
        this.getView().byId("familyOnDelete").addStyleClass('FMNODisplay');
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
				// 		clearStore.call(window, 'idFamilyInfoMaster');
				// 	} else {
						idPersonalInfoSplitApp.app.backToPage("idFamilyInfoMaster");
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
});


