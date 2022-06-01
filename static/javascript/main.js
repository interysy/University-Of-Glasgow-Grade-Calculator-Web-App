
$(document).ready( function() {  
       
     
    // Adding a new element to page
    $("#add-btn").click(function() {  

        $.get('/addModule', function(data) {
            $("#components").append(data);
         });
    })  
      
     
    $(document).on('click', '.cross-icon', function() {
        $(this).prev(".one-module").remove();  
        $(this).remove();
        console.log("TEST");
    });
      
    // calculating result
    $("#result-btn").click(function() {  
        var type = $("#type").text();   
        var credits = [];
        $('.credits').each(function() { 
             credits.push(this.value);
        });  
        console.log(credits);  
          
        var grades = [];
        $(".grades").each(function() { 
            grades.push(this.value);
        }) 
         
        console.log(grades);
  
        credits = JSON.stringify(credits);
        grades = JSON.stringify(grades); 

        $.get('/calculateResult' , {'type': type , 'credits' : credits , 'grades' : grades} ,  function(result) { 
            $("#result-p").replaceWith(result);
        })
    })  
     
     

     
     


})
