
import re
from django.shortcuts import render  
from django.views import View
import json 
import math 
from .forms import FeedbackForm 
from .models import Feedback

# Create your views here.
 
def index(request):  
    form = FeedbackForm()
    return render(request , 'index.html' , {'grades' : get_grades , 'form' : form}) 
      
def get_grades(): 
    file = open('./static/json/grades.json')  
    grades = json.load(file)    
    file.close()  
    return grades 
     
def get_points():  
    file_with_points = open('./static/json/points.json') 
    points = json.load(file_with_points)  
    file_with_points.close() 
    return points


def add_target_grade(request):  
    return render(request , 'add_target_grade.html' , {'grades':get_grades() , 'label' : "Target Grade"}) 
     
def add_achieved_grade(request): 
    return render(request , 'add_target_grade.html' , {'grades':get_grades() , 'label' : "Final Grade"})
   
    
def calculate_required_grade(request , type):  
    grades_to_points_dict = get_grades() 
    points_to_grades_dict = get_points() 
     
    if 'worths' in request.GET and 'grades' in request.GET and 'gradeAchieved' in request.GET:  
        worths = json.loads(request.GET['worths'])
        grades = json.loads(request.GET['grades'])
        grade_achieved_as_grade = request.GET['gradeAchieved']  
         
        total_worth = 0 
        total_to_subtract_from_target_grade = 0 
         
        for i in range(len(grades)):    
            worth = float(worths[i])  
            worth_as_decimal = (worth / 100) 
            total_worth += worth_as_decimal
            total_to_subtract_from_target_grade += worth_as_decimal * grades_to_points_dict[grades[i]]['gradePoints'] 
 
        print(total_to_subtract_from_target_grade) 
        print(total_worth) 

        exam_worth = 1-total_worth  
        grade_achieved_as_points = grades_to_points_dict[grade_achieved_as_grade.strip()]['gradePoints']
        print(grade_achieved_as_points) 

        result =((grade_achieved_as_points - total_to_subtract_from_target_grade) / exam_worth) 
        result_rounded = math.ceil(result) 
          
        if type == "target": 
            msg = "To achieve your target grade you need atleast a" 
        elif type == "achieved": 
            msg = f"To end up with {grade_achieved_as_grade}, you must have gotten a grade of " 
           
            
        if result_rounded > 22 or result_rounded < 0: 
            return render(request , 'result.html' , {"possible":False})

        return render(request , 'result.html' , {'points' : result_rounded , 'grade' : points_to_grades_dict[str(result_rounded)]['grade'] , 'string': msg , 'possible' : True}) 


class AddModule(View):  
     
    def __init__(self):  
        self.grades = get_grades()
        
    def get(self,request):  
          
        ctxt = {} 
        ctxt['grades'] = self.grades

         
        return render(request , 'add_module.html' , ctxt) 
   
class CalculateResults(View):  
     
    def __init__(self):  
        self.points = get_points()
        self.grades = get_grades()
     
    def get(self,request):    
        if 'credits' in request.GET and 'grades' in request.GET: 
            credits = json.loads(request.GET['credits']); 
            local_grades = json.loads(request.GET['grades']); 
               
            print(len(credits)) 
            print(len(local_grades))
            if len(credits) == 0 or len(local_grades) == 0: 
                return render(request , 'result.html' , {'result' : None})  

            result = 0 
            totalCredits = 0 
             
            for i in range(0,len(credits)):  
                result += self.grades[local_grades[i]]['gradePoints'] * int(credits[i])
                totalCredits += int(credits[i]) 
                 
            final_points = math.floor(result / totalCredits)   
            final_grade = self.points[str(final_points)]['grade']


                 
        return render(request , 'result.html' , {'points' : final_points , 'grade' : final_grade , 'string': "You have a GPA of" , 'possible':True}) 
        

     
def feedback(request): 

    if request.method == 'POST':
        form = FeedbackForm(request.POST)
        if form.is_valid():
            return None

    else:
        form = FeedbackForm()

    return render(request, 'feedback_form.html', {'form': form}) 

     
def send_feedback(request):  
    if request.method == 'POST':
        form = FeedbackForm(request.POST)
        if form.is_valid(): 
            print(form.cleaned_data)
            feedback = Feedback.objects.create(message = form.cleaned_data.get("text")) 
            feedback.save()  
            return render(request, 'index.html' , {'successful' : True})

   
    return render(request, 'index.html' , {'successful' : False})