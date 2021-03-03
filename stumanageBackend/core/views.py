from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import studentInfo
from .serializers import ReactSerializer
from rest_framework import status

class ReactView(APIView):

    def get(self,request):
        details = studentInfo.objects.all()
        serializer = ReactSerializer(details,many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print('error',serializer.errors)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class ReactViewDetail(APIView):
    def get_object(self,id):
        try:
            return studentInfo.objects.get(id=id)
        except:
            pass

    
    def get(self,request,id):
        info = self.get_object(id)
        serializer = ReactSerializer(info)
        return Response(serializer.data)

    def put(self,request,id):
        info = self.get_object(id=id)
        serializer = ReactSerializer(info,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

    def delete(self,request,id):
        info = self.get_object(id=id)
        info.delete()
        return Response()