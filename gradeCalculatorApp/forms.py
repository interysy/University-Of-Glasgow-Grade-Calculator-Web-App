from django import forms

class FeedbackForm(forms.Form):
    name = forms.CharField(label='Your name', max_length=100) 
    email = forms.EmailField(label = "Your email" , max_length = 100) 
    text = forms.CharField(label = "Message" , max_length = 500 , widget=forms.Textarea(attrs={'name':'body', 'rows':'15', 'cols':'20'}))