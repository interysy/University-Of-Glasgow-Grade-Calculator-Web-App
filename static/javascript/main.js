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
    $("#result-btn").click( function() {  
        var type = $("#type").text();   
        var credits = [];
        $('.credits').each(function() {  
             if (this.value != '') {
                credits.push(this.value); 
             }
        });  
          
        var grades = [];
        $(".grades").each(function() {  
            grades.push(this.value);
        }) 
         
         
        if (credits.length != 0) {
            credits = JSON.stringify(credits);
            grades = JSON.stringify(grades);  
            
            
            $.get('/calculateResult' , {'type': type , 'credits' : credits , 'grades' : grades} ,  function(result) { 
                $("#result-p").replaceWith(result); });
        } else { 
            $("#result-p").text("Incomplete details - cannot compute");
        }

    })

    })  
     
     

     
     



