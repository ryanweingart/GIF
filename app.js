$(function(){
    buttons(tvMovieStars, "searchButton", "#buttons");
    console.log("Page Loaded");
})

var tvMovieStars = ["Joey Tribbiani", "Arnold Schwarzenegger", "Samuel L. Jackson"];

function buttons(tvMovieStars, classToAdd, buttonArea){
    $("#buttons").empty();
    for(var i = 0; i < tvMovieStars.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass(classToAdd);
        gifButton.attr("data-stars", tvMovieStars[i]);
        gifButton.text(tvMovieStars[i]);
        $("#buttons").append(gifButton);
    }
}

$(document).on("click", ".searchButton", function(){
    var stars = $(this).data("stars");
    console.log(stars);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +stars+ "&api_key=g0S03lopEPcoMbRvxLSj9u25sydX38yF&limit=10";
    $.ajax({
        url:queryURL, 
        method: "GET"
    })
        .done(function(response){
            for(var i = 0; i < response.data.length; i++){
                var searchDiv = $("<div class='search-item'>");
                var rating = response.data[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var image = $("<img>");
                image.attr("src", response.data[i].images.fixed_height_still.url);
                image.attr("data-still", response.data[i].images.fixed_height_still.url);
                image.attr("data-animated", response.data[i].images.fixed_height.url);
                image.attr("data-state", "still");
                image.addClass("searchImage");
                searchDiv.append(p);
                searchDiv.append(image);
                $("#searches").prepend(searchDiv);
            }
        })
})

$(document).on("click", ".searchImage", function(){
    var state = $(this).attr("data-state");
    if(state === "still"){
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
})

$("#addSearch").on("click", function(){
    var newSearch = $("input").eq(0).val();
    tvMovieStars.push(newSearch);
    buttons(tvMovieStars, "searchButton", "#buttons");
    return false;
})