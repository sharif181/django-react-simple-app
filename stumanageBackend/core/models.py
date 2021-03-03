from django.db import models

class studentInfo(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_no = models.CharField(max_length=15)
    age = models.IntegerField(default=18)
    address = models.TextField()
    img = models.ImageField(upload_to='images/' , default='default.jpg')


    def __str__(self):
        return self.first_name + " " + self.last_name