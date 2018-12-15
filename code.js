$(document).ready(function(){


var initgif = ["cats", "dogs", "birds", "raccoons", "bears", "ostrich", "Will Ferrel", "Will Arnet"];

pageini();



function pageini(){
    console.log("init running");
    for (var i = 0; i < initgif.length; i++){
      
        var gbut = $("<button>");
       
        gbut.attr("name",initgif[i]);
        gbut.addClass("btn btn-warning gif-but");
        gbut.append("",initgif[i]);
        console.log(gbut);
        
        $("#result-but").append(gbut); 
        
    }
}





$("#submit-gif").on("click", function(){
    event.preventDefault();
    
    var uinput = $("#gif-input").val().trim();
    console.log(uinput);
    //api key: YUZRiP5mvJaEzPQs9unto27rrTyrct4a

    var ubut = $("<button>");
    
    ubut.addClass("btn btn-success gif-but");
    ubut.attr("name", uinput);
    ubut.append("",uinput);
    $("#result-but").append(ubut);
    $("#gif-input").val("");
    
});

/*$(".gif-but").on("click", function()*/
$(document.body).on("click", ".gif-but", function(){
    $("#gif-div").empty();
    var info = $(this).attr("name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + info + "&api_key=YUZRiP5mvJaEzPQs9unto27rrTyrct4a&limit=10";
    console.log("button clicked");
    
    $.ajax({
        url: queryURL,
        method:"GET"
    }).then(function(response){ 
        
        var result = response.data;
        for(var i = 0; i < result.length; i++){
            
            var image = result[i].images.fixed_height_still.url;
            var simage = result[i].images.fixed_height_still.url
            var animage = result[i].images.fixed_height.url;
            
            
            //cap.append("Rating: "+result[i].rating);
           

            var gifdiv = $("<div>");
            gifdiv.addClass("floatin");
            var pic  = $("<img>");
            pic.addClass("gif");
            pic.attr("src",image);
            pic.attr("animated",animage);
            pic.attr("still",simage);
            pic.attr("state","still");
            gifdiv.append(pic);

            //caption
            var cap = $("<p>");
            cap.addClass("ratingcap");
            cap.append("Rating: "+result[i].rating);
            gifdiv.append(cap);
            

            $("#gif-div").append(gifdiv);


        }
        console.log(result);
    })
});

$(document.body).on("click", ".gif", function(){
    console.log( $(this));
    console.log($(this).attr("state"));
    

    if($(this).attr("state")==="still"){
        $(this).attr("src", $(this).attr("animated"));
        $(this).attr("state","animated");
    }
    else if($(this).attr("state")==="animated"){
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("state","still");
    }
    
    
})


});
