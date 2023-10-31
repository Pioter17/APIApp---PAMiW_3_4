from django.db import models

# Create your models here.

class Movie(models.Model):

    name = models.CharField(max_length=1_000)
    director = models.CharField(max_length=1_000)
    producer = models.CharField(max_length=1_000)
    rating = models.DecimalField(max_digits=4, decimal_places=2)
    length = models.IntegerField()

    def __str__(self):
        return f'{self.name} - {self.director}'