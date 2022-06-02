
from django.shortcuts import render  
from django.views import View
import json 
import math

# Create your views here.
 
def index(request):  
    lst = ["A1" , "A2" , "A3" , "A4" , "A5" , "B1" , "B2" , "B3" , "C1" , "C2"]
    return render(request , 'index.html' , {'grades' : lst}) 
      
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
    return render(request , 'add_target_grade.html' , {'grades':get_grades() , 'label' : "Target Grade" , 'function' : None}) 
     
def add_achieved_grade(request): 
    return render(request , 'add_target_grade.html' , {'grades':get_grades() , 'label' : "Final Grade" , 'function' : None})
 
  
def calculate_exam_grade(request):  
    convert_grades = get_grades() 
    convert_points = get_points() 
 
    if 'worths' in request.GET and 'grades' in request.GET and 'gradeAchieved' in request.GET:  
        worths = json.loads(request.GET['worths'])
        grades = json.loads(request.GET['grades'])
        gradeAchieved = request.GET['gradeAchieved']
        if len(worths) == 0 or len(grades) == 0: 
                return render(request , 'result.html' , {'result' : None})  
        
        totalToSubtract = 0
        totalWorth = 0  
        for i in range(len(grades)):  
            print(worths[i])
            totalWorth += ( float(worths[i]) / 100) 
            totalToSubtract += ( (float(worths[i]) / 100) * int(convert_grades[grades[i]]['gradePoints']) )  
                 
        examWorth = 1 - totalWorth  
        gradeAchievedAsPoints = convert_grades[gradeAchieved.strip()]['gradePoints'] 
             
        result = math.floor((gradeAchievedAsPoints - totalToSubtract)  / examWorth) 
        return render(request , 'result.html' , {'points' : result , 'grade' : convert_points[str(result)]['grade'] , 'string': "Your Exam Grade "}) 
    else: 
        return render(request , 'result.html' , {'result' : None})  

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


                 
        return render(request , 'result.html' , {'points' : final_points , 'grade' : final_grade , 'string': "You have a GPA of"}) 
        

         
    