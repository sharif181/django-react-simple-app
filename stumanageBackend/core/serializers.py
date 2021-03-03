from rest_framework import serializers

from .models import studentInfo


class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = studentInfo
        fields = '__all__'