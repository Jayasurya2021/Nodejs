from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group
from .forms import LaundryRequestForm, UserRegistrationForm
from .models import LaundryRequest

def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            role = form.cleaned_data.get('role')
            group, created = Group.objects.get_or_create(name=role)
            user.groups.add(group)
            # Removed auto-login to force user to login page
            return redirect('login')
    else:
        form = UserRegistrationForm()
    return render(request, 'laundry/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('landing_page')
    else:
        form = AuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})

def landing_page(request):
    return render(request, 'laundry/landing_page.html')

def user_logout(request):
    logout(request)
    return redirect('login')

@login_required
def laundry_create(request):
    if request.method == 'POST':
        form = LaundryRequestForm(request.POST)
        if form.is_valid():
            laundry_request = form.save(commit=False)
            laundry_request.user = request.user
            laundry_request.save()
            return redirect('laundry_success')
    else:
        form = LaundryRequestForm()
    return render(request, 'laundry/request_form.html', {'form': form})

@login_required
def laundry_list(request):
    is_staff = request.user.groups.filter(name='Staff').exists() or request.user.is_superuser
    
    if request.method == 'POST' and is_staff:
        req_id = request.POST.get('req_id')
        new_status = request.POST.get('status')
        l_req = LaundryRequest.objects.get(id=req_id)
        l_req.status = new_status
        l_req.save()
        return redirect('laundry_list')

    if is_staff:
        requests = LaundryRequest.objects.all().order_by('-id')
    else:
        requests = LaundryRequest.objects.filter(user=request.user).order_by('-id')
        
    return render(request, 'laundry/request_list.html', {'requests': requests, 'is_staff': is_staff})

def success_view(request):
    return render(request, 'laundry/success.html')
