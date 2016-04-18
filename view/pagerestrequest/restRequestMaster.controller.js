sap.ui.controller("com.zhenergy.hr.view.pagerestrequest.restRequestMaster", {

	onInit: function() {
		this.getView().byId('date').setDateValue(new Date());
		var response = "";
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
			'<soapenv:Header/><soapenv:Body><urn:ZfmBpmHrLeaveGetperinfo>' + '<EtLeaType></EtLeaType><IvUname>' + usrid + '</IvUname>' +
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
				response = data;
				oModel.setXML(data);
				sap.ui.getCore().setModel(oModel, 'restData');
			},
			error: function(xhr, status) {
				sap.m.MessageToast.show("网络连接失败！");
			},
			complete: function(xhr, status) {}
		});
	},
	submit: function() {
		var restType = this.getView().byId('restType').getSelectedKey();
		var date = this.getView().byId('date').getDateValue();
		var startTime = this.getView().byId('startTime').getDateValue();
		var endTime = this.getView().byId('endTime').getDateValue();
		var restDays = this.getView().byId('restdays').getValue();
		var reason = this.getView().byId('reason').getValue();
		var remarks = this.getView().byId('remarks').getValue();

		if (restType == "" || restType == null) {
			sap.m.MessageToast.show("请假类型未填写！");
		} else if (date == "" || date == null) {
			sap.m.MessageToast.show("申请日期未填写！");
		} else if (startTime == "" || startTime == null) {
			sap.m.MessageToast.show("开始时间未填写！");
		} else if (endTime == "" || endTime == null) {
			sap.m.MessageToast.show("结束时间未填写！");
		} else if (!/[0-9.]+/.test(restDays) || restDays == null || restDays > endTime.Format("yyyyMMdd") - startTime.Format("yyyyMMdd") + 1 ||
			restDays <= 0 || restDays * 2 % 1 != 0) {
			sap.m.MessageToast.show("请假天数未填写或不符合格式！");
		} else {
			var re = /<Mandt[^\n]*ZzbzTxt[\/]{0,1}>/; //匹配<Mandt开始ZzbzTxt{/}>结束的字符串
			var request =
				'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style"><soapenv:Header/><soapenv:Body><urn:ZfmBpmHrLeaveSubmit><!--Optional:--><EtMessage><!--Zero or more repetitions:--><item><Type></Type><Message></Message></item></EtMessage><!--Optional:--><EtSpSequence><!--Zero or more repetitions:--><item><Zno></Zno><Step></Step><Spr></Spr></item></EtSpSequence><IsLeave>' +
				response.match(re) + '</IsLeave></urn:ZfmBpmHrLeaveSubmit></soapenv:Body></soapenv:Envelope>';

			var rerestType = /<Subty[^\/]*\/[^>]*>/;
			request = request.replace(rerestType, '<Subty>' + restType + '</Subty>');

			var redate = /<Erdat[^\/]*\/[^>]*>/;
			request = request.replace(redate, '<Erdat>' + date.Format("yyyy-MM-dd") + '</Erdat>');

			var restartDate = /<Begda[^\/]*\/[^>]*>/;
			request = request.replace(restartDate, '<Begda>' + startTime.Format("yyyy-MM-dd") + '</Begda>');
			var restartTime = /<Begtim[^\/]*\/[^>]*>/;
			request = request.replace(restartTime, '<Begtim>' + startTime.Format("hh:mm:ss") + '</Begtim>');

			var reendDate = /<Endda[^\/]*\/[^>]*>/;
			request = request.replace(reendDate, '<Endda>' + endTime.Format("yyyy-MM-dd") + '</Endda>');
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
						sap.m.MessageToast.show("提交成功！");
						app.back("idlaunchpad");
					} else {
						sap.m.MessageToast.show(data.match(/[^>]+(?=<\/Message>)/));
					}
				},
				error: function(xhr, status) {
					sap.m.MessageToast.show("申请失败，请稍后尝试！");
				},
				complete: function(xhr, status) {}
			});
		}
	},
	back: function() {
		app.back("idlaunchpad");
	}

});