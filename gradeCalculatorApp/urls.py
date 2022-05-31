app_name = "Grade Calculator" 
 
  


from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from gradeCalculatorApp import views

app_name = "Grade Calculator" 

urlpatterns = [
                  # Add URL Paths, Uncomment as Views and Templates are implemented. (Make sure name parameter
                  # matches view's name)

                  # Home Page
                  path('', views.index, name='index'),
                  path('addModule/', views.AddModule.as_view(), name='addModule'),
              ]
