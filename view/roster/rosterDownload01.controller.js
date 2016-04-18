sap.ui.controller("com.zhenergy.hr.view.roster.rosterDownload01", {

    onInit: function() {
	    this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function(evt) {
				this.onAfterShow(evt);
			}, this)
		});
	},
    onAfterShow: function(){
        var sRead = "/pdfset(customer='3')/$value";
    	sap.ui.getCore().getModel().read( sRead, null, null, true, function(oData, oResponse){
			var pdfURL = "/sap/opu/odata/sap/ZTESTPDF_SRV/pdfset(customer='3')/$value";
            var tmpl = '<iframe src="' + pdfURL + '" style="width:100%;height:100%"></iframe>';
            $('#content01').html(tmpl);
  			  
        });
    }
});