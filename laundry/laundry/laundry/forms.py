from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from .models import LaundryRequest

class UserLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(UserLoginForm, self).__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control-god'
            field.widget.attrs['placeholder'] = ' '

class UserRegistrationForm(UserCreationForm):
    ROLE_CHOICES = [
        ('User', 'User'),
        ('Service Provider', 'Service Provider'),
    ]
    role = forms.ChoiceField(choices=ROLE_CHOICES, widget=forms.Select(attrs={'class': 'form-control-god'}))

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

    def __init__(self, *args, **kwargs):
        super(UserRegistrationForm, self).__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control-god'
            field.widget.attrs['placeholder'] = ' '  # Required for floating label CSS trick

class LaundryRequestForm(forms.ModelForm):
    class Meta:
        model = LaundryRequest
        fields = ['room_number', 'cloth_type', 'quantity', 'service_type']
        
    def __init__(self, *args, **kwargs):
        super(LaundryRequestForm, self).__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control-god'
            field.widget.attrs['placeholder'] = ' '
