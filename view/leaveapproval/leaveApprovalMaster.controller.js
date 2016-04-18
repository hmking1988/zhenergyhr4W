sap.ui.controller("com.zhenergy.hr.view.leaveapproval.leaveApprovalMaster", {

	onInit: function() {

		this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
	},
	onBeforeShow: function() {

		var oListTemplate = new sap.m.CustomListItem({
			type: 'Navigation',
			press: this.handleListItemPress,
			content: [
                                                                         new sap.m.HBox({
					width: '100%',
					items: [
                                                                                                new sap.m.VBox({
							alignItems: 'Center',
							direction: 'Column',
							height: '55px',
							width: '5%',
							justifyContent: 'Center'
						}),
                                                                                                new sap.m.VBox({
							alignItems: 'Start',
							direction: 'Column',
							height: '55px',
							width: '75%',
							justifyContent: 'Center',
							items: [
                                                                                                                       new sap.m.ObjectAttribute({
									active: false,
									text: {
										path: 'TaskTitle'
									}
								}),
                                                                                                                       new sap.m.ObjectAttribute({
									active: false,
									text: {
										path: 'CreatedByName'
									}
								})
                                                                                                                       ]
						}),
                                                                                                new sap.m.VBox({
							alignItems: 'End',
							direction: 'Column',
							height: '55px',
							width: '20%',
							justifyContent: 'End',
							items: [
                                                                                                                       new sap.m.Label({
									text: {
										path: 'CreatedOn',
										formatter: this.dateformatter
									}
								}),
                                                                                                                       new sap.m.ObjectStatus({
									state: {
										path: 'Status',
										formatter: this.status
									},
									text: {
										path: 'Status',
										formatter: this.statustext
									}
								})
                                                                                                                       ]
						})
                                                                                                ]
				})
                                                                         ],
			customData: [
                                                                            new sap.ui.core.CustomData({
					value: {
						path: 'InstanceID'
					}
				}),
                                                                            new sap.ui.core.CustomData({
					value: {
						path: 'TaskTitle'
					}
				})
                                                                            ]
		});

		var oBindingInfo = {
			path: '/results',
			template: oListTemplate,
			factory: null,
			sorter: new sap.ui.model.Sorter('CreatedOn', true, false),
			parameters: null,
			groupHeaderFactory: null
		};

		var jModel = new sap.ui.model.json.JSONModel();
		var list = this.getView().byId("restaa");
		list.setNoDataText('无数据');
		list.removeAllItems();
		list.bindItems(oBindingInfo);

		var oModel = sap.ui.getCore().getModel('bpmtask');

		var mParameters = {};

		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(data) {

			jModel.setData(data);
			list.setModel(jModel);
		}, this);
		mParameters['error'] = jQuery.proxy(function(data) {
			sap.m.MessageToast.show("网络连接失败，请重试");
		}, this);

		oModel.read(
			"/TaskCollection?$filter=((Status eq 'READY' or Status eq 'RESERVED' or Status eq 'IN_PROGRESS') and TaskDefinitionName eq '请假申请审批')&j_username=" +
			usrid + "&j_password=" + pwd,
			mParameters);
	},
	handleListItemPress: function(evt) {

		var context = jQuery.device.is.phone ? evt.getSource().getBindingContext() : evt.getParameter("listItem").getBindingContext();
		instanceID = evt.getSource().getCustomData()[0].getValue().match(/[a-f0-9]+$/);
		processid = evt.getSource().getCustomData()[1].getValue().match(/[0-9]+/);
		var aModel = sap.ui.getCore().getModel('bpmtask');
		aModel.create("/Claim?InstanceID='" + instanceID + "'", null, null, function(data, response) {
			if (response.statusCode == "200") {
				masterlistitem = evt.getSource();
				leaveApproval.app.to("idleaveApprovalDetail", context);

			} else {
				sap.m.MessageToast.show('BPM声明失败，请稍后尝试！');
				console.log(response);
			}
		}, function(oEvent) {
			sap.m.MessageToast.show('网络连接失败，请稍后尝试！');
			console.log(oEvent.response);
		});

	},
	newApplicationPress: function(evt) {

	},
	approvalListPress: function(evt) {

	},
	back: function() {
		app.back("idlaunchpad");
	},
	handlePressHome: function() {
		app.backToTop();
	},
	dateformatter: function(val) {
		if (val != "" && val != null) {
			if (typeof(val) == "string") {
				var date = new Date(Number(val.match(/[0-9]+/)));
				return (date.getMonth() + 1) + '-' + date.getDate();
			} else {
				return (val.getMonth() + 1) + '-' + val.getDate();
			}
		} else {
			return "";
		}
	},
	status: function(val) {
		if (val === "READY") {
			return "Success";
		} else if (val === "RESERVED") {
			return "Warning";
		} else if (val === "IN_PROGRESS") {
			return "Error";
		} else {
			return "None";
		}
	},
	statustext: function(val) {
		switch (val) {
			case "READY":
				val = "待处理";
				break;
			case "RESERVED":
				val = "已锁定";
				break;
			case "IN_PROGRESS":
				val = "进行中";
				break;
			case "COMPLETED":
				val = "已完成";
				break;
			default:

				break;
		}
		return val;
	},
	reloadData: function() {
		this.onBeforeShow();
	}
});