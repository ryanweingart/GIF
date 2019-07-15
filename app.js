$(function(){
    buttons(babyArray, "searchButton", "#buttons");
    console.log("Page Loaded");
})

var babyArray = ["Dog", "Cat", "Bird"];

function buttons(babyArray, classToAdd, buttonArea){
    $(buttonArea).empty();
    for(var i = 0; i < babyArray.length; i++){
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", babyArray[i]);
        a.text(babyArray[i]);
        $(buttonArea).append(a);
    }
}

$(document).on("click", ".searchButton", function(){
    var type = $(this).data("type");
    console.log(type);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +type+ "&api_key=g0S03lopEPcoMbRvxLSj9u25sydX38yF&limit=10";
    $.ajax({url:queryURL, method: "GET"})
        .done(function(response){
            
        })
})