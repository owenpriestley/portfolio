//TEST HIDING NAV: https://codepen.io/owiewio/pen/jZpvbe //

// Site controls //
$(document).ready(function() {
    $("#nav-main").addClass("toggled");
    $("#hide").html("&#8722;");
    $("#hide").click(function(e) {
        e.preventDefault();
        if($("#nav-main").hasClass("toggled")) {
            $("#nav-main").animate({"height": "47px"}).removeClass("toggled");
            $("#hide").html("+");
         } else {
           $("#nav-main").animate({"height": "375px"}).addClass("toggled");
           $("#hide").html("&#8722;");
         }
      });
   

    $("#response").hide();
    $('.title').click(function( event ) {
        getContent('5a6341dbc443548d81bcf727');
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

    $(".nav button.nav.wd").on('click', function(){
        var listElement = $(this).parent();
        var ID = $(this).data('contentid')
        getContent(ID);
        if ($(".nav li").hasClass('selected')){
            $(".nav li").removeClass('selected');
            listElement.addClass('selected');
        } else {
            listElement.addClass('selected');
        }
        $("#responseIntro").hide();
        $("#responseBody").append("<p class='note'><strong class='notehead'>NOTE</strong></br>If it takes a while to load, the deployment is probably frozen. You'll just need to give it a moment to defrost.</p>");
    })
    
});

function getContent(ID) {
    // CLEAR CONTENT //
    $("#response").hide();
    $("#responseTitle").css("padding-top", "7%");
    $("#responseTitle, #responseBody, #responseIntroBody").text("");

    // TURN ID INTO API URL //
    var mainURL = window.location.href
    var get_fullURL = mainURL + 'content/' + ID;

    // SEND GET REQUEST TO API //
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", get_fullURL, false);
    xhttp.setRequestHeader("Content-type", "x-www-form-urlencoded");
    xhttp.send();

    // GET CONTENT AND SPLIT IT //
    var response = JSON.parse(xhttp.responseText);

    // PRINT INTRO TO DIV //
    var introMarkup = markdown.toHTML(response.intro);
    var splitIntro = introMarkup.split(/\n/);
    var div = document.getElementById('responseIntroBody');
    for (para of splitIntro) {
        div.innerHTML += `<p>${para}</p>`;
    }

    // PRINT CONTENT TO DIV //
    $("#responseIntro").css("border-style", "solid");
    $("#responseTitle").text(response.title);
    var bodyMarkup = markdown.toHTML(response.body);
    var splitBody = bodyMarkup.split(/\n/);
    var div = document.getElementById('responseBody');
    for (para of splitBody) {
        div.innerHTML += `<p>${para}</p>`;
    }
    $("#responseIntro").css("display", "block");
    $("#response").fadeTo(700, 1);
}
