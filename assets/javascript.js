var gifs = ["cat", "dog", "cow", "eagle"];

function renderButtons(){
    $("#button-view").empty();

    for (var i =0; i < gifs.length; i++) {
        var a = $("<button>");
        a.addClass("gif-button");
        a.attr("data-gif", gifs[i]);
        a.text(gifs[i]);
        $("#button-view").append(a);

    }
}
$("#add-gif").on("click", function(event) {
    event.preventDefault();
  
    var gif = $("#gif-input").val().trim();

    gifs.push(gif);

    renderButtons();
  });
renderButtons();