
from django.contrib import admin
from django.urls import path
from core.views import ReactView,ReactViewDetail


#for image:

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',ReactView.as_view()),
    path('api/<int:id>',ReactViewDetail.as_view())
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root = settings.MEDIA_ROOT)