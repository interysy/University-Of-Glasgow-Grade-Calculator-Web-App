 
$(document).ready( function() {  
     
    $("#add-btn").click(function() { 
        $.get('/addModule', function(data) {
            $("#components").append(data);
         });
    })  
     
    $(".cross-icon").click(function() { 
        $(this).closest('.one-module').remove();
    })
     
     


})
