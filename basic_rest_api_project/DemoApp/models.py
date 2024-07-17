from django.db import models

class Task(models.Model):
    name = models.CharField(max_length=30)
    date = models.DateField(auto_now_add=True)
    description = models.CharField(max_length=300)
