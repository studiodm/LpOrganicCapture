//custom script for measuring SEO via lead capture (LCS) onto new Enhanced Buyflow. Creates cookie of ORGANIC referring search engine with keywords. Bypasses SEM campaigns.
//author: dmorgan 3-30-2016

function getSemParams(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}  
function gup(name) {
  name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
  var regexS = "[\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( document.referrer );
  if( results == null )
    return "";
  else
    return results[1];
}

function getkeywords() {
  var x = document.referrer;
  var keywords = 0;
  if(x == null || x == 0){
	  keywords="Direct";
	  return keywords;
  }
  if(getSemParams("PID") || getSemParams("pid") || getSemParams("gclid")){
	  keywords="SEM (pid/gclid) String";
	  return keywords;
  }else{	  
	  if (x.search(/yahoo/) != -1) {
		keywords = 'yahoo+'+gup("p"); 
	  }
	  else if (x.search(/digg/) != -1) {
		keywords = 'digg+'+gup("s"); 
	  }
	  else {
		var referrer =  x.match(/:\/\/(.[^/]+)/)[1];
		if(referrer.indexOf("google")!=-1){
			keywords="google(organic)";
		}else{
			keywords = referrer+':'+gup("q"); 
		}
	  }

  }
  return keywords;  
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
function deleteCookie(cname){
	setCookie(cname, "", -1);
}

function checkKeywordsExist() {
    var go=getCookie("organic");
	var x = document.referrer;
	var z = window.location.href;
	if(x == null || x ==0 || x == "localhost"){
		deleteCookie("organic");
		setCookie("organic", "Direct", .0115);
		return false;
	}
	var internalpages = z.match(/:\/\/(.[^/]+)/)[1];
	var referringpages = x.match(/:\/\/(.[^/]+)/)[1];
	if(go==""){
		setCookie("organic", getkeywords(), .0115);
	}
		if(internalpages!=referringpages){
			setCookie("organic", getCookie("organic"), .0115);
		}
		if(referringpages.indexOf(getCookie("organic"))!=-1){
			setCookie("organic", getkeywords(), .0115);
		}
}
checkKeywordsExist();