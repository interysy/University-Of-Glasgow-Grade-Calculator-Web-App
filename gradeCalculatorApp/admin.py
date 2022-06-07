from django.contrib import admin
from .models import Feedback
# Register your models here. 
  
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('date_and_time', 'message',)
  
admin.site.register(Feedback)
