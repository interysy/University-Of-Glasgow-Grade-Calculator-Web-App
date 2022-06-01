from bdb import GENERATOR_AND_COROUTINE_FLAGS
from django.shortcuts import render  
from django.views import View
import json

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
        file = open('./static/json/grades.json')  
        self.data = json.load(file)  
     
    def get(self,request):    
        print(request.GET)
        if 'type' in request.GET: 
            type = request.GET['type'] 
        else: 
            type = None 
              
        print(type)
        if type == "GPA":   
            print("GETTTING CREDITS AND GRADES")
            credits = json.loads(request.GET['credits']); 
            grades = json.loads(request.GET['grades']); 
             
            for credit in credits: 
                print(credit) 
                 
            for grade in grades: 
                print(grade)
            # print(grades)
             
            result = 0 
            totalCredits = 0 
             
            for i in range(0,len(credits)):  
                result += self.data[grades[i]]['gradePoints'] * int(credits[i])
                totalCredits += int(credits[i])
                 
        return render(request , 'result.html' , {'result' : (result / totalCredits )}) 
        

         
    