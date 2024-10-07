from django.contrib import admin
from django.urls import path
from appinternorbit1 import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('posts/', views.post_list, name='post_list'),
    path('posts/create/', views.post_create, name='post_create'),
    path('posts/<int:pk>/', views.post_detail, name='post_detail'),
    path('posts/<int:pk>/update/', views.post_update, name='post_update'),
    path('posts/delete/<int:pk>/', views.post_delete, name='post_delete'),
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
]
