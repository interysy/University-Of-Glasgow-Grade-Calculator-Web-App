from django.db import models 

 
class Feedback(models.Model):  
    message = models.TextField(max_length=500)  
    date_and_time = models.DateTimeField(auto_now_add=True) 
     
    def __str__(self): 
        return f"Feedback from {self.date_and_time}" 
        