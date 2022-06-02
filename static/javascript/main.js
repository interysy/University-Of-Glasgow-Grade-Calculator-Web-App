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
        changeOnClick("calculateTargetGrade()");
    }) 
     
    $("#btn-change-to-exam").click(function() {  
        clearInputs();
        changeRequiredText("Exam Grade Achieved" , "Coursework Name" , "Coursework Worth" , "Calculate Exam Grade Achieved" , "Add Coursework Piece");
        addExtraDropdown('/addAchievedGrade') ;
        changeOnClick("calculateExamGrade()");
         
       
    }) 
     
    $("#btn-change-to-gpa").click(function() {    
        clearInputs(); 
        changeRequiredText("GPA" , "Module Name" , "Amount Of Credits" , "Calculate GPA" , "Add Module ...")
         
        if ($(".added").length != 0) { 
            $(".added").remove();
        } 
        changeOnClick("calculateGPA()");

        
    })
 
    })  
      
function changeOnClick(func) {  
    $("#result-btn").attr('onClick' , func);
    


}
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

         
function collectValues() {  
    worths = [] 
    grades = [] 
    $('.credits').each(function() {  
        if (this.value != '') {
            worths.push(this.value); 
            }
        });  
          
    var grades = [];
    $(".grades").each(function() {  
        grades.push(this.value);
    })   
     
    return [worths , grades]

}
function calculateExamGrade() { 
    
    collected = collectValues(); 
    worths = collected[0]; 
    grades = collected[1];
       
    gradeAchieved = $( "#extra-grade option:selected" ).text();
    console.log(gradeAchieved);
     
    if (worths.length != 0 && grades.length != 0) {
        worths = JSON.stringify(worths);
        grades = JSON.stringify(grades);  
            
            
        $.get('/calculateExamGrade' , {'worths' : worths , 'grades' : grades , 'gradeAchieved' : gradeAchieved } ,  function(result) { 
            $("#result-p").replaceWith(result); });
    } else { 
        $("#result-p").text("Incomplete details - cannot compute");
    }

     

}
      
function calculateGPA() {   
          
    collected = collectValues();
    credits = collected[0];  
    grades = collected[1];

         
    if (credits.length != 0) {
        credits = JSON.stringify(credits);
        grades = JSON.stringify(grades);  
            
            
        $.get('/calculateResult' , {'credits' : credits , 'grades' : grades} ,  function(result) { 
            $("#result-p").replaceWith(result); });
    } else { 
        $("#result-p").text("Incomplete details - cannot compute");
    }

}



