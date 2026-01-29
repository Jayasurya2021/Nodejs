from django.contrib import admin
from .models import LaundryRequest

@admin.register(LaundryRequest)
class LaundryRequestAdmin(admin.ModelAdmin):
    list_display = ('room_number', 'cloth_type', 'quantity', 'service_type', 'status')
    list_filter = ('status', 'service_type')
    list_editable = ('status',)
    search_fields = ('room_number',)
