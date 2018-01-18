// Site controls: //

$(document).ready(function() {
    var responseClone = $("#response").clone();
    $("#response").hide();
    $('.title').click(function( event ) {
        getContent('5a5fd8d794ffb67495fa8d77');
        $("#responseIntro").css("display", "none");
        $("h1").css("padding-top", "0px")
    });
    $(".nav.hide").click(function( event ) {
        $(this).parent().slideUp(400);
        $("#responseTitle").css("padding-top", "0", "margin", "0")
    }); 
});

function addContent() {
    // CAPTURE THE TITLE + BODY //
    var $getTitle = $('#title');
    var postTitle = $getTitle.val();
    console.log(postTitle);
    var $getBody = $('#body');
    var postBody = $getBody.val();
    console.log(postBody);

    var mainURL = window.location.href

    // TURN ID INTO API URL //
    var post_fullURL = mainURL + "content/";


    // SEND POST REQUEST TO API //
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", post_fullURL, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("title=" + postTitle + "&body=" + postBody);
    var response = JSON.parse(xhttp.responseText);
    $("p.success").text("Success! Use this ID to GET your content: " + response._id);
    console.log(post_fullURL);
}

function getContent() {
    // CLEAR CONTENT //
    $("#response").hide();
    $("#responseTitle, #responseBody, #responseIntroBody").text("");
    // CAPTURE THE UNIQUE ID //
    var ID = arguments[0]

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
    //make hide button
    $(".nav.hide").click(function( event ) {
        $(this).parent().slideUp(400);
        $("#responseTitle").css("padding-top", "0", "margin", "0")
    }); 
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