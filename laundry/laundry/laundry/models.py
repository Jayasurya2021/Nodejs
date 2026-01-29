from django.db import models

class LaundryRequest(models.Model):
    CLOTH_TYPES = [
        ('Shirt', 'Shirt'),
        ('Pant', 'Pant'),
        ('Bedsheet', 'Bedsheet'),
    ]
    
    SERVICE_TYPES = [
        ('Wash', 'Wash'),
        ('Wash & Iron', 'Wash & Iron'),
    ]
    
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Washing', 'Washing'),
        ('Ready', 'Ready'),
        ('Delivered', 'Delivered'),
    ]

    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True, blank=True)
    room_number = models.CharField(max_length=10)
    cloth_type = models.CharField(max_length=20, choices=CLOTH_TYPES)
    quantity = models.PositiveIntegerField()
    service_type = models.CharField(max_length=20, choices=SERVICE_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    
    def __str__(self):
        return f"Room {self.room_number} - {self.cloth_type} ({self.status})"
