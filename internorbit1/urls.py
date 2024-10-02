from django.contrib import admin
from django.urls import path
from appinternorbit1 import views

urlpatterns = [
    path('posts/', views.post_list),
    path('posts/create/', views.post_create, name='post_create'),
    path('posts/<int:pk>/', views.post_detail, name='post-detail'),
    path('posts/<int:pk>', views.post_detail, name='post-update'),
    path('posts/<int:pk>/delete/', views.post_delete, name='post-delete'),
]
