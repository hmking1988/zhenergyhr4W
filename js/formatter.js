jQuery.sap.declare("com.zhenergy.hr.js.formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");
com.zhenergy.hr.js.formatter = {
    
    PhotoURI : function(Uri){
        if(Uri){
            if(Uri.indexOf("z_mobile_resources/portrait.png")>0){
                return "img/portrait.png"
            }
            var host=window.location.host;
            var path=Uri.split("000/")[1];
            return "http://"+host+"/"+path;
        }
        return "";
    }
};