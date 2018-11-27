var gifs = ["cat", "dog", "cow", "eagle"];

function renderButtons(){
    $("#button-view").empty();

    for (var i =0; i < gifs.length; i++) {
        var a = $("<button>");
        a.addClass("gif-button");
        a.addClass("btn btn-primary");
        a.attr("data-animal", gifs[i]);
        a.text(gifs[i]);
        $("#button-view").append(a);

    }
}

$("#add-animal").on("click", function(){
    var animal = $("#gif-input").val().trim();
    gifs.push(animal);
    renderButtons();
    return false;
})


  function renderGifs() {
    var animal = $(this).attr("data-animal");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=jE6KMRWjffnZt4iNmU4NXWTcgqfSW2WX&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {

        var results = response.data;
      
        for (var i = 0; i < results.length; i++) {

          var animalDiv = $("<div>");

          var p = $("<p>").text("Rating: " + results[i].rating);

          var animalImage = $("<img>");

          animalImage.attr("src", results[i].images.fixed_height_still.url);
          animalImage.attr("data-still", results[i].images.fixed_height_still.url);
          animalImage.attr("data-state", "still");
          animalImage.addClass("gif");
          animalImage.attr("data-animate", results[i].images.fixed_height.url);
          
          animalDiv.append(p);
          animalDiv.append(animalImage);

          $("#gif-view").prepend(animalDiv);
        }
    });
    
};
$(document).on("click", ".gif", function(){
    var state = $(this).attr("data-state");
      if(state == "still"){
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
      }else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
      };
});

$(document).on("click", ".gif-button", renderGifs);
renderButtons();
