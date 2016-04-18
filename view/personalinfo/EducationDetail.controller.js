sap.ui.define(['sap/m/MessageBox',])
sap.ui.controller("com.zhenergy.hr.view.personalinfo.EducationDetail", {
    onInit: function() {
        this.getView().byId("familyOnSave").addStyleClass('FMNODisplay');
        this.getView().byId("familyOnDelete").addStyleClass('FMNODisplay');
	},
    back:function(evt){
        idPersonalInfoSplitApp.app.backToPage("idEducationInfo");
        this.changeEditable(false);
        this.getView().byId("familyOnSave").addStyleClass('FMNODisplay');
        this.getView().byId("familyOnDelete").addStyleClass('FMNODisplay');
    },

    edit : function(){
        this.changeEditable(true);
        this.getView().byId("familyOnSave").removeStyleClass('FMNODisplay');
        this.getView().byId("familyOnDelete").removeStyleClass('FMNODisplay');
    },
    changeEditable : function(value){
        this.getView().byId("jiaoYuLeiXings").setEditable(value);
        this.getView().byId("yuanXiao").setEditable(value);
        this.getView().byId("kaiShiRiQi").setEditable(value);
        this.getView().byId("jieShuRiQi").setEditable(value);
        this.getView().byId("xueZhi1").setEditable(value);
        this.getView().byId("xueZhi2").setEditable(value);
        this.getView().byId("xueLi").setEditable(value);
        this.getView().byId("xueWei").setEditable(value);
        this.getView().byId("zhuanYeLeiBie").setEditable(value);
        this.getView().byId("zhuanYeMingCheng").setEditable(value);
        this.getView().byId("xueLiBiaoZhi").setEditable(value);
    },

    onSave:function(oEvent){
        this.changeEditable(false);
        this.getView().byId("familyOnSave").addStyleClass('FMNODisplay');
        this.getView().byId("familyOnDelete").addStyleClass('FMNODisplay');
	    var context = oEvent.getSource().getBindingContext();
	    var sPath =context.sPath;
        var jiaoYuLeiXing = this.getView().byId("jiaoYuLeiXings").getSelectedKey();
        var yuanXiao = this.getView().byId("yuanXiao").getValue();
        var kaiShiRiQi = this.getView().byId("kaiShiRiQi").getValue();
        var jieShuRiQi = this.getView().byId("jieShuRiQi").getValue();
        var xueZhi1 = this.getView().byId("xueZhi1").getValue();
        var xueZhi2 = this.getView().byId("xueZhi2").getSelectedKey();
        var xueLi = this.getView().byId("xueLi").getSelectedKey();
        var xueWei = this.getView().byId("xueWei").getSelectedKey();
        var zhuanYeLeiBie = this.getView().byId("zhuanYeLeiBie").getSelectedKey();
        var zhuanYeMingCheng = this.getView().byId("zhuanYeMingCheng").getValue();
        var xueLiBiaoZhi = this.getView().byId("xueLiBiaoZhi").getSelectedIndex();
        // console.log(jiaTingGuanXi+"="+xingMing+"="+xingBie+"="+chuShengRiQi+"="+dianHuaHaoMa+"="+youZhengBianMa+"="+zhuangTai);
        // console.log(zhengZhiMianMao+"="+gongZuoDanWei+"="+zhiWu+"="+xueLi+"="+kaiShiRiQi+"="+jieShuRiQi+"="+biaoZhi);
        var dateNow = new Date();
        var dateNows = Date.parse(dateNow);
        var styear=kaiShiRiQi.substring(0,4);  
        var stmonth=kaiShiRiQi.substring(4,6);  
        var stday=kaiShiRiQi.substring(6,8); 
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
                Slart: jiaoYuLeiXing,
                Insti: yuanXiao,
                StartDate: kaiShiRiQi,
                EndDate: jieShuRiQi,
                Anzkl: xueZhi1,
                Anzeh: xueZhi2,
                Acaqu: xueLi,
                Zzxw1: xueWei,
                Zzxw2: zhuanYeLeiBie,
                Majar2: zhuanYeMingCheng,
                Bfwkq: xueLiBiaoZhi
            };
            var oModel = sap.ui.getCore().getModel();
            oModel.update(sPath, mPayload, {
                success : jQuery.proxy(function() {
    //                 if (window.cordova && appContext && !window.sap_webide_companion) {
				// 		busyDialog = new sap.m.BusyDialog();
				// 		busyDialog.open();
				// 		clearStore.call(window,'idEducationInfo');
				// 	} else{
					idPersonalInfoSplitApp.app.backToPage("idEducationInfo");
					jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("修改教育信息提交成功");
				// 	}
                }, this),
                error : jQuery.proxy(function() {
                    sap.m.MessageToast.show("修改教育信息提交失败");
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
				// 		clearStore.call(window, 'idEducationInfo');
				// 	} else {
						idPersonalInfoSplitApp.app.backToPage("idEducationInfo");
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