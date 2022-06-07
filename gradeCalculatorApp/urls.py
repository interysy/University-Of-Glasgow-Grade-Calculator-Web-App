 

from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from gradeCalculatorApp import views

app_name = "gradeCalculatorApp" 

urlpatterns = [
                  # Add URL Paths, Uncomment as Views and Templates are implemented. (Make sure name parameter
                  # matches view's name)

                  # Home Page
                  path('', views.index, name='index'),
                  path('addModule/', views.AddModule.as_view(), name='addModule'), 
                  path('calculateResult/' , views.CalculateResults.as_view() , name = "calculateResults"), 
                  path('addTargetGrade/' , views.add_target_grade , name = "addTargetGrade"), 
                  path('addAchievedGrade/' , views.add_achieved_grade , name = "addAchievedGrade"), 
                  path('calculateRequiredGrade/<str:type>' , views.calculate_required_grade , name = "calculateRequiredGrade"), 
                  path('feedback/' , views.feedback, name = "feedback"), 
                  path('sendFeedback/' , views.send_feedback , name = "sendFeedback"), 
              ]
