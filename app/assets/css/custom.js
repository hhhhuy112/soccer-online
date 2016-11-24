var checkSide=true;
var width=250;
var w = $(window).width();
setNavbarMenu(w);
$("#buttonSide").click(function(){
   $("#navbar-menu").slideToggle(); 
});
$(window).resize(function(){
        w = $(window).width();
        setNavbarMenu(w);
    });	
        

function setNavbarMenu(mw){
	if(mw <768 ) {
    $("#navbar-menu").hide();     
  }else{
    $("#navbar-menu").show();    
  }
}


