$(function(){
    buttons(babyArray, "searchButton", "#buttons");
})

var babyArray = ["Laughing", "Dancing", "Eating"];

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