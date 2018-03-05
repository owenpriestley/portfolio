// Site controls //
$(document).ready(function() {
    $("#nav-main").css("height", "47px");
    $("#hide").html("+");
    $("#hide").click(function(e) {
        e.preventDefault();
        if($("#nav-main").hasClass("toggled")) {
            $("#nav-main").animate({"height": "47px"}).removeClass("toggled");
            $("#hide").html("+");
         } else {
           $("#nav-main").animate({"height": "310px"}).addClass("toggled");
           $("#hide").html("&#8722;");
         }
      });
   

    $("#response").hide();
    $('.title').click(function( event ) {
        window.location.href = "/";
        $("#responseIntro").css("display", "none");
        $("#responseTitle").css("padding-top", "0px")
    });

    $(".nav button.nav").on('click', function(){
        var listElement = $(this).parent();
        var link = $(this).data('url')
        location.href = link;
        if ($(".nav li").hasClass('selected')){
            $(".nav li").removeClass('selected');
            listElement.addClass('selected');
        } else {
            listElement.addClass('selected');
        }
    })

});