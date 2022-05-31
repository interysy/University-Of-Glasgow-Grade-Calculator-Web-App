from django.shortcuts import render  
from django.views import View
import json

# Create your views here.
 
def index(request):  
    lst = ["A1" , "A2" , "A3" , "A4" , "A5" , "B1" , "B2" , "B3" , "C1" , "C2"]
    return render(request , 'index.html' , {'grades' : lst}) 
     
         
class AddModule(View): 
     
    def get(self,request):  
        file = open('./static/json/grades.json')  
        data = json.load(file)  
          
        ctxt = {} 
        grades = []
        for line in data: 
            grades.append(line['grade']) 
        ctxt['grades'] = grades

        
        # toReturn = "$('#components').append('<div class = 'one-module row text-center'> <input class = 'input-for-module col-md' type = 'text'>  <input  class = 'input-for-module col-md' type = 'number'>  <select class = 'input-for-module col-md'>"
            
        # for grade in lst: 
        #     toReturn += "<option>" + grade + "</option>"  
            
        # toReturn += "</select> </div> ')"   
         
        return render(request , 'add_module.html' , ctxt)

         
    