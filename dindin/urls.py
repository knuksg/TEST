from django.urls import path
from . import views

app_name = 'dindin'

urlpatterns = [
    path('', views.index, name='index'),
]
