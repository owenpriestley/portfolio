// Site controls //
$(document).ready(function() {
    $("#response").hide();
    $('.title').click(function( event ) {
        getContent('5a6341dbc443548d81bcf727');
        $("#responseIntro").css("display", "none");
        $("#responseTitle").css("padding-top", "0px")
    });
    $(".nav.hide").click(function( event ) {
        $(this).parent().slideUp(400);
        $("#responseTitle").css("padding-top", "0")
    });

    $(".nav button.nav").on('click', function(){
        var listElement = $(this).parent();
        var ID = $(this).data('contentid')
        getContent(ID);
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
        $("#responseBody").append("<p class='note'>Note: If it takes a while to load, give it a moment. The deployment is probably frozen.</p>");
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

// HELP FORMATTING (Uses OP-API) //

function getHelp() {
    var get_fullURL = window.location.href + "content/59df998b1538bcd9a186aa36";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", get_fullURL, false);
    xhttp.setRequestHeader("Content-type", "x-www-form-urlencoded");
    xhttp.send()
    var response = JSON.parse(xhttp.responseText);
    var bodyMarkup = markdown.toHTML(response.body);
    var splitBody = bodyMarkup.split(/\n/);
    console.log(splitBody);
    var divBody = document.getElementById('responseBody');
    for (para of splitBody) {
        divBody.innerHTML += `<p>${para}</p>`;
    }
    var divTitle = document.getElementById('responseTitle');
    divTitle.innerHTML += response.title;
    //    $("h2.responseTitle").text(response.title);    
}

function parsePostcode() {
    var part1 = $('#postCodeA').val()
    var part2 = $('#postCodeB').val()
    var userData = part1.replace(/\s+/g, '') + '+' + part2.replace(/\s+/g, '')
    var checkerURL = 'http://www.powercut105.com/FindOperator?Postcode=' //n7+8ha#dno
    var checkPostcode = checkerURL + userData + '#dno'
    window.open(checkPostcode);

}