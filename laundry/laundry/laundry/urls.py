from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('', views.landing_page, name='landing_page'),
    path('new-request/', views.laundry_create, name='laundry_create'),
    path('list/', views.laundry_list, name='laundry_list'),
    path('success/', views.success_view, name='laundry_success'),
]
