sap.ui.jsview("com.zhenergy.hr.view.personalinfo.PersonalInfoSplitApp", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf com.zhenergy.hr.view.time.LeaveRequestSplitApp
	 */
	getControllerName: function() {
		return "com.zhenergy.hr.view.personalinfo.PersonalInfoSplitApp";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf com.zhenergy.hr.view.time.LeaveRequestSplitApp
	 */
	createContent: function(oController) {
		this.app = new sap.m.SplitApp({

		});
		var personalInfoMasterPage = sap.ui.view({
			id: "idPersonalInfoMaster",
			viewName: "com.zhenergy.hr.view.personalinfo.PersonalInfoMaster",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(personalInfoMasterPage);
		var peopleInfoPage = sap.ui.view({
			id: "idPeopleInfo",
			viewName: "com.zhenergy.hr.view.personalinfo.PeopleInfo",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(peopleInfoPage);
		var familyInfoMasterPage = sap.ui.view({
			id: "idFamilyInfoMaster",
			viewName: "com.zhenergy.hr.view.personalinfo.FamilyInfoMaster",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(familyInfoMasterPage);
		var educationInfoPage = sap.ui.view({
			id: "idEducationInfo",
			viewName: "com.zhenergy.hr.view.personalinfo.EducationInfo",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(educationInfoPage);
		var contractInfoPage = sap.ui.view({
			id: "idContractInfo",
			viewName: "com.zhenergy.hr.view.personalinfo.ContractInfo",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(contractInfoPage);
		var workInfoPage = sap.ui.view({
			id: "idWorkInfo",
			viewName: "com.zhenergy.hr.view.personalinfo.WorkInfo",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(workInfoPage);
		var workdetailInfoPage = sap.ui.view({
			id: "idWorkDetailInfo",
			viewName: "com.zhenergy.hr.view.personalinfo.WorkDetailInfo",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(workdetailInfoPage);
		var peopledetailInfoPage = sap.ui.view({
			id: "idPeopleDetailInfo",
			viewName: "com.zhenergy.hr.view.personalinfo.PeopleDetailInfo",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(peopledetailInfoPage);
		var peopleaddrInfoPage = sap.ui.view({
			id: "idPeopleAddrInfo",
			viewName: "com.zhenergy.hr.view.personalinfo.PeopleAddrInfo",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(peopleaddrInfoPage);
		var peopledataInfoPage = sap.ui.view({
			id: "idPeopleDataInfo",
			viewName: "com.zhenergy.hr.view.personalinfo.PeopleData",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(peopledataInfoPage);
		var peopleidPage = sap.ui.view({
			id: "idPeopleID",
			viewName: "com.zhenergy.hr.view.personalinfo.PeopleID",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(peopleidPage);
		var peoplepartyPage = sap.ui.view({
			id: "idPeopleParty",
			viewName: "com.zhenergy.hr.view.personalinfo.PeopleParty",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(peoplepartyPage);
		var familydetailPage = sap.ui.view({
			id: "idFamilyDetail",
			viewName: "com.zhenergy.hr.view.personalinfo.FamilyDetail",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(familydetailPage);
		var educationdetailPage = sap.ui.view({
			id: "idEducationDetail",
			viewName: "com.zhenergy.hr.view.personalinfo.EducationDetail",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(educationdetailPage);
		var contractdetailPage = sap.ui.view({
			id: "idContractDetail",
			viewName: "com.zhenergy.hr.view.personalinfo.ContractDetail",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(contractdetailPage);
		var technologylPage = sap.ui.view({
			id: "idTechnology",
			viewName: "com.zhenergy.hr.view.personalinfo.Technology",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(technologylPage);
		var technologydetailPage = sap.ui.view({
			id: "idTechnologyDetail",
			viewName: "com.zhenergy.hr.view.personalinfo.TechnologyDetail",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(technologydetailPage);
		var occupationPage = sap.ui.view({
			id: "idOccupation",
			viewName: "com.zhenergy.hr.view.personalinfo.Occupation",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(occupationPage);
		var occupationdetailPage = sap.ui.view({
			id: "idOccupationDetail",
			viewName: "com.zhenergy.hr.view.personalinfo.OccupationDetail",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(occupationdetailPage);
		var skillsidentificationPage = sap.ui.view({
			id: "idSkillsIdentification",
			viewName: "com.zhenergy.hr.view.personalinfo.SkillsIdentification",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(skillsidentificationPage);
		var skillsidentificationdetailPage = sap.ui.view({
			id: "idSkillsIdentificationDetail",
			viewName: "com.zhenergy.hr.view.personalinfo.SkillsIdentificationDetail",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(skillsidentificationdetailPage);
		var expertPage = sap.ui.view({
			id: "idExpert",
			viewName: "com.zhenergy.hr.view.personalinfo.Expert",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addMasterPage(expertPage);
		var expertdetailPage = sap.ui.view({
			id: "idExpertDetail",
			viewName: "com.zhenergy.hr.view.personalinfo.ExpertDetail",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(expertdetailPage);
		var addCommunication = sap.ui.view({
			id: "idaddCommunication",
			viewName: "com.zhenergy.hr.view.personalinfo.addCommunication",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(addCommunication);
		var editCommunication = sap.ui.view({
			id: "ideditCommunication",
			viewName: "com.zhenergy.hr.view.personalinfo.editCommunication",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(editCommunication);
		var addEducation = sap.ui.view({
			id: "idaddEducation",
			viewName: "com.zhenergy.hr.view.personalinfo.addEducation",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(addEducation);
		var addAddress = sap.ui.view({
			id: "idaddAddress",
			viewName: "com.zhenergy.hr.view.personalinfo.addAddress",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(addAddress);
		var editAddress = sap.ui.view({
			id: "ideditAddress",
			viewName: "com.zhenergy.hr.view.personalinfo.editAddress",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(editAddress);
		var addFamily = sap.ui.view({
			id: "idaddFamily",
			viewName: "com.zhenergy.hr.view.personalinfo.addFamily",
			type: sap.ui.core.mvc.ViewType.XML
		});
		this.app.addDetailPage(addFamily);
		// 		var leaveRequestDetailPage = sap.ui.view({
		// 			id: "idleaveRequestDetail",
		// 			viewName: "com.zhenergy.hr.view.time.LeaveRequestDetail",
		// 			type: sap.ui.core.mvc.ViewType.XML
		// 		});
		// 		this.app.addDetailPage(leaveRequestDetailPage);
		// 		var welcomePage = sap.ui.view({
		// 			id: "idwelcomePage",
		// 			viewName: "com.zhenergy.hr.view.time.Welcome",
		// 			type: sap.ui.core.mvc.ViewType.XML
		// 		});
		// 		this.app.addDetailPage(welcomePage);

		// 		this.app.toDetail("idwelcomePage");
		this.app.toMaster("idPersonalInfoMaster");
		return this.app;
	}

});