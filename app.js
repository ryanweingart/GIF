var tvMovieStars = ["Joey Tribbiani", "Arnold Schwarzenegger", "Samuel L. Jackson", "Kelly Kapowski", "SpongeBob Squarepants", "Michael Kelso", "Ron Burgundy", "Leonardo DiCaprio", "Jack Nicholson", "Robin Williams", "Julia Roberts", "Jennifer Lawrence"];

function buttons(tvMovieStars, classToAdd){
    $("#buttonsArea").empty();
    for(var i = 0; i < tvMovieStars.length; i++){
        var gifButton = $("<button>");
        gifButton.attr("type", "button");
        gifButton.attr("class", "btn");
        gifButton.addClass(classToAdd);
        gifButton.attr("data-stars", tvMovieStars[i]);
        gifButton.text(tvMovieStars[i]);
        $("#buttonsArea").append(gifButton);
    }
}

$(document).on("click", ".searchButton", function(){
    var stars = $(this).data("stars");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +stars+ "&api_key=g0S03lopEPcoMbRvxLSj9u25sydX38yF&limit=10";
    $.ajax({
        url:queryURL, 
        method: "GET"
    })
        .then(function(response){
            for(var i = 0; i < response.data.length; i++){
                var gifDiv = $("<div>");
                var rating = response.data[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var image = $("<img>");
                gifDiv.attr("class", "gifDiv float-md-left justify-content-between");
                image.attr("class","gifImage img-fluid rounded");
                image.attr("src", response.data[i].images.fixed_height_still.url);
                image.attr("data-still", response.data[i].images.fixed_height_still.url);
                image.attr("data-animated", response.data[i].images.fixed_height.url);
                image.attr("data-state", "still");
                image.addClass("searchImage");
                gifDiv.append(p);
                gifDiv.prepend(image);
                $("#searches").prepend(gifDiv);
            }
        })
})

$(document).on("click", ".searchImage", function(){
    var state = $(this).attr("data-state");
    if(state == "still"){
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
})

$("#addGifButton").on("click", function(event){
    event.preventDefault();
    var newSearch = $("#search-input").val();
    tvMovieStars.push(newSearch);
    buttons(tvMovieStars, "searchButton");
    return false;
})

    buttons(tvMovieStars, "searchButton");



    