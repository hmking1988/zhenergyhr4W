sap.ui.controller("com.zhenergy.hr.view.myNewTeam.myNewTeamDetail", {

	onInit: function() {
	   // this.getView().byId("roster_person_headlike").bindElement("/EE_PERSONPHOTO_SET('')");
		this.getView().addEventDelegate({
			onBeforeShow: jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this),
			onAfterShow: jQuery.proxy(function(evt) {
				this.onAfterShow(evt);
			}, this)
		});
	},
	onBeforeShow: function(evt) {
	    this.getView().byId("myteam_image").setSrc(photo_team);
		if (evt) {
// 			var usrid = "AC-HUANGJW";
// 			if (window.cordova && appContext && !window.sap_webide_companion) {
// 				usrid = appContext.registrationContext.user.toUpperCase();
// 			}
            
			//this.getView().byId("roster_person_headlike").bindElement("/EE_PERSONPHOTO_SET('" + ListUserid_team + "')");
			this.getView().byId("rosterrenyuanxinxi").bindElement("/ER_RESUME_HEADER_SET('" + PernrId_team + "')");

		}
	},
	onAfterShow: function(evt) {
	        
		if (evt) {
            
			var sEntityPath = "/ER_WORK_REWORD_ITEM_SET/?$filter=(Pernr eq '" + PernrId_team + "')&sap-language=zh_CN";
			var sEntityPath2 = "/ER_FAMILY_ITEM_SET/?$filter=(Pernr eq '" + PernrId_team + "')&sap-language=zh_CN";
			var oDummyList = this.getView().byId("jianli");
			var oDummyList2 = this.getView().byId("jiating");
			oDummyList2.setNoDataText(" ");

			var sort = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(sort, "sort");

			function formatterdate(sDate) {
				if (sDate != "" && sDate != null) {
					switch (sDate.length) {
						case 8:
							return sDate.substring(0, 4) + '.' + sDate.substring(4, 6) + '.' + sDate.substring(6, 8);
							break;
						case 6:
							return sDate.substring(0, 4) + '.' + sDate.substring(4, 6);
							break;
						default:
							return sDate;
							break;
					}
				} else {
					return "";
				}
			}
			var oListTemplate = new sap.m.StandardListItem({
				title: {
					parts: [{
						path: 'Begda'
					}, {
						path: 'Endda'
					}],
					formatter: function(Begda, Endda) {
						if (Endda.substring(0, 4) == "9999") {
							return formatterdate(Begda) + "至今";
						} else {
							return formatterdate(Begda) + "~" + formatterdate(Endda);
						}
					}
				},
				description: "{Content}",

				info: {
					path: "Group", //the property based on which it needs to be sorted
					//List Grouping
					formatter: function(fValue) {
						if (fValue) {

							if (sap.ui.getCore().getModel("sort").getData().sortBy !== fValue) {

								sap.ui.getCore().getModel("sort").getData().sortBy = fValue;
								var ftitle;
								switch (fValue) {
									case "01":
										ftitle = "主要学习及工作经历";
										break;
									case "02":
										ftitle = "奖惩";
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
			var oListTemplate2 = new sap.m.CustomListItem({
				content: [
                    new sap.m.HBox({
						width: '100%',
						items: [
                            new sap.m.VBox({
								direction: 'Column',
								width: '40%',
								items: [
                                    new sap.m.Text({
										text: {
											path: 'Relation'
										},
										textAlign: 'Right',
										width: '100%'
									}).addStyleClass('text')
								]
							}),
							new sap.m.VBox({
								width: '60%',
								items: [
						            new sap.m.Text({
										text: {
											path: 'Name'
										},
										textAlign: 'Left'
									}).addStyleClass('vbox_text02')
                                ]
							})
                        ]
					}),
					new sap.m.HBox({
						width: '100%',
						items: [
                            new sap.m.VBox({
								direction: 'Column',
								width: '40%',
								items: [
                                    new sap.m.Text({
										text: '出生日期',
										textAlign: 'Right',
										width: '100%'
									}).addStyleClass('text')
								]
							}),
							new sap.m.VBox({
								width: '60%',
								items: [
						            new sap.m.Text({
										text: {
											path: 'Birthday',
											formatter: function(value) {
												return formatterdate(value);
											}
										},
										textAlign: 'Left'
									}).addStyleClass('vbox_text02')
                                ]
							})
                        ]
					}),
					new sap.m.HBox({
						width: '100%',
						items: [
                            new sap.m.VBox({
								direction: 'Column',
								width: '40%',
								items: [
                                    new sap.m.Text({
										text: '政治面貌',
										textAlign: 'Right',
										width: '100%'
									}).addStyleClass('text')
								]
							}),
							new sap.m.VBox({
								width: '60%',
								items: [
						            new sap.m.Text({
										text: {
											path: 'Party'
										},
										textAlign: 'Left'
									}).addStyleClass('vbox_text02')
                                ]
							})
                        ]
					}),
					new sap.m.HBox({
						width: '100%',
						items: [
                            new sap.m.VBox({
								direction: 'Column',
								width: '40%',
								items: [
                                    new sap.m.Text({
										text: '工作单位及职务',
										textAlign: 'Right',
										width: '100%'
									}).addStyleClass('text')
								]
							}),
							new sap.m.VBox({
								width: '60%',
								items: [
						            new sap.m.Text({
										text: {
											path: 'Company'
										},
										textAlign: 'Left'
									}).addStyleClass('vbox_text02')
                                ]
							})
                        ]
					})
                ]
			});
			oDummyList.bindItems(sEntityPath, oListTemplate, null, null);
			var oBindingInfo = {
				path: sEntityPath2,
				template: oListTemplate2,
				factory: null,
				sorter: new sap.ui.model.Sorter('Zzby3', false, true),
				parameters: null,
				groupHeaderFactory: function(value) {
					return new sap.m.GroupHeaderListItem({
						title: '家庭成员情况',
						upperCase: false
					});
				}
			};
			oDummyList2.bindItems(oBindingInfo);

		}
	},
	back: function() {
	    myNewTeam.app.backToPage("idmyNewTeamMaster");
	},
	dateFormatter: function(sDate) {
		if (sDate != "" && sDate != null) {
			return sDate.substring(0, 4) + '.' + sDate.substring(4, 6) + '.' + sDate.substring(6, 8);
		} else {
			return "";
		}
	},
	handlePressHome: function() {
		app.backToTop();
	}
});