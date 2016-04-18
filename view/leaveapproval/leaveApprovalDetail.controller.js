sap.ui.controller("com.zhenergy.hr.view.leaveapproval.leaveApprovalDetail", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf com.zhenergy.hr.view.time.LeaveRequestDetail
	 */
	onInit: function() {
		this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
	},
	onBeforeShow: function() {
		jQuery.sap.require("sap.m.MessageToast");
		var request =
			'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">' +
			'<soapenv:Header/><soapenv:Body><urn:ZfmBpmHrLeaveGetperinfo>' +
			'<EtLeaType></EtLeaType><IvProcessId>' + processid + '</IvProcessId><IvUname></IvUname>' +
			'</urn:ZfmBpmHrLeaveGetperinfo></soapenv:Body></soapenv:Envelope>';

		var serviceURL =
			"http://" + ecc_url + "/sap/bc/srt/rfc/sap/zfg_bpm_hr_leave/" + clientid + "/zhr_leave/zhr_leave?&sap-language=zh_CN";
		var oModel = new sap.ui.model.xml.XMLModel();
		jQuery.ajax({
			url: serviceURL,
			type: "POST",
			data: request,
			timeout: 10000,
			username: "gw_user",
			password: "init1234",
			dataType: "text",
			SOAPAction: "urn:sap-com:document:sap:soap:functions:mc-style:ZFG_BPM_HR_LEAVE:ZfmBpmHrLeaveGetperinfoRequest", //在多个function module时需要指定
			contentType: "text/xml; charset=\"utf-8\"",
			success: function(data, textStatus, jqXHR) {
				secondrequestdata = data;
				oModel.setXML(data);
				sap.ui.getCore().setModel(oModel, 'restDatasp');
			},
			error: function(xhr, status) {
				sap.m.MessageToast.show("网络连接失败！");

			},
			complete: function(xhr, status) {
				//                              sap.m.MessageToast.show("2");

			}
		});
		//审批部分

		var aModel = sap.ui.getCore().getModel('bpmtaskdata');
		aModel.refreshSecurityToken();
		aModel.setHeaders({
			"X-Requested-With": "XMLHttpRequest",
			"Content-Type": "application/json",
			"DataServiceVersion": "2.0",
			"X-CSRF-Token": "Fetch"
		});
		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(data, response) {
			var bz = 0,
				bm = 0,
				hr = 0,
				fgld = 0,
				dwld = 0,
				gh = 0;
			seli = 0;
			this.getView().byId('selection').setVisible(false);
			for (var i = 0; i < data.results[0].ContextTypeINPUT.Context.SPRList.results.length; i++) {
				switch (data.results[0].ContextTypeINPUT.Context.SPRList.results[i].step) {
					case "01":
						bz = bz + 1;
						break;
					case "02":
						bm = bm + 1;
						break;
					case "03":
						hr = hr + 1;
						break;
					case "04":
						fgld = fgld + 1;
						break;
					case "05":
						dwld = dwld + 1;
						break;
					case "06":
						gh = gh + 1;
						break;
					default:
						break;
				}
				if (i < data.results[0].ContextTypeINPUT.Context.SPRList.results.length - 1) {
					if (data.results[0].ContextTypeINPUT.Context.ProcessInfo.step == data.results[0].ContextTypeINPUT.Context.SPRList.results[i].step &&
						(data.results[0].ContextTypeINPUT.Context.SPRList.results[i + 1].step == "04" || data.results[0].ContextTypeINPUT.Context.SPRList.results[
							i + 1].step == "05")) {
						seli = i + 1;

						this.getView().byId('selection').setVisible(true);
					}
				}
			}
			if (seli != 0) {

				var req =
					'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style"><soapenv:Header/><soapenv:Body><urn:ZfmBpmHrLeaveGetSpr><EtLeaspAd></EtLeaspAd><ProcessId>' +
					processid + '</ProcessId><Werks></Werks></urn:ZfmBpmHrLeaveGetSpr></soapenv:Body></soapenv:Envelope>';

				var sModel = new sap.ui.model.xml.XMLModel();
				jQuery.ajax({
					url: serviceURL,
					type: "POST",
					data: req,
					timeout: 10000,
					username: "gw_user",
					password: "init1234",
					dataType: "text",
					SOAPAction: "urn:sap-com:document:sap:soap:functions:mc-style:ZFG_BPM_HR_LEAVE:ZfmBpmHrLeaveGetSprRequest", //在多个function module时需要指定
					contentType: "text/xml; charset=\"utf-8\"",
					success: function(seldata, textStatus, jqXHR) {
						if (data.results[0].ContextTypeINPUT.Context.SPRList.results[seli].step == "04") {
							if (/>05</.test(seldata)) {
								sModel.setXML(seldata.replace(/<item><Step>05<[^\b]+(?:item>)/, ""));
							} else {
								sModel.setXML(seldata);
							}
						} else {
							if (/>04</.test(seldata)) {
								sModel.setXML(
									'<soap-env:Envelope xmlns:soap-env=\"http://schemas.xmlsoap.org/soap/envelope/\"><soap-env:Header/><soap-env:Body><n0:ZfmBpmHrLeaveGetSprResponse xmlns:n0=\"urn:sap-com:document:sap:soap:functions:mc-style\"><EtLeaspAd><item><Step' +
									seldata.match(/>05<[^\b]+/));
							} else {
								sModel.setXML(seldata);
							}

						}

						sap.ui.getCore().setModel(sModel, 'selection');

					},
					error: function(xhr, status) {
						sap.m.MessageToast.show("网络连接失败！");
					},
					complete: function(xhr, status) {
						//        sap.m.MessageToast.show("2");

					}
				});

			}
			if (bz > 0) {
				this.getView().byId("bzsuggestion").setVisible(true);
			} else {
				this.getView().byId("bzsuggestion").setVisible(false);
			}
			if (bm > 0) {
				this.getView().byId("dpsuggestion").setVisible(true);
			} else {
				this.getView().byId("dpsuggestion").setVisible(false);
			}
			if (hr > 0) {
				this.getView().byId("hrsuggestion").setVisible(true);
			} else {
				this.getView().byId("hrsuggestion").setVisible(false);
			}
			if (fgld > 0) {
				this.getView().byId("sleadersuggestion").setVisible(true);
			} else {
				this.getView().byId("sleadersuggestion").setVisible(false);
			}
			if (dwld > 0) {
				this.getView().byId("leadersuggestion").setVisible(true);
			} else {
				this.getView().byId("leadersuggestion").setVisible(false);
			}
			if (gh > 0) {
				this.getView().byId("ghsuggestion").setVisible(true);
			} else {
				this.getView().byId("ghsuggestion").setVisible(false);
			}
			submitData = new Array();
			var finalstep = "";
			if (data.results[0].ContextTypeINPUT.Context.ProcessInfo.IsLast) {
				finalstep = "X";
			}

			this.getView().byId("bztext").setEditable(false);
			this.getView().byId("dptext").setEditable(false);
			this.getView().byId("hrtext").setEditable(false);
			this.getView().byId("sleadertext").setEditable(false);
			this.getView().byId("leadertext").setEditable(false);
			this.getView().byId("ghtext").setEditable(false);
			//上审批意见下基础信息
			this.getView().byId("typesp").setEnabled(false);
			this.getView().byId("datesp").setEditable(false);
			this.getView().byId("startDatesp").setEditable(false);
			this.getView().byId("startTimesp").setEditable(false);
			this.getView().byId("endDatesp").setEditable(false);
			this.getView().byId("endTimesp").setEditable(false);
			this.getView().byId("restdayssp").setEditable(false);
			this.getView().byId("reasonsp").setEditable(false);
			this.getView().byId("remarkssp").setEditable(false);
			this.getView().byId("button2").setVisible(false);
			this.getView().byId("button1").setVisible(false);
			switch (data.results[0].ContextTypeINPUT.Context.ProcessInfo.step) {
				case "00":
					this.getView().byId("typesp").setEnabled(true);
					this.getView().byId("datesp").setEditable(true);
					this.getView().byId("startDatesp").setEditable(true);
					this.getView().byId("startTimesp").setEditable(true);
					this.getView().byId("endDatesp").setEditable(true);
					this.getView().byId("endTimesp").setEditable(true);
					this.getView().byId("restdayssp").setEditable(true);
					this.getView().byId("reasonsp").setEditable(true);
					this.getView().byId("remarkssp").setEditable(true);
					this.getView().byId("button2").setVisible(true);
					break;
				case "01":
					this.getView().byId("bztext").setEditable(true);
					this.getView().byId("button1").setVisible(true);
					break;
				case "02":
					this.getView().byId("dptext").setEditable(true);
					this.getView().byId("button1").setVisible(true);
					break;
				case "03":
					this.getView().byId("hrtext").setEditable(true);
					this.getView().byId("button1").setVisible(true);
					break;
				case "04":
					this.getView().byId("sleadertext").setEditable(true);
					this.getView().byId("button1").setVisible(true);
					break;
				case "05":
					this.getView().byId("leadertext").setEditable(true);
					this.getView().byId("button1").setVisible(true);
					break;
				case "06":
					this.getView().byId("ghtext").setEditable(true);
					this.getView().byId("button1").setVisible(true);
					break;
				default:
					break;
			}
			var xtoken = response.headers['x-csrf-token'];
			aModel.setHeaders({
				"X-Requested-With": "XMLHttpRequest",
				"Content-Type": "application/json",
				"DataServiceVersion": "2.0",
				"Accept": "application/atom+xml,application/atomsvc+xml,application/xml",
				"X-CSRF-Token": xtoken
			});

			var jModel = new sap.ui.model.json.JSONModel();
			jModel.setData(data.results[0]);
			submitData = [data.results[0].ContextTypeINPUT.Context.ProcessInfo.step, finalstep, data.results[0].ContextTypeINPUT.Context.ProcessInfo
				.ProcessID, aModel, jModel];
		}, this);
		mParameters['error'] = jQuery.proxy(function(data) {
			sap.m.MessageToast.show("网络连接失败，请重试");
		}, this);

		aModel.read("/" + instanceID + "/InputData?$expand=ContextTypeINPUT/Context/SPRList,ContextTypeINPUT/Context/ProcessInfo",
			mParameters);
	},
	back: function(evt) {
		leaveApproval.app.backToPage("idleaveApprovalMaster");
	},
	handlePressHome: function() {
		app.backToTop();
	},
	typeFormat: function(val) {
		if (val != "" && val != null) {
			return val.match(/[^0-9]+/);
		} else {
			return "";
		}
	},
	submit: function() {
		//sap.m.MessageToast.show('hao');
		var yj = "";
		switch (submitData[0]) {
			case '01':
				yj = this.getView().byId("bztext").getValue();
				break;
			case '02':
				yj = this.getView().byId("dptext").getValue();
				break;
			case '03':
				yj = this.getView().byId("hrtext").getValue();
				break;
			case '04':
				yj = this.getView().byId("sleadertext").getValue();
				break;
			case '05':
				yj = this.getView().byId("leadertext").getValue();
				break;
			case '06':
				yj = this.getView().byId("ghtext").getValue();
				break;
			default:
				break;
		}
		var selectname = this.getView().byId('select').getValue();
		if (selectname == "" && seli != 0) {
			sap.m.MessageToast.show("请选择下一位审批人！");
		} else {
			var request =
				'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style"><soapenv:Header/><soapenv:Body><urn:ZfmBpmHrLeaveAppr><EtMessage></EtMessage><IvApprCode>A</IvApprCode><IvApprover>' +
				usrid + '</IvApprover><IvFinalstep>' +
				submitData[1] + '</IvFinalstep><IvProcessId>' + processid + '</IvProcessId><IvSpjd>' + submitData[0] + '</IvSpjd><IvYj>' + yj +
				'</IvYj></urn:ZfmBpmHrLeaveAppr></soapenv:Body></soapenv:Envelope>';

			var serviceURL =
				"http://" + ecc_url + "/sap/bc/srt/rfc/sap/zfg_bpm_hr_leave/" + clientid + "/zhr_leave/zhr_leave?&sap-language=zh_CN";
			jQuery.ajax({
				url: serviceURL,
				type: "POST",
				data: request,
				timeout: 10000,
				username: "gw_user",
				password: "init1234",
				dataType: "text",
				SOAPAction: "urn:sap-com:document:sap:soap:functions:mc-style:ZFG_BPM_HR_LEAVE:ZfmBpmHrLeaveApprRequest", //在多个function module时需要指定
				contentType: "text/xml; charset=\"utf-8\"",
				success: function(data, textStatus, jqXHR) {
					if (data.match(/<Type[^\/]*\/[^>]*>/) == "<Type>S</Type>") {
						logpost(yj, usrid, submitData[2]);
						bpmpost(submitData[3], submitData[4]);
					} else {
						sap.m.MessageToast.show(data.match(/[^>]+(?=<\/Message>)/));
					}

				},
				error: function(xhr, status) {
					sap.m.MessageToast.show("ECC提交失败，请稍后尝试！");

				},
				complete: function(xhr, status) {

				}
			});

			function logpost(yj, userid, longprocessid) {

				var logpostrequest =
					'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions"><soapenv:Header/><soapenv:Body><urn:ZFM_BPM_SAVETASK><IT_INPUT><item><TASKID></TASKID><PRO_INSTANCEID>' +
					longprocessid +
					'</PRO_INSTANCEID><TASK_INSTANCEID></TASK_INSTANCEID><APPROVALSTEP></APPROVALSTEP><TASKSUBJECT></TASKSUBJECT><AGENTID>USER.CORP_LDAP.' +
					userid + '</AGENTID><AGENTNAME>' + userid + '</AGENTNAME><APPROVESTATE>0</APPROVESTATE><APPROVEMEMO>' + yj +
					'</APPROVEMEMO><STARTTIME></STARTTIME><EXECUTIONTIME>' + new Date().Format("yyyy-MM-dd hh:mm:ss") +
					'</EXECUTIONTIME><DELETETAG></DELETETAG></item></IT_INPUT></urn:ZFM_BPM_SAVETASK></soapenv:Body></soapenv:Envelope>';

				var serviceURL =
					"http://" + ecc_url + "/sap/bc/srt/rfc/sap/zfg_bpm_log/" + clientid + "/zfg_bpm_log/zfg_bpm_log";
				jQuery.ajax({
					url: serviceURL,
					type: "POST",
					data: logpostrequest,
					timeout: 10000,
					username: "gw_user",
					password: "init1234",
					dataType: "text",
					SOAPAction: "urn:sap-com:document:sap:rfc:functions:ZFG_BPM_LOG:ZFM_BPM_SAVETASKRequest", //在多个function module时需要指定
					contentType: "text/xml; charset=\"utf-8\"",
					success: function(data, textStatus, jqXHR) {},
					error: function(xhr, status) {
						sap.m.MessageToast.show("日志提交失败，请提醒管理员！");

					},
					complete: function(xhr, status) {

					}
				});
			}

			function bpmpost(aModel, jModel) {
				var taskInfo = jModel.getProperty("/ContextTypeINPUT/Context/ProcessInfo");
				taskInfo.state = "E0004";
				var outputData;
				if (seli != 0) {
					var taskSPRList = jModel.getProperty("/ContextTypeINPUT/Context/SPRList");
					taskSPRList.results[seli].group = selectname;
					outputData = {
						completeTypeOUTPUT: {
							complete: {
								ProcessInfo: taskInfo,
								SPRList: taskSPRList
							}
						}
					};
				} else {
					outputData = {
						completeTypeOUTPUT: {
							complete: {
								ProcessInfo: taskInfo
							}
						}
					};
				}
				var bundle = sap.ui.getCore().getModel("i18n").getResourceBundle();
				console.log(outputData);
				//sap.m.MessageToast.show(selectname);

				aModel.create("/" + instanceID + "/OutputData", outputData, null, function(data, response) {
					if (response.statusCode == "201") {
						sap.m.MessageToast.show("提交成功!");
						leaveApproval.app.backToPage("idleaveApprovalMaster");
						var masterlist = sap.ui.getCore().byId("idleaveApprovalMaster--restaa");
						masterlist.removeItem(masterlistitem);
					} else {
						sap.m.MessageToast.show("创建失败，请稍后尝试！");
					}
				}, function(oEvent, response) {
					console.log(oEvent.response);
					sap.m.MessageToast.show("BPM提交失败，请稍后尝试！");
				});
			}
		}
	},
	refuse: function() {
		var yj = "";
		switch (submitData[0]) {
			case "01":
				yj = this.getView().byId("bztext").getValue();
				break;
			case "02":
				yj = this.getView().byId("dptext").getValue();
				break;
			case "03":
				yj = this.getView().byId("hrtext").getValue();
				break;
			case "04":
				yj = this.getView().byId("sleadertext").getValue();
				break;
			case "05":
				yj = this.getView().byId("leadertext").getValue();
				break;
			case "06":
				yj = this.getView().byId("ghtext").getValue();
				break;
			default:
				break;
		}

		var request =
			'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style"><soapenv:Header/><soapenv:Body><urn:ZfmBpmHrLeaveAppr><EtMessage></EtMessage><IvApprCode>R</IvApprCode><IvApprover>' +
			usrid + '</IvApprover><IvFinalstep>' +
			submitData[1] + '</IvFinalstep><IvProcessId>' + processid + '</IvProcessId><IvSpjd>' + submitData[0] + '</IvSpjd><IvYj>' + yj +
			'</IvYj></urn:ZfmBpmHrLeaveAppr></soapenv:Body></soapenv:Envelope>';
		var selectname = this.getView().byId("select").getValue();
		var serviceURL =
			"http://" + ecc_url + "/sap/bc/srt/rfc/sap/zfg_bpm_hr_leave/" + clientid + "/zhr_leave/zhr_leave?&sap-language=zh_CN";
		jQuery.ajax({
			url: serviceURL,
			type: "POST",
			data: request,
			timeout: 10000,
			username: "gw_user",
			password: "init1234",
			dataType: "text",
			SOAPAction: "urn:sap-com:document:sap:soap:functions:mc-style:ZFG_BPM_HR_LEAVE:ZfmBpmHrLeaveApprRequest", //在多个function module时需要指定
			contentType: "text/xml; charset=\"utf-8\"",
			success: function(data, textStatus, jqXHR) {
				if (data.match(/<Type[^\/]*\/[^>]*>/) == "<Type>S</Type>") {
					logpost(yj, usrid, submitData[2]);
					bpmpost(submitData[3], submitData[4]);
				} else {
					sap.m.MessageToast.show(data.match(/[^>]+(?=<\/Message>)/));
				}
			},
			error: function(xhr, status) {
				sap.m.MessageToast.show("ECC提交失败，请稍后尝试！");

			},
			complete: function(xhr, status) {

			}
		});

		function logpost(yj, userid, longprocessid) {

			var logpostrequest =
				'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions"><soapenv:Header/><soapenv:Body><urn:ZFM_BPM_SAVETASK><IT_INPUT><item><TASKID></TASKID><PRO_INSTANCEID>' +
				longprocessid +
				'</PRO_INSTANCEID><TASK_INSTANCEID></TASK_INSTANCEID><APPROVALSTEP></APPROVALSTEP><TASKSUBJECT></TASKSUBJECT><AGENTID>USER.CORP_LDAP.' +
				userid + '</AGENTID><AGENTNAME>' + userid + '</AGENTNAME><APPROVESTATE>1</APPROVESTATE><APPROVEMEMO>' + yj +
				'</APPROVEMEMO><STARTTIME></STARTTIME><EXECUTIONTIME>' + new Date().Format("yyyy-MM-dd hh:mm:ss") +
				'</EXECUTIONTIME><DELETETAG></DELETETAG></item></IT_INPUT></urn:ZFM_BPM_SAVETASK></soapenv:Body></soapenv:Envelope>';

			var serviceURL =
				"http://" + ecc_url + "/sap/bc/srt/rfc/sap/zfg_bpm_log/" + clientid + "/zfg_bpm_log/zfg_bpm_log";
			jQuery.ajax({
				url: serviceURL,
				type: "POST",
				data: logpostrequest,
				timeout: 10000,
				username: "gw_user",
				password: "init1234",
				dataType: "text",
				SOAPAction: "urn:sap-com:document:sap:rfc:functions:ZFG_BPM_LOG:ZFM_BPM_SAVETASKRequest", //在多个function module时需要指定
				contentType: "text/xml; charset=\"utf-8\"",
				success: function(data, textStatus, jqXHR) {},
				error: function(xhr, status) {
					sap.m.MessageToast.show("日志提交失败，请提醒管理员！");

				},
				complete: function(xhr, status) {

				}
			});
		}

		function bpmpost(aModel, jModel) {
			var taskInfo = jModel.getProperty("/ContextTypeINPUT/Context/ProcessInfo");
			taskInfo.state = "E0002";
			var outputData = {
				completeTypeOUTPUT: {
					complete: {
						ProcessInfo: taskInfo
					}
				}
			};
			var bundle = sap.ui.getCore().getModel("i18n").getResourceBundle();
			console.log(outputData);
			// send request to BPM Task Data OData service to complete Task
			aModel.create("/" + instanceID + "/OutputData", outputData, null, function(data, response) {
				if (response.statusCode == "201") {
					sap.m.MessageToast.show("提交成功!");
					leaveApproval.app.backToPage("idleaveApprovalMaster");
					var masterlist = sap.ui.getCore().byId('idleaveApprovalMaster--restaa');
					masterlist.removeItem(masterlistitem);
				} else {
					sap.m.MessageToast.show("创建失败，请稍后尝试！");
				}
			}, function(oEvent) {
				console.log(oEvent.response);
				sap.m.MessageToast.show("BPM提交失败，请稍后尝试！");
			});
		}
	},
	resub: function() {
		var restType = this.getView().byId('typesp').getSelectedKey();
		var date = this.getView().byId('datesp').getDateValue();
		var startDate = this.getView().byId('startDatesp').getDateValue();
		var startTime = this.getView().byId('startTimesp').getDateValue();
		var endDate = this.getView().byId('endDatesp').getDateValue();
		var endTime = this.getView().byId('endTimesp').getDateValue();
		var restDays = this.getView().byId('restdayssp').getValue();
		var reason = this.getView().byId('reasonsp').getValue();
		var remarks = this.getView().byId('remarkssp').getValue();

		if (restType == "" || restType == null) {
			sap.m.MessageToast.show("请假类型未填写！");
		} else if (date == "" || date == null) {
			sap.m.MessageToast.show("申请日期未填写！");
		} else if (startDate == "" || startDate == null) {
			sap.m.MessageToast.show("开始日期未填写！");
		} else if (startTime == "" || startTime == null) {
			sap.m.MessageToast.show("开始时间未填写！");
		} else if (endDate == "" || endDate == null) {
			sap.m.MessageToast.show("结束日期未填写！");
		} else if (endTime == "" || endTime == null) {
			sap.m.MessageToast.show("结束时间未填写！");
		} else if (!/[0-9.]+/.test(restDays) || restDays == null || restDays > endDate.Format("yyyyMMdd") - startDate.Format("yyyyMMdd") + 1 ||
			restDays <= 0 || restDays * 2 % 1 != 0) {
			sap.m.MessageToast.show("请假天数未填写或不符合格式！");
		} else {
			var re = /<Mandt[^\n]*ZzbzTxt[\/]{0,1}>/; //匹配<Mandt开始ZzbzTxt{/}>结束的字符串
			var request =
				'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style"><soapenv:Header/><soapenv:Body><urn:ZfmBpmHrLeaveSubmit><!--Optional:--><EtMessage><!--Zero or more repetitions:--><item><Type></Type><Message></Message></item></EtMessage><!--Optional:--><EtSpSequence><!--Zero or more repetitions:--><item><Zno></Zno><Step></Step><Spr></Spr></item></EtSpSequence><IsLeave>' +
				secondrequestdata.match(re) + '</IsLeave></urn:ZfmBpmHrLeaveSubmit></soapenv:Body></soapenv:Envelope>';
			if (restType != "" && restType != null) {
				var rerestType = /<Subty[^\/]*\/[^>]*>/;
				request = request.replace(rerestType, '<Subty>' + restType + '</Subty>');
			}
			var redate = /<Erdat[^\/]*\/[^>]*>/;
			request = request.replace(redate, '<Erdat>' + date.Format("yyyy-MM-dd") + '</Erdat>');

			var restartDate = /<Begda[^\/]*\/[^>]*>/;
			request = request.replace(restartDate, '<Begda>' + startDate.Format("yyyy-MM-dd") + '</Begda>');
			var restartTime = /<Begtim[^\/]*\/[^>]*>/;
			request = request.replace(restartTime, '<Begtim>' + startTime.Format("hh:mm:ss") + '</Begtim>');

			var reendDate = /<Endda[^\/]*\/[^>]*>/;
			request = request.replace(reendDate, '<Endda>' + endDate.Format("yyyy-MM-dd") + '</Endda>');
			var reendTime = /<Endtim[^\/]*\/[^>]*>/;
			request = request.replace(reendTime, '<Endtim>' + endTime.Format("hh:mm:ss") + '</Endtim>');

			var rerestday = /<Qjts[^\/]*\/[^>]*>/;
			request = request.replace(rerestday, '<Qjts>' + restDays + '</Qjts>');

			var rereason = /<Zwhy[^\/]*\/[^>]*>/;
			request = request.replace(rereason, '<Zwhy>' + reason + '</Zwhy>');

			var reremarks = /<Zbz[^\/]*\/[^>]*>/;
			request = request.replace(reremarks, '<Zbz>' + remarks + '</Zbz>');
			var serviceURL =
				"http://" + ecc_url + "/sap/bc/srt/rfc/sap/zfg_bpm_hr_leave/" + clientid + "/zhr_leave/zhr_leave?&sap-language=zh_CN";
			jQuery.ajax({
				url: serviceURL,
				type: "POST",
				data: request,
				timeout: 10000,
				username: "gw_user",
				password: "init1234",
				dataType: "text",
				SOAPAction: "urn:sap-com:document:sap:soap:functions:mc-style:ZFG_BPM_HR_LEAVE:ZfmBpmHrLeaveSubmitRequest", //在多个function module时需要指定
				contentType: "text/xml; charset=\"utf-8\"",
				success: function(data, textStatus, jqXHR) {
					if (data.match(/<EvStatus[^\/]*\/[^>]*>/) == "<EvStatus>S</EvStatus>") {
						submit();
					} else {
						sap.m.MessageToast.show(data.match(/[^>]+(?=<\/Message>)/));
					}

				},
				error: function(xhr, status) {
					sap.m.MessageToast.show("申请失败，请稍后尝试！");

				},
				complete: function(xhr, status) {

				}
			});
		}

		function submit() {
			var yj = "";

			var request =
				'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style"><soapenv:Header/><soapenv:Body><urn:ZfmBpmHrLeaveAppr><EtMessage></EtMessage><IvApprCode>A</IvApprCode><IvApprover>' +
				usrid + '</IvApprover><IvFinalstep>' +
				submitData[1] + '</IvFinalstep><IvProcessId>' + processid + '</IvProcessId><IvSpjd>' + submitData[0] + '</IvSpjd><IvYj>' + yj +
				'</IvYj></urn:ZfmBpmHrLeaveAppr></soapenv:Body></soapenv:Envelope>';
			var serviceURL =
				"http://" + ecc_url + "/sap/bc/srt/rfc/sap/zfg_bpm_hr_leave/" + clientid + "/zhr_leave/zhr_leave?&sap-language=zh_CN";
			jQuery.ajax({
				url: serviceURL,
				type: "POST",
				data: request,
				timeout: 10000,
				username: "gw_user",
				password: "init1234",
				dataType: "text",
				SOAPAction: "urn:sap-com:document:sap:soap:functions:mc-style:ZFG_BPM_HR_LEAVE:ZfmBpmHrLeaveApprRequest", //在多个function module时需要指定
				contentType: "text/xml; charset=\"utf-8\"",
				success: function(data, textStatus, jqXHR) {
					if (data.match(/<Type[^\/]*\/[^>]*>/) == "<Type>S</Type>") {
						logpost(yj, usrid, submitData[2]);
						bpmpost(submitData[3], submitData[4]);
					} else {
						sap.m.MessageToast.show(data.match(/[^>]+(?=<\/Message>)/));
					}
				},
				error: function(xhr, status) {
					sap.m.MessageToast.show("ECC提交失败，请稍后尝试！");

				},
				complete: function(xhr, status) {

				}
			});

			function logpost(yj, userid, longprocessid) {
				var logpostrequest =
					'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions"><soapenv:Header/><soapenv:Body><urn:ZFM_BPM_SAVETASK><IT_INPUT><item><TASKID></TASKID><PRO_INSTANCEID>' +
					longprocessid +
					'</PRO_INSTANCEID><TASK_INSTANCEID></TASK_INSTANCEID><APPROVALSTEP></APPROVALSTEP><TASKSUBJECT></TASKSUBJECT><AGENTID>USER.CORP_LDAP.' +
					userid + '</AGENTID><AGENTNAME>' + userid + '</AGENTNAME><APPROVESTATE>2</APPROVESTATE><APPROVEMEMO>' + yj +
					'</APPROVEMEMO><STARTTIME></STARTTIME><EXECUTIONTIME>' + new Date().Format("yyyy-MM-dd hh:mm:ss") +
					'</EXECUTIONTIME><DELETETAG></DELETETAG></item></IT_INPUT></urn:ZFM_BPM_SAVETASK></soapenv:Body></soapenv:Envelope>';

				var serviceURL =
					"http://" + ecc_url + "/sap/bc/srt/rfc/sap/zfg_bpm_log/" + clientid + "/zfg_bpm_log/zfg_bpm_log";
				jQuery.ajax({
					url: serviceURL,
					type: "POST",
					data: logpostrequest,
					timeout: 10000,
					username: "gw_user",
					password: "init1234",
					dataType: "text",
					SOAPAction: "urn:sap-com:document:sap:rfc:functions:ZFG_BPM_LOG:ZFM_BPM_SAVETASKRequest", //在多个function module时需要指定
					contentType: "text/xml; charset=\"utf-8\"",
					success: function(data, textStatus, jqXHR) {},
					error: function(xhr, status) {
						sap.m.MessageToast.show("日志提交失败，请提醒管理员！");

					},
					complete: function(xhr, status) {

					}
				});
			}

			function bpmpost(aModel, jModel) {
				var taskInfo = jModel.getProperty("/ContextTypeINPUT/Context/ProcessInfo");
				taskInfo.state = 'E0003';
				var outputData = {
					completeTypeOUTPUT: {
						complete: {
							ProcessInfo: taskInfo
						}
					}
				};
				var bundle = sap.ui.getCore().getModel("i18n").getResourceBundle();
				console.log(outputData);
				// send request to BPM Task Data OData service to complete Task
				aModel.create("/" + instanceID + "/OutputData", outputData, null, function(data, response) {
					if (response.statusCode == "201") {
						sap.m.MessageToast.show('提交成功!');
						leaveApproval.app.backToPage("idleaveApprovalMaster");
						var masterlist = sap.ui.getCore().byId('idleaveApprovalMaster--restaa');
						masterlist.removeItem(masterlistitem);
					} else {
						sap.m.MessageToast.show("创建失败，请稍后尝试！");
					}
				}, function(oEvent) {
					console.log(oEvent.response);
					sap.m.MessageToast.show("BPM提交失败，请稍后尝试！");
				});
			}
		}
	},
	timeFormat: function(val) {
		if (val != "" && val != null) {
			return val.substring(0, 5);
		} else {
			return "";
		}
	}

});