$(document).ready( function() {  
       
     
    $("#add-btn").click(function() {  

        $.get('/addModule', function(data) {
            $("#components").append(data);
         });
    })  
      
     
    $(document).on('click', '.cross-icon', function() {
        $(this).prev(".one-module").remove();  
        $(this).remove();
    }); 

    $("#btn-change-to-target").click(function() {   
        clearInputs();
        changeRequiredText("Exam Grade Needed For Target Grade" , "Coursework Name" , "Coursework Worth" , "Calculate Exam Grade Needed" , "Add a piece of coursework ...");
        addExtraDropdown('/addTargetGrade');
    }) 
     
    $("#btn-change-to-exam").click(function() {  
        clearInputs();
        changeRequiredText("Exam Grade Achieved" , "Coursework Name" , "Coursework Worth" , "Calculate Exam Grade Achieved" , "Add Coursework Piece");
        addExtraDropdown('/addAchievedGrade')
         
       
    }) 
     
    $("#btn-change-to-gpa").click(function() {    
        clearInputs(); 
        changeRequiredText("GPA" , "Module Name" , "Amount Of Credits" , "Calculate GPA" , "Add Module ...")
         
        if ($(".added").length != 0) { 
            $(".added").remove();
        }

        
    })
 
    })  
     
function addExtraDropdown(url) {  
    if ($(".added").length == 0) { 
        $.get(url, function(data) { 
            $("#add-btn").after(data);
        }); 
    } else if ($(".added").length == 1) {  
        $.get(url, function(data) { 
            $(".added").replaceWith(data);
    }) 
}
    
} 
function clearInputs() {  
    $('.credits').each(function() {  
        this.value = ''
    });    
    
    
   $('.grades').each(function() {  
        this.value = 'A1'
    });  

} 
 
function changeRequiredText(type , tableHeadingOne , tableHeadingTwo , resultBtnText , addBtnText ) { 
    $("#type").text(type); 
    $(".gpa-calc p:eq(0)").text(tableHeadingOne); 
    $(".gpa-calc p:eq(1)").text(tableHeadingTwo); 
    $("#result-btn").text(resultBtnText); 
    $("#add-btn").text(addBtnText);   
}

     
      
function calculateGPA() {   

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
            
            
        $.get('/calculateResult' , {'credits' : credits , 'grades' : grades} ,  function(result) { 
            $("#result-p").replaceWith(result); });
    } else { 
        $("#result-p").text("Incomplete details - cannot compute");
    }

}



