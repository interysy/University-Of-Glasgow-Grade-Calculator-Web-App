from bdb import GENERATOR_AND_COROUTINE_FLAGS
from django.shortcuts import render  
from django.views import View
import json 
import math

# Create your views here.
 
def index(request):  
    lst = ["A1" , "A2" , "A3" , "A4" , "A5" , "B1" , "B2" , "B3" , "C1" , "C2"]
    return render(request , 'index.html' , {'grades' : lst}) 
     
         
class AddModule(View):  
     
    def __init__(self):  
        file = open('./static/json/grades.json')  
        self.data = json.load(file)   
        
    def get(self,request):  
          
        ctxt = {} 
        grades = []
        for line in self.data: 
            grades.append(line) 
        ctxt['grades'] = grades

         
        return render(request , 'add_module.html' , ctxt)
 
   
class CalculateResults(View):  
     
    def __init__(self):  
        file_with_grades = open('./static/json/grades.json')   
        file_with_points = open('./static/json/points.json')
        self.grades = json.load(file_with_grades)   
        self.points = json.load(file_with_points) 
     
    def get(self,request):    
        if 'type' in request.GET: 
            type = request.GET['type'] 
        else: 
            type = None 
              
        if type == "GPA":   
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
            final_grade = self.points[str(final_points)]


                 
        return render(request , 'result.html' , {'points' : final_points , 'grade' : final_grade}) 
        

         
    