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
            grades.append(line['grade']) 
        ctxt['grades'] = grades

         
        return render(request , 'add_module.html' , ctxt)
 
   
class Calculations(View): 
     
    def get(self,request):  
        return render(request , 'add_module.html' , {})

         
    