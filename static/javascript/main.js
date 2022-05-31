
$(document).ready( function() {  
      
    // Adding a new element to page
    $("#add-btn").click(function() {  

        $.get('/addModule', function(data) {
            $("#components").append(data);
         });
    })  
      
    // removing element from page
    $(".cross-icon").click(function() {  
        var previousElement = $('this').prevAll(".one-module:first"); 
        console.log(previousElement)
        $(previousElement).append("<p>TEST</p>"); 
        console.log("TEST");
    }) 
      
    // calculating result
    $("#result-btn").click(function() { 
        $.get('/calculateResult' , function(result) { 
            console.log("Success")
        })
    })
     
     


})
