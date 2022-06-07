$(document).ready(function() {


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
        changeRequiredText("Exam Grade Needed For Target Grade", "Coursework Name", "Coursework Worth (%)", "Calculate Exam Grade Needed", "Add a piece of coursework ...");
        addExtraDropdown('/addTargetGrade');
        changeOnClick("calculateTargetGrade()");
    })

    $("#btn-change-to-exam").click(function() {
        clearInputs();
        changeRequiredText("Exam Grade Achieved", "Coursework Name", "Coursework Worth (%)", "Calculate Exam Grade Achieved", "Add Coursework Piece");
        addExtraDropdown('/addAchievedGrade');
        changeOnClick("calculateExamGrade()");


    })

    $("#btn-change-to-gpa").click(function() {
        clearInputs();
        changeRequiredText("GPA", "Module Name", "Amount Of Credits", "Calculate GPA", "Add Module ...")

        if ($(".added").length != 0) {
            $(".added").remove();
        }
        changeOnClick("calculateGPA()");


    })

})

function validateNumericalInput(value) {
    return (!(isNaN(value)) && parseInt(value) > 0 && parseInt(value) <= 120);
}

function changeOnClick(func) {
    $("#result-btn").attr('onClick', func);
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

function changeRequiredText(type, tableHeadingOne, tableHeadingTwo, resultBtnText, addBtnText) {
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
        console.log(this.value);
        var validation = validateNumericalInput(this.value);
        if (this.value != '' && this.value && validation) {
            worths.push(this.value);
        }
    });

    var grades = [];
    $(".grades").each(function() {
        grades.push(this.value);
    })

    return [worths, grades]

}

function validateCollected(collected) {
    if (collected[0].length != collected[1].length) {
        $("#result-p").text("Missing some inputs");
        return false;
    } else {
        return true;
    }
}

function calculateTargetGrade() {
    collected = collectValues();

    if (validateCollected(collected)) {
        worths = collected[0];
        grades = collected[1];

        gradeAchieved = $("#extra-grade option:selected").text();
        console.log(gradeAchieved);

        if (worths.length != 0 && grades.length != 0) {
            worths = JSON.stringify(worths);
            grades = JSON.stringify(grades);


            $.get('/calculateRequiredGrade/target', { 'worths': worths, 'grades': grades, 'gradeAchieved': gradeAchieved }, function(result) {
                $("#result-p").replaceWith(result);
            });
        } else {
            $("#result-p").text("Incomplete details - cannot compute");
        }
    }
}


function calculateExamGrade() {

    collected = collectValues();
    if (validateCollected(collected)) {
        worths = collected[0];
        grades = collected[1];

        gradeAchieved = $("#extra-grade option:selected").text();

        if (worths.length != 0 && grades.length != 0) {
            worths = JSON.stringify(worths);
            grades = JSON.stringify(grades);


            $.get('/calculateRequiredGrade/achieved', { 'worths': worths, 'grades': grades, 'gradeAchieved': gradeAchieved }, function(result) {
                $("#result-p").replaceWith(result);
            });
        } else {
            $("#result-p").text("Incomplete details - cannot compute");
        }
    }
}

function manipulateSideBar(width) {
    if ($('#feedback-sidebar').css("width") == "300px") {
        $("#feedback-sidebar").css("width", "0");
        $("#feedback-div").css("marginLeft", "0");
        $("#shbtn").show();
    } else {
        $("#feedback-sidebar").css("width", "300px");
        $("#feedback-div").css("marginLeft", "250px");
        $("#shbtn").hide();
    }
}


function calculateGPA() {

    collected = collectValues();
    if (validateCollected(collected)) {
        credits = collected[0];
        grades = collected[1];

        if (credits.length != 0) {
            credits = JSON.stringify(credits);
            grades = JSON.stringify(grades);


            $.get('/calculateResult', { 'credits': credits, 'grades': grades }, function(result) {
                $("#result-p").replaceWith(result);
            });
        } else {
            $("#result-p").text("Incomplete details - cannot compute");
        }
    }

}