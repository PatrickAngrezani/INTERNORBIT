from django.shortcuts import render
from .models import Post
from django.http import JsonResponse


def post_list(request):
    posts = Post.objects.all().values()
    return JsonResponse(list(posts), safe=False)
