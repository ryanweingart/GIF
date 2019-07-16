$(document).ready(function(){
    
})
var tvMovieStars = ["Joey Tribbiani", "Arnold Schwarzenegger", "Samuel L. Jackson"];

function buttons(){
    $("#buttons").empty();
    for(var i = 0; i < tvMovieStars.length; i++){
        var GIFButton = $("<button>");
        GIFButton.addClass(classToAdd);
        GIFButton.attr("data-type", tvMovieStars[i]);
        GIFButton.text(tvMovieStars[i]);
        $("#buttons").append(GIFButton);
    }
}

$(document).on("click", ".searchButton", function(){
    var type = $(this).data("type");
    console.log(type);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +type+ "&api_key=g0S03lopEPcoMbRvxLSj9u25sydX38yF&limit=10";
    $.ajax({url:queryURL, method: "GET"})
        .done(function(response){
            for(var i = 0; i < response.data.length; i++){
                var searchDiv = $("<div class='search-item'>");
                var rating = response.data[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $("<img>");
                image.attr("src", still);
                image.attr("data-still", still);
                image.attr("data-animated", animated);
                image.attr("data-state", "still");
                image.addClass("searchImage");
                searchDiv.append(p);
                searchDiv.append(image);
                $("#searches").append(searchDiv);
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

$("#addGIF").on("click", function(e){
    e.preventDefault();
    var newSearch = $("input").eq(0).val();
    tvMovieStars.push(newSearch);
    buttons(tvMovieStars, "searchButton", "#buttons");
    return false;
})