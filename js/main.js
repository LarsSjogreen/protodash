var sp = new StatusPage.page({ page : '9myn2pbrw2yg' });
var stat = document.getElementById('status');
sp.status({
  success : function(data) {
  	stat.innerHTML = "Banajnas";
  	stat.innerHTML = data.status.description;
  }
});

window.onload = function(){
	var closeButts = document.getElementsByClassName('close');
	for (var i = 0; i < closeButts.length; i++) {
		closeButts[i].onclick = function(){
      	  this.parentNode.className += " hidden";
        	return false;
	    };
	}
};