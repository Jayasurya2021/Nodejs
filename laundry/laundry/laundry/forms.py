from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import LaundryRequest

class UserRegistrationForm(UserCreationForm):
    ROLE_CHOICES = [
        ('User', 'User'),
        ('Service Provider', 'Service Provider'),
    ]
    role = forms.ChoiceField(choices=ROLE_CHOICES, widget=forms.Select(attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'first_name': forms.TextInput(attrs={'class': 'form-control'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
        }

class LaundryRequestForm(forms.ModelForm):
    class Meta:
        model = LaundryRequest
        fields = ['room_number', 'cloth_type', 'quantity', 'service_type']
        widgets = {
            'room_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Room Number'}),
            'cloth_type': forms.Select(attrs={'class': 'form-control'}),
            'quantity': forms.NumberInput(attrs={'class': 'form-control', 'min': 1}),
            'service_type': forms.Select(attrs={'class': 'form-control'}),
        }
