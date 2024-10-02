from django.contrib import admin
from django.urls import path
from appinternorbit1 import views

urlpatterns = [
    path('posts/', views.post_list),
]
