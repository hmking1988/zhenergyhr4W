sap.ui.controller("com.zhenergy.hr.view.pageconsultanttask.pageConsultantTaskDetail", {

	onInit: function() {
		this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onBeforeShow: jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this),
			onAfterShow: jQuery.proxy(function(evt) {
				this.onAfterShow(evt);
			}, this)
		});
	},
	onBeforeShow: function(evt) {
		if (evt) {
			var list = this.getView().byId("aa");
			list.setNoDataText("加载中…");
			list.removeAllItems();
		}
	},
	onAfterShow: function(evt) {
		if (evt) {
			var sEntityPath = consultanttaskContext + "/EE_PAYSLIP_ITEM_SET?&sap-language=zh_CN";
			var oDummyList = this.getView().byId("aa");
            if(payDetailTitle!=""){
                this.getView().byId('paydepageid').setTitle(payDetailTitle+"发放工资详情");
            }else{
                this.getView().byId('paydepageid').setTitle("工资详情");
            }
			var sort = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(sort, "sort");

			var oListTemplate = new sap.m.StandardListItem({
				title: "{Wagetxt}",
				description: "当月:{Amount} 累计:{Ytd}",

				info: {
					path: "Group", //the property based on which it needs to be sorted
					//List Grouping
					formatter: function(fValue) {
						if (fValue) {
							if (sap.ui.getCore().getModel("sort").getData().sortBy !== fValue) {

								sap.ui.getCore().getModel("sort").getData().sortBy = fValue;
								var ftitle;
								switch (fValue) {
									case "05":
										ftitle = "基本工资";
										break;
									case "10":
										ftitle = "税基";
										break;
									case "20":
										ftitle = "社保";
										break;
									case "25":
										ftitle = "税收";
										break;
									case "35":
										ftitle = "代缴代扣";
										break;
									case "39":
										ftitle = "实发";
										break;
									default:
										ftitle = fValue;
										break;
								}
								this.getParent().insertItem(new sap.m.GroupHeaderListItem({
									title: ftitle
								}), this.getParent().indexOfItem(this)); //Insert a list header
								this.setType("Inactive")
							}
							return null;
						}
						return fValue;
					}

				}
			});
			oDummyList.bindItems(sEntityPath, oListTemplate, null, null);
		}
	},
	handleNavButtonPress: function(evt) {
		pageConsultantTask.app.backToPage("idpageConsultantTaskMaster");
	},
	handlePressHome: function() {
		app.backToTop();
	}

});