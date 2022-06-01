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
     
    $("#btn-change-to-target").click(function() {  
        $('.credits').each(function() {  
            this.value = ''
        });    
        
        
       $('.grades').each(function() {  
            this.value = 'A1'
        });  
        
        
         

        $("#type").text("Exam Grade Needed For Target Grade"); 
        $(".gpa-calc p:eq(0)").text("Coursework Name"); 
        $(".gpa-calc p:eq(1)").text("Coursework Worth"); 
        $("#result-btn").text("Calculate Exam Grade Needed"); 
        $("#add-btn").text("Add Coursework Piece");   
          
        if ($(".added").length == 0) { 
            $.get('/addTargetGrade', function(data) { 
                $("#add-btn").after(data);
            }); 
        } else if ($(".added").length == 1) {  
            $.get('/addTargetGrade', function(data) { 
                $(".added").replaceWith(data);
        }) 
    }
        // $("#add-btn").before("<select class = 'input-for-module col-md text-center grades'> {% for grade in grades %}<option > {{ grade }} </option>{% endfor %}</select>  "); 

    }) 
     
    $("#btn-change-to-exam").click(function() { 
        $('.credits').each(function() {  
            this.value = ''
        });    
        
        
       $('.grades').each(function() {  
            this.value = 'A1'
        });  
        
        
        $("#type").text("Exam Grade Achieved"); 
        $(".gpa-calc p:eq(0)").text("Coursework Name"); 
        $(".gpa-calc p:eq(1)").text("Coursework Worth"); 
        $("#result-btn").text("Calculate Exam Grade Achieved"); 
        $("#add-btn").text("Add Coursework Piece");   
         
        if ($(".added").length == 0) { 
            $.get('/addAchievedGrade', function(data) { 
                $("#add-btn").after(data);
            }); 
        } else if ($(".added").length == 1) {  
            $.get('/addAchievedGrade', function(data) { 
                $(".added").replaceWith(data);
        }) 
    }
    }) 
     
    $("#btn-change-to-gpa").click(function() {    
        $('.credits').each(function() {  
            this.value = ''
        });    
        
        
       $('.grades').each(function() {  
            this.value = 'A1'
        });  
        
        
         

        $("#type").text("GPA"); 
        $(".gpa-calc p:eq(0)").text("Module Name"); 
        $(".gpa-calc p:eq(1)").text("Amount Of Credits"); 
        $("#result-btn").text("Calculate GPA"); 
        $("#add-btn").text("Add Module ...");   
         
        if ($(".added").length != 0) { 
            $(".added").remove();
        }

        
    })
 
    })  
     
     

     
     



