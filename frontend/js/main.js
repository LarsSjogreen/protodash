var sp = new StatusPage.page({ page : '9myn2pbrw2yg' });
var stat = document.getElementById('status');
sp.status({
  success : function(data) {
  	stat.innerHTML = data.status.description;
  }
});

function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}0

window.onload = function(){
	var closeButts = document.getElementsByClassName('close');
	for (var i = 0; i < closeButts.length; i++) {
		closeButts[i].onclick = function(){
      	  this.parentNode.className += " hidden";
        	return false;
	    };
	}
};

function loadteam() {
  var teamsters = document.getElementById("akvoteam");
  teamsters.innerHTML = "Loading...";
  callAjax("/checkReal", function(data) {
    teamsters.innerHTML = data;
  })
}

loadteam();